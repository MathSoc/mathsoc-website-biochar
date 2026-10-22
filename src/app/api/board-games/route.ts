import gameOverrides from "../../board-games/game-overrides.json";
import { NextResponse } from "next/server";
import { readBggMatches, loadBggDetails } from "@/app/lib/bgg";
import type { BggData } from "@/app/lib/bgg";

export const runtime = "nodejs";
export const maxDuration = 60;

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSKQ8f7Yp2BQLkZHZCfSOH-OisbpMXGaccGwXvpdxns66IDhPzRw2-qGmyytG7_cqdxrpjTUPg9aWZc/pub";

const INVENTORY_URL =
  `${SHEET_URL}?gid=1558150648&single=true&output=csv`;

const POPULARITY_URL =
  `${SHEET_URL}?gid=1215497870&single=true&output=csv`;

type Game = {
  bgg?: BggData;
  needsReview: number;
  manualStats?: { minPlayers: number; maxPlayers: number; minMinutes: number | null; maxMinutes: number | null; weight: number | null };
  id: string;
  title: string;
  total: number;
  available: number;
  shelf: string;
  collections: string[];
  rentals: number;
  uniqueBorrowers: number;
  lastRented: string | null;
};

// Handles quoted fields, commas inside titles, and multiline cells.
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;

  text = text.replace(/^\uFEFF/, "");

  for (let index = 0; index < text.length; index++) {
    const character = text[index];

    if (character === '"') {
      if (quoted && text[index + 1] === '"') {
        cell += '"';
        index++;
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if (
      (character === "\n" || character === "\r") &&
      !quoted
    ) {
      if (character === "\r" && text[index + 1] === "\n") {
        index++;
      }

      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += character;
    }
  }

  if (quoted) {
    throw new Error("CSV contains an unfinished quoted field.");
  }

  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }

  return rows;
}

function findTable(rows: string[][], columns: string[]) {
  const headerIndex = rows.findIndex((row) =>
    columns.every((column) =>
      row.some((cell) => cell.trim().toLowerCase().replace(/[ _]+/g, " ") === column.toLowerCase().replace(/[ _]+/g, " ")),
    ),
  );

  if (headerIndex === -1) {
    throw new Error("Expected spreadsheet columns were not found.");
  }

  const headers = rows[headerIndex].map((cell) => cell.trim());

  return {
    rows: rows.slice(headerIndex + 1),
    firstDataRow: headerIndex + 2,
    column: (name: string) => headers.findIndex(header => header.toLowerCase().replace(/[ _]+/g, " ") === name.toLowerCase().replace(/[ _]+/g, " ")),
  };
}

function normalizeTitle(title: string): string {
  return title.trim().replace(/\s+/g, " ").toLowerCase();
}

function readCount(value: string | undefined): number {
  const number = Number(value?.replace(/,/g, "").trim());

  if (!Number.isInteger(number) || number < 0) {
    throw new Error("A spreadsheet count is invalid.");
  }

  return number;
}

async function downloadCsv(url: string, revalidate: number): Promise<string[][]> {
  const response = await fetch(url, {
    next: { revalidate },
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    throw new Error(`Spreadsheet request failed: ${response.status}`);
  }

  return parseCsv(await response.text());
}

export async function GET() {
  try {
    const [inventoryRows, popularityRows] = await Promise.all([
      downloadCsv(INVENTORY_URL, 300), // Availability changes during office hours.
      downloadCsv(POPULARITY_URL, 86400), // Rankings can refresh daily.
    ]);

    const inventory = findTable(inventoryRows, [
      "Status",
      "Title",
      "Copy ID",
      "Shelf Location",
    ]);

    const popularity = findTable(popularityRows, [
      "Game Title",
      "Times Rented",
      "Unique Borrowers",
      "Last Rented",
    ]);

    const games = new Map<string, Game>();
    const shelves = new Map<string, Set<string>>();
    const copyIds = new Set<string>();

    for (const [rowIndex, row] of inventory.rows.entries()) {
      const title = row[inventory.column("Title")]?.trim();
      const copyId = row[inventory.column("Copy ID")]?.trim();

      if (!title && !copyId) continue;
      // QUERY output can retain the source header as a second header row.
      // Skip only a complete, recognised header, never an invalid game record.
      const headerKey = (value: string | undefined) => (value || "").trim().toLowerCase().replace(/[ _]+/g, " ");
      if (headerKey(copyId) === "copy id" && headerKey(title) === "title" &&
          headerKey(row[inventory.column("Status")]) === "status" &&
          headerKey(row[inventory.column("Shelf Location")]) === "shelf location") continue;

      const match = copyId?.match(/^(G\d+)-\d+$/);

      const sheetRow = inventory.firstDataRow + rowIndex;
      if (!title || !copyId) {
        throw new Error(`Published inventory row ${sheetRow}: missing ${!title ? "Title" : "Copy ID"}; Copy ID=${JSON.stringify(copyId || "")}.`);
      }
      if (!match) {
        throw new Error(`Published inventory row ${sheetRow}: malformed Copy ID=${JSON.stringify(copyId)}; expected G0001-01.`);
      }
      if (copyIds.has(copyId)) {
        throw new Error(`Published inventory row ${sheetRow}: duplicate Copy ID=${JSON.stringify(copyId)}.`);
      }

      copyIds.add(copyId);
      if (match[1] === "G0309" || row[inventory.column("Status")]?.trim() === "Retired") continue;
      const id = match[1] === "G0315" ? "G0001" : match[1];

      let game = games.get(id);

      if (!game) {
        game = {
          id,
          title,
          total: 0,
          needsReview: 0,
          available: 0,
          shelf: "",
          collections: [],
          rentals: 0,
          uniqueBorrowers: 0,
          lastRented: null,
        };

        games.set(id, game);
        shelves.set(id, new Set());
      }

      if (normalizeTitle(game.title) !== normalizeTitle(title)) {
        throw new Error("Copies of a game have conflicting titles.");
      }

      const owner = row[inventory.column("Owner")]?.trim().toLowerCase().replace(/[^a-z]/g, "") || "";
      if (owner.includes("mathsoc") && !game.collections.includes("mathsoc")) game.collections.push("mathsoc");
      if (owner.includes("watsfic") && !game.collections.includes("watsfic")) game.collections.push("watsfic");
      game.total++;

      const status = row[inventory.column("Status")]?.trim();

      if (status === "Needs Review") game.needsReview++;
      if (status === "Available") {
        game.available++;
      }

      const shelf = row[inventory.column("Shelf Location")]?.trim();

      if (shelf) {
        shelves.get(id)!.add(shelf);
      }
    }

    const rentalStats = new Map<
      string,
      {
        rentals: number;
        uniqueBorrowers: number;
        lastRented: string | null;
      }
    >();

    for (const row of popularity.rows) {
      const title = row[popularity.column("Game Title")]?.trim();

      if (!title) continue;

      const key = normalizeTitle(title);

      if (rentalStats.has(key)) {
        throw new Error(`Popularity contains a duplicated game title: ${title}`);
      }

      rentalStats.set(key, {
        rentals: readCount(row[popularity.column("Times Rented")]),
        uniqueBorrowers: readCount(
          row[popularity.column("Unique Borrowers")],
        ),
        lastRented:
          row[popularity.column("Last Rented")]?.trim() || null,
      });
    }

    for (const game of games.values()) {
      game.shelf = [...shelves.get(game.id)!].join(", ");

      const stats = rentalStats.get(normalizeTitle(game.title));

      if (stats) {
        Object.assign(game, stats);
      }
    }

    if (!games.size || !rentalStats.size) {
      throw new Error("The published catalogue is empty.");
    }

    const summary = popularityRows.find((row) =>
      row.includes("Refreshed"),
    );

    const refreshedIndex = summary?.indexOf("Refreshed") ?? -1;

    let bggStatus = "unavailable";
    try {
      const matches = await readBggMatches();
      const ids = [...games.values()].map(game => matches.get(game.id)).filter((id): id is number => id !== undefined);
      const details = await loadBggDetails(ids);
      for (const game of games.values()) {
        const id = matches.get(game.id);
        if (id && details.has(id)) game.bgg = details.get(id);
      }
      bggStatus = details.size ? "loaded" : "unavailable";
    } catch (error) {
      console.warn(
        "BGG mapping unavailable:",
        error instanceof Error ? error.message : "Unknown error",
      );
    }

    for (const game of games.values()) {
      const manual = gameOverrides[game.id as keyof typeof gameOverrides];
      if (manual) game.manualStats = manual;
    }

    return NextResponse.json({
      games: [...games.values()].sort((a, b) =>
        a.title.localeCompare(b.title),
      ),
      popularityRefreshed:
        refreshedIndex >= 0
          ? summary![refreshedIndex + 1] || null
          : null,
      servedAt: new Date().toISOString(),
      bggStatus,
    });
  } catch (error) {
    console.error(
      "Board games catalogue:",
      error instanceof Error ? error.message : "Unexpected error",
    );

    return NextResponse.json(
      { error: "The catalogue is temporarily unavailable." },
      { status: 503 },
    );
  }
}