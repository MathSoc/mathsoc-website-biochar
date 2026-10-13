import { readFile, writeFile, rename } from 'node:fs/promises';
import { XMLParser, XMLValidator } from 'fast-xml-parser';

// Run from the project root. Suggestions never change approved matches.
const output = 'bgg-suggestions.csv';
const header = ['game_id', 'title', 'candidate_bgg_id', 'candidate_title', 'year', 'status'];
const delayMs = 10000;
const quote = value => '"' + String(value ?? '').replaceAll('"', '""') + '"';
const sleep = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' });

function parseCsv(text) {
  const rows = []; let row = []; let cell = ''; let quoted = false;
  text = text.replace(/^\uFEFF/, '');
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (quoted && text[i + 1] === '"') { cell += '"'; i++; }
      else quoted = !quoted;
    } else if (c === ',' && !quoted) { row.push(cell); cell = ''; }
    else if ((c === '\n' || c === '\r') && !quoted) {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); rows.push(row); row = []; cell = '';
    } else cell += c;
  }
  if (quoted) throw new Error('Suggestions CSV has an unfinished quoted field.');
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

async function main() {
  let token = process.env.BGG_API_TOKEN;
  if (!token) {
    const env = await readFile('.env.local', 'utf8');
    token = env.match(/^\s*BGG_API_TOKEN\s*=\s*(.+)$/m)?.[1]?.trim()
      .replace(/^(["'])(.*)\1$/, '$2');
  }
  if (!token?.trim()) throw new Error('BGG_API_TOKEN is missing.');

  let saved = [];
  try {
    const rows = parseCsv(await readFile(output, 'utf8'));
    if (rows[0]?.join(',') !== header.join(',')) throw new Error('Unexpected suggestions CSV headers.');
    saved = rows.slice(1).filter(row => row[0]);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  const completed = new Set(saved.filter(row => row[5] !== 'Retry later').map(row => row[0]));
  async function save() {
    const text = [header, ...saved].map(row => row.map(quote).join(',')).join('\n') + '\n';
    await writeFile(output + '.tmp', text);
    await rename(output + '.tmp', output);
  }

  // Read the local mapping so the website server need not stay running overnight.
  const mappingRows = parseCsv(await readFile('src/app/board-games/bgg-matches.csv', 'utf8'));
  const mappingHeaders = mappingRows.shift()?.map(value => value.trim()) || [];
  const gameColumn = mappingHeaders.indexOf('game_id');
  const titleColumn = mappingHeaders.indexOf('title');
  const idColumn = mappingHeaders.indexOf('bgg_id');
  if ([gameColumn, titleColumn, idColumn].some(index => index < 0)) throw new Error('Invalid mapping headers.');
  const pending = mappingRows.filter(row => row[gameColumn]?.trim() && !row[idColumn]?.trim())
    .map(row => ({ id: row[gameColumn].trim(), title: row[titleColumn].trim() }))
    .filter(game => !completed.has(game.id));
  console.log(`${completed.size} saved searches. ${pending.length} remaining. Leave this terminal running.`);

  for (const game of pending) {
    await sleep(delayMs);
    const url = 'https://boardgamegeek.com/xmlapi2/search?type=boardgame,boardgameexpansion&exact=1&query=' + encodeURIComponent(game.title);
    let result;
    let attempts = 0;
    while (true) {
      try {
        result = await fetch(url, {
          headers: { Authorization: `Bearer ${token.trim()}` },
          signal: AbortSignal.timeout(20000),
        });
      } catch {
        result = null;
      }
      if (result?.ok && result.status !== 202) break;
      if (result && ![202, 408, 429].includes(result.status) && result.status < 500) {
        await save();
        throw new Error(`BGG returned ${result.status}. Check access before continuing. Progress saved.`);
      }
      attempts++;
      const retry = result?.headers.get('retry-after');
      const seconds = retry && /^\d+$/.test(retry) ? Number(retry) : null;
      const date = retry && seconds === null ? Date.parse(retry) : NaN;
      const minimumWait = seconds !== null ? seconds * 1000 : Number.isFinite(date) ? Math.max(0, date - Date.now()) : 0;
      const backoff = Math.min(60 * 60 * 1000, 15 * 60 * 1000 * 2 ** Math.min(attempts - 1, 2));
      const wait = Math.max(minimumWait, backoff) + 5000;
      await save();
      console.log(`${game.title}: ${result ? 'BGG ' + result.status : 'network timeout'}. Pausing until ${new Date(Date.now() + wait).toLocaleString()}; will retry automatically.`);
      await sleep(wait);
    }
    const xml = await result.text();
    if (XMLValidator.validate(xml) !== true) throw new Error('BGG returned invalid XML. Previous progress is saved.');
    const data = parser.parse(xml);
    const items = data?.items?.item;
    const candidates = Array.isArray(items) ? items : items ? [items] : [];
    if (!data?.items) throw new Error('Unexpected BGG response. Previous progress is saved.');
    saved = saved.filter(row => row[0] !== game.id);
    if (!candidates.length) saved.push([game.id, game.title, '', '', '', 'No exact match']);
    for (const item of candidates) {
      const names = Array.isArray(item.name) ? item.name : [item.name];
      const title = names.find(name => name?.['@_type'] === 'primary')?.['@_value'] || names[0]?.['@_value'];
      saved.push([game.id, game.title, item['@_id'], title, item.yearpublished?.['@_value'], candidates.length === 1 ? 'Review match' : 'Ambiguous: review edition']);
    }
    await save();
    console.log('Checked ' + game.title);
  }
  console.log('All remaining titles checked. Review bgg-suggestions.csv before accepting IDs.');
}
main().catch(error => {
  console.error('Matching stopped:', error.name === 'TimeoutError' ? 'Request timed out. Previous progress is saved.' : error.message);
  process.exitCode = 1;
});
