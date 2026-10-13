import { NextResponse } from "next/server";
import { XMLParser, XMLValidator } from "fast-xml-parser";

export const runtime = "nodejs";
export const maxDuration = 20;
const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });
type Candidate = { id: number; title: string; year: number | null; type: string };
type Item = { "@_id"?: string; "@_type"?: string; name?: { "@_value"?: string } | { "@_value"?: string }[]; yearpublished?: { "@_value"?: string } };
const pending = new Map<string, Promise<Candidate[]>>();
let windowStarted = Date.now();
let searches = 0;

function normalize(value: string) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}
function distance(a: string, b: string) {
  let previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i++) {
    const row = [i];
    for (let j = 1; j <= b.length; j++) row[j] = Math.min(row[j - 1] + 1, previous[j] + 1, previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    previous = row;
  }
  return previous[b.length];
}
async function search(query: string, token: string): Promise<Candidate[]> {
  const url = new URL("https://boardgamegeek.com/xmlapi2/search");
  url.searchParams.set("query", query);
  url.searchParams.set("type", "boardgame,boardgameexpansion");
  const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` }, next: { revalidate: 3600 }, signal: AbortSignal.timeout(7000) });
  if (response.status === 429 || response.status === 202) throw new Error("busy");
  if (!response.ok) throw new Error("upstream");
  const xml = await response.text();
  if (XMLValidator.validate(xml) !== true) throw new Error("xml");
  const parsed = parser.parse(xml);
  const items: Item[] = Array.isArray(parsed?.items?.item) ? parsed.items.item : parsed?.items?.item ? [parsed.items.item] : [];
  return items.slice(0, 300).flatMap(item => {
    const id = Number(item["@_id"]);
    const names = Array.isArray(item.name) ? item.name : [item.name];
    const title = names[0]?.["@_value"];
    const year = Number(item.yearpublished?.["@_value"]);
    if (!Number.isSafeInteger(id) || id <= 0 || typeof title !== "string") return [];
    return [{ id, title: title.slice(0, 200), year: Number.isInteger(year) && year > 0 ? year : null, type: item["@_type"] || "boardgame" }];
  });
}
export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q")?.trim() || "";
  if (query.length < 2 || query.length > 80 || !normalize(query)) return NextResponse.json({ error: "Enter a game title between 2 and 80 characters." }, { status: 400 });
  const token = process.env.BGG_API_TOKEN?.trim();
  if (!token) return NextResponse.json({ error: "BGG search is unavailable. You can add an unmatched request." }, { status: 503 });
  const key = normalize(query);
  try {
    let task = pending.get(key);
    if (!task) {
      if (Date.now() - windowStarted > 60000) { windowStarted = Date.now(); searches = 0; }
      // Per server instance. For higher traffic, use a shared rate limiter.
      if (searches >= 12) return NextResponse.json({ error: "Search is busy. Please try again in a minute." }, { status: 429, headers: { "Retry-After": "60" } });
      searches++;
      task = (async () => {
        let candidates = await search(query, token);
        // One bounded broader search offers suggestions for misspelled titles.
        if (!candidates.length) {
          const prefix = key.split(" ").sort((a, b) => b.length - a.length)[0].slice(0, 4);
          if (prefix.length >= 3 && prefix !== key) candidates = await search(prefix, token);
        }
        const unique = [...new Map(candidates.map(candidate => [candidate.id, candidate])).values()];
        return unique.sort((a, b) => distance(key, normalize(a.title)) - distance(key, normalize(b.title)) || a.title.localeCompare(b.title)).slice(0, 12);
      })();
      pending.set(key, task);
      void task.finally(() => pending.delete(key)).catch(() => {});
    }
    return NextResponse.json({ candidates: await task });
  } catch {
    return NextResponse.json({ error: "BGG search is temporarily unavailable. Try again later or add an unmatched request." }, { status: 502 });
  }
}
