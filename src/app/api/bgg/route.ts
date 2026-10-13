import { NextResponse } from "next/server";
import { XMLParser, XMLValidator } from "fast-xml-parser";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
});

type BggItem = {
  "@_id"?: number | string;
  image?: string;
  thumbnail?: string;
  minplayers?: { "@_value"?: number | string };
  maxplayers?: { "@_value"?: number | string };
  minplaytime?: { "@_value"?: number | string };
  maxplaytime?: { "@_value"?: number | string };
  statistics?: {
    ratings?: {
      averageweight?: { "@_value"?: number | string };
    };
  };
};

function positiveNumber(value: unknown): number | null {
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

// Test one game before connecting the full catalogue.
export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Not found." },
      { status: 404 },
    );
  }

  const token = process.env.BGG_API_TOKEN?.trim();

  if (!token) {
    return NextResponse.json(
      { error: "BGG_API_TOKEN is missing from .env.local." },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(
      "https://boardgamegeek.com/xmlapi2/thing?id=13&stats=1",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 86400 },
        signal: AbortSignal.timeout(15000),
      },
    );

    if (!response.ok || response.status === 202) {
      return NextResponse.json(
        {
          error: "BGG did not return game details.",
          upstreamStatus: response.status,
        },
        { status: 502 },
      );
    }

    const xml = await response.text();

    if (XMLValidator.validate(xml) !== true) {
      throw new Error("Invalid XML response.");
    }

    const parsed = parser.parse(xml);
    const items: BggItem[] = Array.isArray(parsed?.items?.item)
      ? parsed.items.item
      : parsed?.items?.item
        ? [parsed.items.item]
        : [];

    const item = items.find((entry) => Number(entry["@_id"]) === 13);

    if (!item) {
      throw new Error("Catan was not found in the response.");
    }

    const weight = positiveNumber(
      item.statistics?.ratings?.averageweight?.["@_value"],
    );

    return NextResponse.json({
      id: "G0153",
      title: "Catan",
      bgg: {
        id: 13,
        imageUrl: imageUrl(item.image) || imageUrl(item.thumbnail),
        minPlayers: positiveNumber(item.minplayers?.["@_value"]),
        maxPlayers: positiveNumber(item.maxplayers?.["@_value"]),
        minMinutes: positiveNumber(item.minplaytime?.["@_value"]),
        maxMinutes: positiveNumber(item.maxplaytime?.["@_value"]),
        weight: weight !== null && weight <= 5 ? weight : null,
        demo: false,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Could not load BGG game details. Try again shortly." },
      { status: 502 },
    );
  }
}