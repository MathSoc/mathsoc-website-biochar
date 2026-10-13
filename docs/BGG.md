# Board game metadata maintenance

Inventory, shelves, availability and rental totals come from the published Google Sheets tabs. BGG supplies images, player counts, play times and complexity.

## Match a game

Edit `src/app/board-games/bgg-matches.csv`. Keep the inventory game ID unchanged. Put the numeric BoardGameGeek ID in `bgg_id`. Leave it blank when the identity is uncertain. Titles containing commas must be enclosed in double quotes. The website keeps unmatched games and shows a placeholder.

The reviewed selections prioritize matching titles, using the latest year where multiple candidates existed. The collection edition has not been checked against every physical box. Expansions remain separate. Saboteur 2 uses expansion ID 91072. Waterloo-Opoly uses Monopoly metadata. The Good the Bad the Ugly remains unmatched.

## Supply collection information

Edit `src/app/board-games/game-overrides.json`. Each key is an inventory game ID. Chess and the combined Chess, Checkers, and Tic Tac Toe set have two-player information. Null play times and complexity mean unknown. These fields replace BGG filtering values for that game, while retaining a BGG cover if one exists. The detail panel identifies the information as supplied by MathSoc.

## Add or retire inventory

Update the Sheets inventory. New titles appear after published-sheet and website cache refreshes; add their IDs to the mapping CSV to supply BGG information. Retired copies are excluded. With no remaining active copies, that title is absent from the current borrowing catalogue. S6 is excluded as an invalid inventory entry. Citadels copy IDs G0001 and G0315 share one catalogue record.

Available copies show their count. If no copies are available and some need review, the website says Check with staff. Otherwise it says Not available. Staff tracker statuses remain unchanged.

## Deployment

Keep BGG_API_TOKEN in private environment settings on the hosting service. Do not commit .env.local. Keep this document in docs, outside public.

The server reads the mapping CSV from disk. Add this entry to the existing next.config.ts configuration, preserving other settings:

```ts
outputFileTracingIncludes: {
  "/api/board-games": ["./src/app/board-games/bgg-matches.csv"],
},
```

BGG responses are cached for a day. Requests run in batches with at most three batches in progress. Failed or rate-limited batches leave games without metadata; do not repeatedly reload while BGG is rate-limiting. The inventory remains usable. Week and Month show an explanatory message until dated rental totals are supplied. Week means the past 7 days; Month means the past 30 days. All-time begins May 18, 2026.
