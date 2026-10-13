import { readFile } from "node:fs/promises";
import path from "node:path";
import { XMLParser, XMLValidator } from "fast-xml-parser";

export function parseCsv(text: string): string[][] {
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

export type BggData = {
  isExpansion: boolean;
  id: number;
  imageUrl: string | null;
  minPlayers: number | null;
  maxPlayers: number | null;
  minMinutes: number | null;
  maxMinutes: number | null;
  weight: number | null;
  demo: false;
};

type XmlValue = {
  "@_value"?: string | number;
};

type BggItem = {
  "@_type"?: string;
  "@_id"?: string | number;
  image?: string;
  thumbnail?: string;
  minplayers?: XmlValue;
  maxplayers?: XmlValue;
  minplaytime?: XmlValue;
  maxplaytime?: XmlValue;
  statistics?: {
    ratings?: {
      averageweight?: XmlValue;
    };
  };
};

function positive(value: unknown): number | null {
  const number = Number(value);

  return Number.isFinite(number) && number > 0 ? number : null;
}

function imageUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;

  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

export async function readBggMatches(): Promise<Map<string, number>> {
  const filePath = path.join(
    process.cwd(),
    "src/app/board-games/bgg-matches.csv",
  );

  const text = await readFile(filePath, "utf8");
  const rows = parseCsv(text);
  const headers = rows.shift()?.map((value) => value.trim()) || [];

  const gameColumn = headers.indexOf("game_id");
  const idColumn = headers.indexOf("bgg_id");

  if (gameColumn < 0 || idColumn < 0) {
    throw new Error("Invalid BGG mapping headers.");
  }

  const matches = new Map<string, number>();
  const seen = new Set<string>();

  for (const row of rows) {
    const gameId = row[gameColumn]?.trim();

    if (!gameId) continue;

    if (seen.has(gameId)) {
      throw new Error(`Duplicate mapping: ${gameId}`);
    }

    seen.add(gameId);

    const value = row[idColumn]?.trim();

    if (!value) continue;

    const id = Number(value);

    if (!Number.isSafeInteger(id) || id <= 0) {
      throw new Error(`Invalid BGG ID: ${gameId}`);
    }

    matches.set(gameId, id);
  }

  if (!matches.size) {
    console.warn("BGG mapping contains no confirmed IDs.");
  }

  return matches;
}

// Fetch reviewed IDs in batches. Failed batches leave inventory usable.
export async function loadBggDetails(
  ids: number[],
): Promise<Map<number, BggData>> {
  const details = new Map<number, BggData>();
  const token = process.env.BGG_API_TOKEN?.trim();

  if (!token) {
    console.warn("BGG_API_TOKEN is not loaded.");
    return details;
  }

  const uniqueIds = [...new Set(ids)];

  if (!uniqueIds.length) {
    console.warn("No mapped BGG IDs were supplied.");
    return details;
  }

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
  });

  let nextStart = 0;
  async function worker() {
  while (nextStart < uniqueIds.length) {
    const start = nextStart;
    nextStart += 20;
    const batch = uniqueIds.slice(start, start + 20);

    try {
      const response = await fetch(
        `https://boardgamegeek.com/xmlapi2/thing?id=${batch.join(",")}&stats=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          next: { revalidate: 86400 },
          signal: AbortSignal.timeout(5000),
        },
      );

      if (!response.ok || response.status === 202) {
        console.warn("BGG response status:", response.status);
        continue;
      }

      const xml = await response.text();

      if (XMLValidator.validate(xml) !== true) {
        console.warn("BGG returned invalid XML.");
        continue;
      }

      const parsed = parser.parse(xml);

      const items: BggItem[] = Array.isArray(parsed?.items?.item)
        ? parsed.items.item
        : parsed?.items?.item
          ? [parsed.items.item]
          : [];

      let matchedCount = 0;

      for (const item of items) {
        const id = Number(item["@_id"]);

        if (!batch.includes(id)) continue;

        const weight = positive(
          item.statistics?.ratings?.averageweight?.["@_value"],
        );

        details.set(id, {
          isExpansion: item["@_type"] === "boardgameexpansion",
          id,
          imageUrl: imageUrl(item.image) || imageUrl(item.thumbnail),
          minPlayers: positive(item.minplayers?.["@_value"]),
          maxPlayers: positive(item.maxplayers?.["@_value"]),
          minMinutes: positive(item.minplaytime?.["@_value"]),
          maxMinutes: positive(item.maxplaytime?.["@_value"]),
          weight: weight !== null && weight <= 5 ? weight : null,
          demo: false,
        });

        matchedCount++;
      }

      if (matchedCount < batch.length) {
        console.warn(
          `BGG returned ${matchedCount} of ${batch.length} requested games.`,
        );
      }
    } catch (error) {
      const errorName = error instanceof Error ? error.name : "UnknownError";
      console.warn("BGG batch could not be loaded:", errorName);
    }
  }

  }
  await Promise.all(Array.from({ length: Math.min(3, Math.ceil(uniqueIds.length / 20)) }, worker));
  return details;
}