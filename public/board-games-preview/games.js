/* MathSoc board games preview: plain JavaScript, no framework.
 * Data lives in the ms-catalog JSON block. BGG data is optional.
 * See README.md for simple editing instructions.
 */
(async () => {
  const settings = {
    trackerLaunchDate: '2026-05-18', // Launch date from supplied popularity graphic.
    pageSize: 12,

  };

  const root = document.getElementById('mathsoc-games');
  // Keep local descriptions and expansion labels alongside live inventory.
const snapshot = JSON.parse(
  document.getElementById('ms-catalog').textContent
);
const metadataById = new Map(
  snapshot.map(game => [game.id, game])
);

let games = snapshot.filter(game => game.id !== "G0309");
let liveData = null;

try {
  const response = await fetch('/api/board-games', {
    cache: 'no-store',
    signal: AbortSignal.timeout(55000),
  });

  if (!response.ok) {
    throw new Error(`Catalogue request failed: ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data.games) || !data.games.length) {
    throw new Error('The catalogue response is empty.');
  }

  games = data.games.map(game => ({
    ...metadataById.get(game.id),
    ...game,
    ...(game.id === "G0049" ? { gameType: "expansion", baseGame: "Saboteur" } : {}),
    bgg: game.manualStats ? { ...game.bgg, ...game.manualStats, imageUrl: game.bgg?.imageUrl || null, source: "collection", demo: false } : game.bgg || null,
  }));

  liveData = data;
} catch (error) {
  console.error('Catalogue loading failed:', error);
}
  const gamesById = new Map(games.map(game => [game.id, game]));
  const alphabeticalGames = sortGames(games, 'az');
  const popularGames = sortGames(games, 'popular');
  // Small editorial blurbs, easy to edit without touching the rendering code.
  const gameDescriptions = {
    Catan: 'Trade resources, build settlements, and negotiate your way across the island.',
    Anomia: 'A quick-thinking party game where matching symbols spark a race to name an answer.',
    Wavelength: 'Guess where a clue sits on a spectrum–and find out how your friends think.',
    Cascadia: 'Build a peaceful landscape and arrange wildlife into satisfying patterns.',
    Coup: 'Bluff, challenge, and outwit your opponents with a handful of hidden roles.',
    Wingspan: 'Build a bird-filled engine with habitats, food, and carefully timed actions.',
  };
  const template = document.getElementById('ms-page-template');

  // Make text safe to place in HTML. This is not for JavaScript or URLs.
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[character]));
  }

  // One shared label keeps cards, details and spotlight availability consistent.
  function renderAvailability(game) {
    const available = game.available > 0;
    const label = available ? `Available: ${game.available} / ${game.total}` : game.needsReview > 0 ? "Check with staff" : "Not available";
    return `<span class="ms-status ${available ? 'ms-in' : 'ms-out'}"><span aria-hidden="true">${available ? '✓' : '×'}</span> ${escapeHtml(label)}</span>`;
  }

  // Label, value, and unit use the same stacked layout in both game views.
  function renderPlayerTime(bgg) {
    const minPlayers = Number(bgg.minPlayers);
    const maxPlayers = Number(bgg.maxPlayers);
    const minMinutes = Number(bgg.minMinutes);
    const maxMinutes = Number(bgg.maxMinutes);
    const players = minPlayers > 0 && maxPlayers >= minPlayers
      ? minPlayers === maxPlayers ? String(minPlayers) : `${minPlayers}–${maxPlayers}` : 'Unknown';
    const minutes = maxMinutes > 0
      ? minMinutes > 0 && minMinutes < maxMinutes ? `${minMinutes}–${maxMinutes}` : String(maxMinutes) : 'Unknown';
    return `<span class="ms-stat"><span class="ms-stat-label">Players</span><span class="ms-stat-value">${players}</span><small>people</small></span><span class="ms-stat"><span class="ms-stat-label">Play time</span><span class="ms-stat-value">${minutes} <small>min</small></span><small>estimated</small></span>`;
  }

  // BGG weight is displayed as difficulty; five segments keep the scale easy to read.
  // Preserve the decimal score instead of rounding the underlying data.
  function renderDifficulty(weight) {
    const score = Number(weight);
    if (weight == null || !Number.isFinite(score) || score < 1 || score > 5) {
      return '<span>Difficulty unrated</span>';
    }
    const displayScore = score.toFixed(1);
    const segments = Array.from({ length: 5 }, (_, index) => {
      const fill = Math.max(0, Math.min(1, score - index)) * 100;
      return `<i><em style="width:${fill}%"></em></i>`;
    }).join('');
    return `<span class="ms-difficulty" aria-label="Difficulty ${displayScore} out of 5, based on BGG complexity; 1 light, 5 heavy"><span>Difficulty ${displayScore} / 5</span><span class="ms-difficulty-scale" aria-hidden="true">${segments}</span><small>BGG complexity · 1 light, 5 heavy</small></span>`;
  }

  // Return a sorted copy, leaving the original catalogue unchanged.
  function sortGames(allGames, order) {
    return [...allGames].sort((a, b) => {
      const alphabetical = a.title.localeCompare(b.title, 'en', { sensitivity: 'base' })
        || a.id.localeCompare(b.id);
      if (order === 'za') return -alphabetical;
      if (order === 'popular') return (b.rentals ?? 0) - (a.rentals ?? 0) || alphabetical;
      return alphabetical;
    });
  }

  // Work entirely on cached local data. Missing BGG fields do not match BGG filters.
  function filterGames(allGames, state) {
    const query = state.query.trim().toLowerCase();
    return allGames.filter(game => {
      if (!game.title.toLowerCase().includes(query)) return false;
      if (state.availability === 'available' && game.available <= 0) return false;
      if (state.availability === 'unavailable' && game.available > 0) return false;
      const bgg = game.bgg;
      if (state.players && (!bgg || !(bgg.minPlayers > 0) || !(bgg.maxPlayers > 0) || bgg.minPlayers > state.players || bgg.maxPlayers < state.players)) return false;
      if (state.maxMinutes && (!bgg || !bgg.maxMinutes || bgg.maxMinutes > state.maxMinutes)) return false;
      if (state.maxWeight && (!bgg || !bgg.weight || bgg.weight > state.maxWeight)) return false;
      return true;
    });
  }

  // Every matching game has the same probability; sorting doesn't affect its chance.
  function getRandomGame(candidates) {
    if (!candidates.length) return null;
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  // Six real CSS faces; the original cutout remains available for the feed logo.
  function createDiceCube(app) {
    const image = app.querySelector('.ms-dice');
    image.className = 'ms-dice-source';
    image.hidden = true;
    const die = document.createElement('span');
    die.className = 'ms-dice';
    die.setAttribute('aria-hidden', 'true');
    const pipCells = [[5], [1, 9], [1, 5, 9], [1, 3, 7, 9], [1, 3, 5, 7, 9], [1, 3, 4, 6, 7, 9]];
    die.innerHTML = `<span class="ms-dice-view"><span class="ms-cube">${pipCells.map((cells, index) => `<span class="ms-cube-face ms-face-${index + 1}">${cells.map(cell => `<span class="ms-pip" style="grid-area:${Math.ceil(cell / 3)} / ${(cell - 1) % 3 + 1}"></span>`).join('')}</span>`).join('')}</span></span>`;
    image.after(die);
    return die.querySelector('.ms-cube');
  }

  // Bring the chosen face toward the viewer. Opposite faces sum to seven.
  function buildCubeRoll(start, face) {
    const orientations = [[0, 0], [0, -90], [90, 0], [-90, 0], [0, 90], [0, 180]];
    const [targetX, targetY] = orientations[face - 1];
    const x = targetX + 360 * (Math.floor(start.x / 360) + 2);
    const y = targetY + 360 * (Math.floor(start.y / 360) + 3);
    const frames = Array.from({ length: 151 }, (_, index) => {
      const progress = index / 150;
      const ease = 1 - Math.pow(1 - progress, 3);
      return { transform: `rotateX(${start.x + (x - start.x) * ease}deg) rotateY(${start.y + (y - start.y) * ease}deg)` };
    });
    return { frames, pose: { x, y } };
  }

  // Gravity and bounces move the stage; the cube tumbles separately inside it.
  function buildDiceThrow(start = { x: 0, rotation: 0 }) {
    const gravity = 1200;      // Pixels per second squared.
    const bounce = 0.48;       // Retain 48% of vertical speed on impact.
    const step = 1 / 120;      // Fixed simulation step; independent of frame rate.
    const flightSeconds = 1.05;
    let x = start.x;
    let y = 0;
    let vx = (x > 0 ? -1 : 1) * (48 + Math.random() * 16);
    let vy = -(240 + Math.random() * 35);
    let rotation = start.rotation;
    let spin = Math.sign(vx) * (650 + Math.random() * 160);
    const frames = [];
    const shadows = [];
    for (let time = 0; time <= flightSeconds; time += step) {
      frames.push({ transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)` });
      shadows.push({ transform: `translateX(${x}px) scale(${1 + Math.abs(y) / 70})`, opacity: Math.max(0.08, 0.24 - Math.abs(y) / 280) });
      vy += gravity * step;
      y += vy * step;
      x += vx * step;
      rotation += spin * step;
      // Floor collision: bounce upward, lose spin and slide speed.
      if (y >= 0) {
        y = 0;
        vy = Math.abs(vy) > 35 ? -vy * bounce : 0;
        vx *= Math.exp(-8 * step);
        spin *= Math.exp(-12 * step);
      }
      // Keep the throw inside the button's small stage.
      if (Math.abs(x) > 25) {
        x = Math.sign(x) * 25;
        vx *= -0.35;
      }
    }
    // Gently settle upright after the bounces, rather than snapping orientation.
    const finalRotation = Math.round(rotation / 360) * 360;
    for (let i = 1; i <= 24; i++) {
      const progress = i / 24;
      const ease = 1 - Math.pow(1 - progress, 3);
      frames.push({ transform: `translate(${x}px, 0px) rotate(${rotation + (finalRotation - rotation) * ease}deg)` });
      shadows.push({ transform: `translateX(${x}px) scale(1)`, opacity: 0.24 });
    }
    return { frames, shadows, duration: 1250, pose: { x, rotation: finalRotation } };
  }

  // Accept only HTTPS image addresses. Image hosts need approval in the live site.
  function getImageUrl(game) {
    const address = game.bgg?.imageUrl;
    if (!address) return null;
    try {
      const url = new URL(address);
      return url.protocol === 'https:' ? url.href : null;
    } catch {
      return null;
    }
  }

  // Preview votes are saved per game in this browser; no invented community totals.
  const storedPlayAgain = window.mathsocState.saved.playAgain;
  const playAgain = Object.fromEntries(Object.entries(storedPlayAgain && typeof storedPlayAgain === 'object' ? storedPlayAgain : {}).filter(([id, vote]) => gamesById.has(id) && ['yes', 'no'].includes(vote)));
  function playAgainSummary(id) {
    const vote = playAgain[id];
    return vote === 'yes' ? '1/1 would play again' : vote === 'no' ? '0/1 would play again' : '0/0 would play again · No votes yet';
  }
  function replayScore(game) {
    return playAgain[game.id] === 'yes' ? 1 : 0;
  }

  // Explicit catalogue labels avoid guessing expansion status from punctuation.
  function canRollGame(game) {
    return !["expansion", "standalone-expansion", "accessory"].includes(game.gameType)
      && game.bgg?.isExpansion !== true;
  }

  function gameTypeLabel(game) {
    if (game.gameType === 'expansion') return `<span class="ms-game-type ms-expansion">Expansion · Requires ${escapeHtml(game.baseGame)}</span>`;
    if (game.gameType === 'standalone-expansion') return '<span class="ms-game-type">Standalone expansion · Play on its own or with Wingspan</span>';
    if (game.gameType === 'accessory') return `<span class="ms-game-type">Accessory · Requires ${escapeHtml(game.baseGame)}</span>`;
    return `<span class="ms-game-type">${game.gameType === 'base' ? 'Base game · Play on its own' : 'Game type awaiting confirmation'}</span>`;
  }

  function createGameCard(game, showShelf) {
    const image = getImageUrl(game);
    const initials = game.title.split(/\s+/).slice(0, 2).map(word => word[0]).join('');
    const cover = image
      ? `<img src="${escapeHtml(image)}" alt="" loading="lazy">`
      : `<b>${escapeHtml(initials)}</b>`;
    return `<button type="button" class="ms-game cursor-interaction" data-game="${escapeHtml(game.id)}">
      <div class="ms-cover${image ? ' ms-cover-image' : ''}" aria-hidden="true">${cover}</div>
      <div class="ms-game-info">
        <span class="ms-game-title">${escapeHtml(game.title)}</span>${gameTypeLabel(game)}
        ${gameDescriptions[game.title] ? `<span class="ms-card-description">${escapeHtml(gameDescriptions[game.title])}</span>` : ''}
        <span class="ms-card-stats">${renderAvailability(game)}${game.bgg ? renderPlayerTime(game.bgg) + renderDifficulty(game.bgg.weight) : '<span class="ms-stat"><span class="ms-stat-label">Players</span><span class="ms-stat-value">–</span><small>Not matched yet</small></span><span class="ms-stat"><span class="ms-stat-label">Play time</span><span class="ms-stat-value">–</span><small>Not matched yet</small></span><span class="ms-stat"><span class="ms-stat-label">Difficulty</span><span class="ms-stat-value">– / 5</span><small>Not matched yet</small></span>'}</span>
        ${game.bgg && !game.bgg.demo ? '' : `<span class="ms-card-note">${game.bgg?.demo ? 'Illustrative stats · BGG connection pending' : 'Player count, time & difficulty await BGG matching.'}</span>`}
        <span class="ms-replay-summary">${playAgainSummary(game.id)}</span>
        <span class="ms-meta">${game.total} ${game.total === 1 ? 'copy' : 'copies'}${showShelf ? ' · Shelf ' + escapeHtml(game.shelf) : ''}</span>
      </div>
    </button>`;
  }

  // Save local preferences and wishlist votes without a remote service.
  function saveState(state) {
    window.mathsocState.save({ query: state.query, sort: state.sort, availability: state.availability, players: state.players, maxMinutes: state.maxMinutes, maxWeight: state.maxWeight, view: state.view, wishlist: state.wishlist });
  }

  // A new notice ID makes an updated announcement visible again.
  async function initializeAnnouncement(app) {
    try {
      const response = await fetch('announcement.json', { cache: 'no-store' });
      if (!response.ok) return;
      const notice = await response.json();
      if (notice.enabled !== true || typeof notice.id !== 'string' || !notice.id.trim()
          || typeof notice.message !== 'string' || !notice.message.trim()) return;

      const storageKey = 'mathsoc-board-games-dismissed-notice';
      try { if (localStorage.getItem(storageKey) === notice.id) return; } catch {}

      const stylesheet = document.createElement('link');
      stylesheet.rel = 'stylesheet';
      stylesheet.href = 'announcement.css';
      document.head.append(stylesheet);

      const banner = document.createElement('section');
      banner.className = 'ms-announcement';
      banner.setAttribute('aria-label', 'Board games announcement');
      const icon = document.createElement('span');
      icon.className = 'ms-announcement-icon';
      icon.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v6"/><circle cx="12" cy="17" r="1" fill="currentColor" stroke="none"/></svg>';
      icon.setAttribute('aria-hidden', 'true');
      const message = document.createElement('p');
      message.textContent = notice.message;
      banner.append(icon, message);

      const close = document.createElement('button');
      close.type = 'button';
      close.className = 'ms-announcement-close';
      close.setAttribute('aria-label', 'Dismiss board games announcement');
      close.textContent = '×';
      close.addEventListener('click', () => {
        try { localStorage.setItem(storageKey, notice.id); } catch {}
        banner.remove();
      });
      banner.append(close);
      const slot = app.querySelector('.ms-announcement-slot');
      const hero = app.querySelector('.ms-hero');
      if (slot) slot.append(banner);
      else if (hero) hero.before(banner);
      else app.prepend(banner);
    } catch {
      // An unavailable notice file does not prevent catalogue browsing.
    }
  }

  function initializePage(app) {
    initializeAnnouncement(app);
    app.replaceChildren(template.content.cloneNode(true));
    // Attribution is a separate link, never nested inside a game-card button.
    const attribution = document.createElement('a');
    attribution.className = 'ms-bgg-attribution';
    attribution.href = 'https://boardgamegeek.com/';
    attribution.target = '_blank';
    attribution.rel = 'noopener noreferrer';
    attribution.innerHTML = '<img src="assets/powered-by-bgg-rgb.svg" alt="Powered by BGG" width="171" height="38">';
    app.querySelector('.ms-bgg-filters').after(attribution);

    // Failed cover downloads use the same initials placeholder as unmatched games.
    app.addEventListener('error', event => {
      const image = event.target;
      if (!(image instanceof HTMLImageElement) || !image.closest('.ms-cover')) return;
      const cover = image.closest('.ms-cover');
      const game = gamesById.get(cover.dataset.gameId || cover.closest('[data-game]')?.dataset.game);
      const initials = document.createElement('b');
      initials.textContent = game.title.split(/\s+/).slice(0, 2).map(word => word[0]).join('');
      cover.classList.remove('ms-cover-image');
      cover.replaceChildren(initials);
    }, true);

    const saved = window.mathsocState.saved;
    const state = {
      query: saved.query || '', sort: ['popular', 'az', 'za', 'replay-high', 'replay-low'].includes(saved.sort) ? saved.sort : 'popular',
      availability: ['all', 'available', 'unavailable'].includes(saved.availability) ? saved.availability : 'available',
      players: [1,2,3,4,5,6,7,8].includes(Number(saved.players)) ? Number(saved.players) : 0,
      maxMinutes: [30,60,120].includes(Number(saved.maxMinutes)) ? Number(saved.maxMinutes) : 0,
      maxWeight: [2,3].includes(Number(saved.maxWeight)) ? Number(saved.maxWeight) : 0,
      view: saved.view === 'compact' ? 'compact' : 'detailed',
      limit: saved.view === 'compact' ? 24 : settings.pageSize, selected: null, showShelf: true,
      wishlist: Array.isArray(saved.wishlist) ? saved.wishlist.filter(entry => entry && typeof entry.title === 'string').slice(0, 30).map(entry => ({ title: String(entry.title).slice(0, 100), kind: entry.kind === 'copies' ? 'copies' : 'new', votes: Number(entry.votes) || 0, userVote: [-1, 1].includes(entry.userVote) ? entry.userVote : entry.voted ? 1 : 0 })) : [],
    };
    const grid = app.querySelector('.ms-grid');
    const detail = app.querySelector('.ms-detail');
    app.querySelector('.ms-picks').append(detail);
    const search = app.querySelector('input');
    const sort = app.querySelector('.ms-sort');
    const view = app.querySelector('.ms-view');
    view.value = state.view;
    app.dataset.cardView = state.view;
    let dicePose = { x: 0, rotation: 0 };
    let cubePose = { x: 0, y: 0 };
    const cube = createDiceCube(app);
    let isRolling = false;
    const diceShadow = document.createElement('span');
    diceShadow.className = 'ms-dice-shadow';
    diceShadow.setAttribute('aria-hidden', 'true');
    app.querySelector('.ms-roll').prepend(diceShadow);
    search.value = state.query;
    sort.value = state.sort;
    function syncPreferences() {
      app.querySelectorAll('[data-filter]').forEach(control => {
        control.value = String(state[control.dataset.filter] || '');
      });
      const captions = [];
      if (state.players) captions.push(`${state.players} players`);
      if (state.maxMinutes) captions.push(`Up to ${state.maxMinutes} min`);
      if (state.maxWeight) captions.push(`Difficulty up to ${state.maxWeight}/5`);
      captions.push({ all: 'All games', available: 'Available now', unavailable: 'Unavailable' }[state.availability]);
      if (state.query.trim()) captions.push(`Search: ${state.query.trim()}`);
      app.querySelector('.ms-dice-filter-summary').textContent = captions.join(' · ');
    }
    syncPreferences();

    // Cached orders mean typing in search doesn't sort all 322 games again.
    function getMatches() {
      const ordered = state.sort === 'popular' ? popularGames
        : state.sort === 'za' ? [...alphabeticalGames].reverse() : [...alphabeticalGames];
      if (state.sort.startsWith('replay-')) {
        ordered.sort((a, b) => {
          const aVoted = ['yes', 'no'].includes(playAgain[a.id]);
          const bVoted = ['yes', 'no'].includes(playAgain[b.id]);
          if (aVoted !== bVoted) return aVoted ? -1 : 1;
          const difference = replayScore(b) - replayScore(a);
          return (state.sort === 'replay-high' ? difference : -difference) || a.title.localeCompare(b.title);
        });
      }
      return filterGames(ordered, state);
    }

    // Only an explicit request adds a missing game; typing never casts a vote.
    function renderWishlist() {
      const ranked = [...state.wishlist].sort((a, b) => b.votes - a.votes || a.title.localeCompare(b.title));
      app.querySelector('.ms-wishlist-list').innerHTML = ranked.map((entry, index) =>
        `<div class="ms-wishlist-row"><span>${index + 1}</span><span>${escapeHtml(entry.title)}<small class="ms-request-kind">${entry.kind === 'copies' ? 'More copies · ' + (games.find(game => game.title.toLowerCase() === entry.title.toLowerCase())?.total ?? 0) + ' owned' : 'New game'}</small></span><span class="ms-vote-controls"><button type="button" data-wish="${escapeHtml(entry.title)}" data-kind="${entry.kind}" data-direction="1" aria-label="Upvote ${escapeHtml(entry.title)}" aria-pressed="${entry.userVote === 1}">↑</button><strong aria-label="Score">${entry.votes}</strong><button type="button" data-wish="${escapeHtml(entry.title)}" data-kind="${entry.kind}" data-direction="-1" aria-label="Downvote ${escapeHtml(entry.title)}" aria-pressed="${entry.userVote === -1}">↓</button></span></div>`
      ).join('') || '<p>No requests yet. Search for a game we don’t own to start the wishlist.</p>';
    }

    // A browser gets one vote per game. Clicking again removes it; switching replaces it.
    function addWishlistVote(title, direction = 1, kind = 'new') {
      const cleanTitle = title.trim().slice(0, 100);
      const owned = games.some(game => game.title.toLowerCase() === cleanTitle.toLowerCase());
      if (!cleanTitle || (kind === 'copies' ? !owned : owned)) return;
      let entry = state.wishlist.find(item => item.title.toLowerCase() === cleanTitle.toLowerCase());
      if (!entry) {
        if (state.wishlist.length >= 30) return;
        entry = { title: cleanTitle, kind, votes: 0, userVote: 0 };
        state.wishlist.push(entry);
      }
      const nextVote = entry.userVote === direction ? 0 : direction;
      entry.votes += nextVote - entry.userVote;
      entry.userVote = nextVote;
      app.querySelector('.ms-wishlist-status').textContent = nextVote === 0 ? `Removed your vote for ${entry.title}.` : `${nextVote === 1 ? 'Upvoted' : 'Downvoted'} ${entry.title}.`;
      renderWishlist(); renderCatalogue(); saveState(state);
    }

    function renderCatalogue() {
      const matches = getMatches();
      const query = state.query.trim().slice(0, 100);
      // Check the entire catalogue so other filters cannot suggest buying an owned game.
      const missing = query.length >= 2 && !games.some(game => game.title.toLowerCase().includes(query.toLowerCase()));
      app.querySelector('.ms-wishlist-prompt').hidden = !missing;
      app.querySelector('.ms-missing-title').textContent = `Game not found: “${query}” isn’t in our collection. Add it to our wishlist?`;
      const addButton = app.querySelector('.ms-wishlist-add');
      const requested = state.wishlist.some(entry => entry.title.toLowerCase() === query.toLowerCase());
      addButton.disabled = requested || state.wishlist.length >= 30;
      addButton.textContent = requested ? 'Already on the wishlist ✓' : 'Add to wishlist';
      grid.innerHTML = matches.slice(0, state.limit)
        .map(game => createGameCard(game, state.showShelf)).join('')
        || (missing ? '<p>Game not found. You can request it using the wishlist prompt above.</p>' : '<p>No games match your filters. Try changing the filters.</p>');
      app.querySelector('.ms-count').textContent = `${matches.length} matches · showing ${Math.min(matches.length, state.limit)}`;
      app.querySelector('.ms-more').hidden = matches.length <= state.limit;
      app.querySelector('.ms-roll').disabled = isRolling || !matches.some(canRollGame);
    }

    function showGameDetails(game) {
      if (!game) return;
      state.selected = game.title;
      detail.hidden = false;
      const bgg = game.bgg;
      const image = getImageUrl(game);
      const initials = game.title.split(/\s+/).slice(0, 2).map(word => word[0]).join('');
      const detailCover = `<div class="ms-cover ms-detail-cover${image ? ' ms-cover-image' : ''}" data-game-id="${escapeHtml(game.id)}" aria-hidden="true">${image ? `<img src="${escapeHtml(image)}" alt="" decoding="async">` : `<b>${escapeHtml(initials)}</b>`}</div>`;
      detail.innerHTML = `<div class="ms-detail-head">${detailCover}<div class="ms-detail-title"><h3>${escapeHtml(game.title)}</h3>${gameDescriptions[game.title] ? `<p class="ms-detail-description">${escapeHtml(gameDescriptions[game.title])}</p>` : ''}</div><button type="button" class="ms-close cursor-interaction">Close</button></div>
        ${gameTypeLabel(game)}<p class="ms-detail-stock">${renderAvailability(game)} <button type="button" class="ms-request-copy" data-copy="${escapeHtml(game.id)}" ${state.wishlist.some(entry => entry.kind === 'copies' && entry.title.toLowerCase() === game.title.toLowerCase()) ? 'disabled' : ''}>${state.wishlist.some(entry => entry.kind === 'copies' && entry.title.toLowerCase() === game.title.toLowerCase()) ? '✓ Requested' : 'Request another copy'}</button> · ${game.total} ${game.total === 1 ? 'copy' : 'copies'} · ${game.rentals ?? 0} rentals${state.showShelf ? ' · Shelf ' + escapeHtml(game.shelf) : ''}</p>
        ${bgg ? `<div class="ms-detail-facts">${renderPlayerTime(bgg)}${renderDifficulty(bgg.weight)}</div><p class="ms-bgg-note">${bgg.demo ? 'Illustrative metadata · not fetched from BGG' : bgg.source === 'collection' ? 'Player count supplied by MathSoc' : 'Game information from BGG'}</p>` : '<p>Game information will appear here after this title is matched to BGG.</p>'}`;
      detail.innerHTML += `<section class="ms-replay"><span class="ms-replay-label">Would you play this again?</span><p class="ms-replay-summary" aria-live="polite">${playAgainSummary(game.id)}</p><div class="ms-replay-buttons"><button type="button" aria-label="Would play again" title="Would play again" data-replay="yes" data-replay-id="${escapeHtml(game.id)}" aria-pressed="${playAgain[game.id] === 'yes'}"><svg class="ms-thumb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 10v11H3V10h4Zm0 0 5-7c1-1 3 0 3 2l-1 5h5a2 2 0 0 1 2 2l-2 7a2 2 0 0 1-2 2H7"/></svg></button><button type="button" aria-label="Would not play again" title="Would not play again" data-replay="no" data-replay-id="${escapeHtml(game.id)}" aria-pressed="${playAgain[game.id] === 'no'}"><svg class="ms-thumb-icon ms-thumb-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 10v11H3V10h4Zm0 0 5-7c1-1 3 0 3 2l-1 5h5a2 2 0 0 1 2 2l-2 7a2 2 0 0 1-2 2H7"/></svg></button></div><small>Local preview vote · click again to undo.</small></section>`;
      saveState(state);
      detail.scrollIntoView({ block: 'nearest', behavior: 'auto' });
    }

    function renderLeaderboard() {
      const leaders = popularGames.filter(game => game.rentals > 0)
        .slice(0, app.dataset.layout === 'library' ? 6 : 9);
      let rank = 1;
      app.querySelector('.ms-ranks').innerHTML = leaders.map((game, index) => {
        if (index && game.rentals !== leaders[index - 1].rentals) rank = index + 1;
        return `<button type="button" class="ms-rank cursor-interaction" data-game="${game.id}">
          <span class="ms-rank-number">${rank}</span><span>${escapeHtml(game.title)}
          <div class="ms-bar"><span style="width:${game.rentals / leaders[0].rentals * 100}%"></span></div></span>
          <span class="ms-rank-value">${game.rentals}</span></button>`;
      }).join('');
      app.querySelector('.ms-since').textContent = settings.trackerLaunchDate
        ? `Since ${new Intl.DateTimeFormat('en-CA', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(settings.trackerLaunchDate + 'T00:00:00Z'))} · rentals`
        : 'Since launch · date awaiting confirmation';
    }

    async function rollForGame() {
      const button = app.querySelector('.ms-roll');
      if (button.disabled) return;
      const game = getRandomGame(getMatches().filter(canRollGame));
      isRolling = true;
      button.disabled = true;
      app.querySelector('.ms-random-result').textContent = 'Rolling…';
      const die = app.querySelector('.ms-dice');
      const face = 1 + Math.floor(Math.random() * 6);
      const tumble = buildCubeRoll(cubePose, face);
      // Native animation: no library, no repeating timer; skip for reduced motion.
      if (die.animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const throwMotion = buildDiceThrow(dicePose);
        const roll = die.animate(throwMotion.frames, { duration: throwMotion.duration, easing: 'linear', fill: 'forwards' });
        const shadowMotion = diceShadow.animate(throwMotion.shadows, { duration: throwMotion.duration, easing: 'linear', fill: 'forwards' });
        const cubeMotion = cube.animate(tumble.frames, { duration: throwMotion.duration, easing: 'linear', fill: 'forwards' });
        try { await roll.finished; } catch { /* A cancelled animation still reveals the pick. */ }
        dicePose = throwMotion.pose;
        die.style.transform = throwMotion.frames.at(-1).transform;
        diceShadow.style.transform = throwMotion.shadows.at(-1).transform;
        roll.cancel(); shadowMotion.cancel(); cubeMotion.cancel();
      }
      cube.style.transform = tumble.frames.at(-1).transform;
      cubePose = tumble.pose;
      button.setAttribute('aria-label', 'Roll the die to pick a game.');
      app.querySelector('.ms-random-result').textContent = game ? game.title : 'No matching games.';
      if (game) showGameDetails(game);
      isRolling = false;
      button.disabled = !getMatches().some(canRollGame);
    }

    function updateFilters(event) {
      state.query = search.value;
      state.sort = sort.value;
      const key = event?.target.dataset.filter;
      if (key) state[key] = key === 'availability' ? event.target.value : Number(event.target.value);
      syncPreferences();
      state.view = view.value;
      app.dataset.cardView = state.view;
      state.limit = state.view === 'compact' ? 24 : settings.pageSize;
      renderCatalogue();
      saveState(state);
    }

    // One click handler for cards and ranks, instead of one handler per game.
    app.addEventListener('click', event => {
      const copy = event.target.closest('[data-copy]');
      if (copy) {
        const game = gamesById.get(copy.dataset.copy);
        if (game) { addWishlistVote(game.title, 1, 'copies'); showGameDetails(game); }
      }
      const replay = event.target.closest('[data-replay]');
      if (replay) {
        const id = replay.dataset.replayId;
        const choice = replay.dataset.replay;
        if (playAgain[id] === choice) delete playAgain[id];
        else playAgain[id] = choice;
        window.mathsocState.save({ playAgain });
        renderCatalogue();
        showGameDetails(gamesById.get(id));
      }
      const vote = event.target.closest('[data-wish]');
      if (vote) addWishlistVote(vote.dataset.wish, Number(vote.dataset.direction), vote.dataset.kind);
      const card = event.target.closest('[data-game]');
      if (card) showGameDetails(gamesById.get(card.dataset.game));
      if (event.target.closest('.ms-close')) {
        detail.hidden = true; state.selected = null; saveState(state);
      }
    });
    app.querySelector('.ms-wishlist-add').addEventListener('click', () => addWishlistVote(state.query));
    search.addEventListener('input', updateFilters);
    app.querySelectorAll('.ms-toolbar select, .ms-bgg-filters select, .ms-dice-preferences select').forEach(select => select.addEventListener('change', updateFilters));
    app.querySelector('.ms-more').addEventListener('click', () => {
      state.limit += state.view === 'compact' ? 24 : settings.pageSize; renderCatalogue();
    });
    app.querySelector('.ms-reset-preferences').addEventListener('click', () => {
      state.availability = 'available'; state.players = 0; state.maxMinutes = 0; state.maxWeight = 0;
      syncPreferences(); updateFilters();
    });
    app.querySelector('.ms-roll').addEventListener('click', rollForGame);
    const hasBgg = games.some(game => game.bgg);
    app.querySelectorAll('[data-filter]:not([data-filter="availability"])').forEach(select => { select.disabled = !hasBgg; });
    const realCount = games.filter(game => game.bgg && !game.bgg.demo && game.bgg.source !== "collection").length;
    const demoCount = games.filter(game => game.bgg?.demo).length;
    if (hasBgg) app.querySelector('.ms-bgg-note').textContent = `${realCount} games with BGG data · ${demoCount} with illustrative stats. Games without metadata are excluded when metadata filters are selected.`;
    renderCatalogue(); renderLeaderboard(); renderWishlist();
    initializeCommunityFeatures(app, gamesById, popularGames, showGameDetails, escapeHtml, renderAvailability);

  }

  root.querySelectorAll('.ms-app').forEach(initializePage);

  const updateCaption = document.createElement('p');
  updateCaption.className = 'ms-update-caption';
  updateCaption.setAttribute('role', 'status');

  updateCaption.textContent = liveData
    ? `Rental stats refreshed: ${
        liveData.popularityRefreshed || 'date unavailable'
      }`
    : 'Showing saved availability. Please check with office staff.';

  root.querySelector('.ms-hero').after(updateCaption);
})();
