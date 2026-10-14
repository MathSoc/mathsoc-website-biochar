/* Small preview-only feature. No network requests, accounts, database or timers.
 * Load this before games.js. Dates and weekly/monthly examples are kept together.
 */
function initializeCommunityFeatures(app, gamesById, popularGames, showGameDetails, escapeHtml, renderAvailability) {
  const samplePeriods = {
    week: [['Wavelength', 4], ['Coup', 3], ['Cascadia', 2]],
    month: [['Catan', 9], ['Secret Hitler', 6], ['Wingspan', 5]],
  };
  const diceImage = app.querySelector('.ms-dice-source').src;
  const form = app.querySelector('.ms-recommend-form');
  const gameSelect = app.querySelector('.ms-recommend-game');
  const reasonInput = app.querySelector('.ms-recommend-reason');
  // Use an editable display name; a blank name becomes Anonymous.
  const nameLabel = document.createElement('label');
  nameLabel.textContent = 'Display name (optional)';
  const nameInput = document.createElement('input');
  nameInput.className = 'ms-recommend-name';
  nameInput.type = 'text';
  nameInput.maxLength = 30;
  nameInput.placeholder = 'Your name, or leave anonymous';
  nameInput.autocomplete = 'nickname';
  nameLabel.append(nameInput);
  form.querySelector('h3').after(nameLabel);
  const feed = app.querySelector('.ms-feed');
  let activePeriod = 'all';
  let activeTab = 'browse';
  // Sample recommendations requested for the preview; not real submitted posts.
  const sampleRecommendations = [
  {
    "id": "G0265",
    "user": "Mica",
    "title": "Poetry for Neanderthals:",
    "displayTitle": "Poetry for Neanderthals",
    "reason": "I like that ya get to boink friends with an inflatable ooga booga stick.",
    "time": "Sample recommendation"
  },
  {
    "id": "G0008",
    "user": "E-Therng",
    "title": "Chess",
    "displayTitle": "Chess",
    "reason": "",
    "time": "Sample recommendation"
  },
  {
    "id": "G0229",
    "user": "Mark",
    "title": "Air, Land & Sea",
    "displayTitle": "Air, Land & Sea",
    "reason": "",
    "time": "Sample recommendation"
  },
  {
    "id": "G0011",
    "user": "Sarah",
    "title": "Deluxe Mancala",
    "displayTitle": "Mancala",
    "reason": "",
    "time": "Sample recommendation"
  },
  {
    "id": "G0037",
    "user": "River",
    "title": "Coup",
    "displayTitle": "Coup",
    "reason": "",
    "time": "Sample recommendation"
  }
];

  // Keep one recommendation per game from this browser. Sample posts do not count.
  const savedRecommendations = window.mathsocState.saved.recommendations;
  let localRecommendations = Array.isArray(savedRecommendations)
    ? savedRecommendations.filter(entry => entry && gamesById.has(entry.id) && typeof entry.user === 'string' && typeof entry.reason === 'string').slice(0, 322) : [];
  const favourite = document.createElement('section');
  favourite.className = 'ms-community-favourite';
  app.querySelector('.ms-community-head').after(favourite);
  function renderCommunityFavourite() {
    const counts = new Map();
    localRecommendations.forEach(entry => counts.set(entry.id, (counts.get(entry.id) || 0) + 1));
    const leaders = [...counts].sort((a, b) => b[1] - a[1]);
    if (!leaders.length) {
      favourite.innerHTML = '<h3>Community favourite</h3><p>No recommendations yet. Suggest a game below!</p><small>Local preview · sample posts are excluded.</small>';
      return;
    }
    const tied = leaders.filter(entry => entry[1] === leaders[0][1]);
    favourite.innerHTML = `<h3>Community favourite${tied.length > 1 ? 's · tied' : ''}</h3>${tied.map(([id, count]) => `<p><button type="button" data-game="${escapeHtml(id)}">${escapeHtml(gamesById.get(id).title)}</button> · ${count} recommendation${count === 1 ? '' : 's'}</p>`).join('')}<small>Local preview · one recommendation per game per browser.</small>`;
  }
  const pageSize = 5;
  let historyPage = 0;
  let pendingMessages = 0;
  let historyAnchor = null;
  const navigation = document.createElement('div');
  navigation.className = 'ms-feed-navigation';
  navigation.innerHTML = '<button type="button" class="ms-feed-newer" aria-label="Show newer messages">←</button><span class="ms-feed-page" role="status"></span><button type="button" class="ms-feed-older" aria-label="Show older messages">→</button><button type="button" class="ms-feed-live">Back to live</button>';
  feed.after(navigation);
  app.querySelector('.ms-feed-head span').textContent = 'Live · local preview';

  function getFeedEntries() {
    return [...localRecommendations].reverse().map(entry => ({ ...entry,
      title: gamesById.get(entry.id).title,
      time: entry.createdAt ? new Date(entry.createdAt).toLocaleString('en-CA', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : 'Saved · local preview',
    })).concat(sampleRecommendations);
  }
  function browseFeed(direction) {
    historyPage = Math.max(0, historyPage + direction);
    historyAnchor = historyPage ? getFeedEntries()[historyPage * pageSize] : null;
    if (!historyPage) pendingMessages = 0;
    renderRecommendationFeed();
  }
  navigation.querySelector('.ms-feed-older').addEventListener('click', () => browseFeed(1));
  navigation.querySelector('.ms-feed-newer').addEventListener('click', () => browseFeed(-1));
  navigation.querySelector('.ms-feed-live').addEventListener('click', () => {
    historyPage = 0; historyAnchor = null; pendingMessages = 0; renderRecommendationFeed();
  });
  // Storage events deliver saved recommendations from other tabs without a timer.
  window.addEventListener('storage', event => {
    if (event.key !== 'mathsoc-board-games-v1' || !event.newValue) return;
    let saved;
    try { saved = JSON.parse(event.newValue); } catch { return; }
    if (!Array.isArray(saved.recommendations)) return;
    const next = saved.recommendations.filter(entry => entry && gamesById.has(entry.id) && typeof entry.user === 'string' && typeof entry.reason === 'string').slice(0, 322);
    if (JSON.stringify(next) === JSON.stringify(localRecommendations)) return;
    if (historyPage) pendingMessages += next.filter(entry => !localRecommendations.some(old => old.id === entry.id)).length;
    localRecommendations = next;
    window.mathsocState.saved = saved;
    renderRecommendationFeed(); renderCommunityFavourite();
  });

  // Borrower and last-rental figures transcribed from the supplied Oct 4 poster.
  // Compact all-time rental bars use the live catalogue totals.
  function renderPodium(period = 'all') {
    activePeriod = period;
    const scopes = {
      all: 'Since May 18, 2026 · Top 3 · All-time',
      month: 'Past 30 days · Top 3',
      week: 'Past 7 days · Top 3',
    };
    app.querySelectorAll('[data-period]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.period === period));
    });
    if (period !== 'all') {
      app.querySelector('.ms-period-caption').textContent = scopes[period];
      app.querySelector('.ms-podium').innerHTML = '<p class="ms-period-unavailable">These rankings will appear once dated rental totals are connected.</p>';
      app.querySelector('.ms-podium-note').textContent = 'All-time rankings are available now.';
      return;
    }
    const leaders = popularGames.filter(game => game.rentals > 0).slice(0, 3);
    const maximum = Math.max(1, ...leaders.map(game => game.rentals));
    app.querySelector('.ms-podium').innerHTML = leaders.map((game, index) => `
      <button type="button" data-game="${escapeHtml(game.id)}" class="ms-rental-bar-card cursor-interaction">
        <span class="ms-rental-bar-label"><span>${index + 1}. ${escapeHtml(game.title)}</span><strong>${game.rentals} <small>rentals</small></strong></span>
        <span class="ms-rental-bar-track" aria-hidden="true"><span style="width:${game.rentals / maximum * 100}%"></span></span>
      </button>`).join('') || '<p>No rental totals yet.</p>';
    app.querySelector('.ms-period-caption').textContent = scopes.all;
    app.querySelector('.ms-podium-note').textContent = 'One copy borrowed counts as one rental.';
  }

  function switchCommunityTab(tab) {
    activeTab = tab;
    const communityOpen = tab === 'community';
    app.querySelector('.ms-community').hidden = false;
    app.querySelector('.ms-picks').hidden = false;
    app.querySelector('.ms-columns').hidden = false;
    app.querySelector('.ms-detail').hidden = true;
    app.querySelectorAll('[data-page-tab]').forEach(button => {
      button.setAttribute('aria-selected', String(button.dataset.pageTab === tab));
    });
  }

  // Text is escaped; recommendations cannot inject links or markup.
  function renderRecommendationFeed() {
    const entries = getFeedEntries();
    // Hold the first historical message steady when new messages arrive.
    const anchorIndex = historyAnchor ? entries.findIndex(entry => entry.id === historyAnchor.id && entry.title === historyAnchor.title && entry.user === historyAnchor.user) : -1;
    const start = historyPage ? Math.max(0, anchorIndex >= 0 ? anchorIndex : historyPage * pageSize) : 0;
    feed.setAttribute('aria-live', historyPage ? 'off' : 'polite');
    navigation.querySelector('.ms-feed-newer').disabled = !historyPage;
    navigation.querySelector('.ms-feed-older').disabled = start + pageSize >= entries.length;
    navigation.querySelector('.ms-feed-page').textContent = historyPage ? `Older messages · ${start + 1}–${Math.min(start + pageSize, entries.length)}` : 'Latest messages';
    navigation.querySelector('.ms-feed-live').hidden = !historyPage;
    navigation.querySelector('.ms-feed-live').textContent = pendingMessages ? `Back to live · ${pendingMessages} new` : 'Back to live';
    feed.innerHTML = entries.slice(start, start + pageSize).map(entry => {
      const game = gamesById.get(entry.id) || [...gamesById.values()].find(game => game.title === entry.title);
      if (!game) return '';
      return `<article class="ms-feed-row">
        <span class="ms-feed-avatar" aria-hidden="true">${escapeHtml(entry.user.slice(0, 1))}</span>
        <div class="ms-feed-body"><span class="ms-feed-time">${escapeHtml(entry.time)}</span>
          <p><strong>${escapeHtml(entry.user)}</strong> suggests <button type="button" class="ms-feed-game cursor-interaction" data-game="${game.id}">${escapeHtml(entry.displayTitle || game.title)}</button></p>
          ${entry.reason ? `<p>“${escapeHtml(entry.reason)}”</p>` : ''}
        </div><img class="ms-feed-dice" src="${diceImage}" alt="Pink MathSoc die">
      </article>`;
    }).join('');
  }

  // Add one local entry at the top. Nothing is sent or published.
  function addRecommendation(event) {
    event.preventDefault();
    const lastPost = Number(window.mathsocState.saved.lastRecommendationAt) || 0;
    if (Date.now() - lastPost < 15000) {
      app.querySelector('.ms-post-status').textContent = 'Please wait 15 seconds between recommendations.';
      return;
    }
    const game = gamesById.get(gameSelect.value);
    if (!game) return;
    if (localRecommendations.some(entry => entry.id === game.id)) {
      app.querySelector('.ms-post-status').textContent = `You have already recommended ${game.title} in this browser.`;
      return;
    }
    const entry = { createdAt: new Date().toISOString(), id: game.id, user: nameInput.value.trim().slice(0, 30) || 'Anonymous', reason: reasonInput.value.trim().slice(0, 180) };
    localRecommendations.push(entry);
    window.mathsocState.save({ recommendations: localRecommendations, lastRecommendationAt: Date.now() });
    renderCommunityFavourite();
    if (historyPage) pendingMessages += 1;
    renderRecommendationFeed();
    form.reset();
    app.querySelector('.ms-reason-count').textContent = '0 / 180';
    app.querySelector('.ms-post-status').textContent = `Your ${game.title} recommendation was added to this preview.`;
  }

  function saveCommunityChoice() {
    window.mathsocState.save({ rankingPeriod: activePeriod });
  }

  const searchableGames = [...gamesById.values()].sort((a, b) => a.title.localeCompare(b.title));
  // The hidden select retains game IDs for the existing submission handler.
  gameSelect.hidden = true;
  gameSelect.required = false;
  gameSelect.replaceChildren();
  const emptyOption = document.createElement('option');
  emptyOption.value = '';
  gameSelect.append(emptyOption);
  searchableGames.forEach(game => {
    const option = document.createElement('option');
    option.value = game.id;
    option.textContent = game.title;
    gameSelect.append(option);
  });
  const gameSearch = document.createElement('input');
  gameSearch.type = 'text';
  gameSearch.className = 'ms-recommend-search';
  gameSearch.placeholder = 'Search for a game…';
  gameSearch.setAttribute('aria-label', 'Choose a game from our collection');
  gameSearch.autocomplete = 'off';
  gameSearch.required = true;
  const suggestions = document.createElement('datalist');
  suggestions.id = 'ms-recommend-suggestions';
  gameSearch.setAttribute('list', suggestions.id);
  gameSelect.before(gameSearch, suggestions);
  function normalizeGameSearch(value) {
    return value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  }
  function updateGameSuggestions() {
    const query = normalizeGameSearch(gameSearch.value);
    const terms = query.split(' ').filter(Boolean);
    const matches = searchableGames.filter(game => terms.every(term => normalizeGameSearch(game.title).includes(term)));
    suggestions.replaceChildren();
    const titles = new Set();
    matches.forEach(game => {
      if (titles.has(game.title)) return;
      titles.add(game.title);
      const option = document.createElement('option');
      option.value = game.title;
      suggestions.append(option);
    });
    const selected = searchableGames.find(game => normalizeGameSearch(game.title) === query);
    gameSelect.value = selected?.id || '';
    gameSearch.setCustomValidity(query && !selected ? 'Choose a game from the suggestions.' : '');
  }
  gameSearch.addEventListener('input', updateGameSuggestions);
  gameSearch.addEventListener('change', updateGameSuggestions);
  form.addEventListener('reset', () => {
    gameSearch.value = '';
    gameSearch.setCustomValidity('');
    gameSelect.value = '';
    updateGameSuggestions();
  });
  updateGameSuggestions();
  app.querySelectorAll('[data-period]').forEach(button => button.addEventListener('click', () => {
    renderPodium(button.dataset.period); saveCommunityChoice();
  }));
  app.querySelectorAll('[data-page-tab]').forEach(button => button.addEventListener('click', () => {
    switchCommunityTab(button.dataset.pageTab); saveCommunityChoice();
  }));
  form.addEventListener('submit', addRecommendation);
  reasonInput.addEventListener('input', () => {
    app.querySelector('.ms-reason-count').textContent = `${reasonInput.value.length} / 180`;
  });
  renderPodium('all');
  renderRecommendationFeed();
  renderCommunityFavourite();
  app.querySelector('.ms-post-note').textContent = 'Local preview · saved in this browser only.';
  // A visible sidebar keeps recommendations beside the collection.
  const sidebar = app.querySelector('.ms-community');
  app.querySelector('.ms-board').hidden = true;
  const sideColumn = document.createElement('aside');
  sideColumn.className = 'ms-side-column';
  sideColumn.setAttribute('aria-label', 'Wishlist and community picks');
  sideColumn.append(app.querySelector('.ms-feature'), app.querySelector('.ms-featured-wishlist'), sidebar);
  app.querySelector('.ms-columns').append(sideColumn);
  app.querySelector('.ms-page-tabs').hidden = true;
  sidebar.hidden = false;
  sidebar.querySelector('.ms-community-head h3').textContent = 'Community picks';
  sidebar.querySelector('.ms-community-head .ms-kicker').hidden = true;
  sidebar.querySelector('.ms-community-head p').textContent = 'From your next game-night crew.';
  sidebar.querySelector('.ms-community-columns').prepend(sidebar.querySelector('.ms-feed-section'));
  form.querySelector('h3').textContent = 'Suggest a game';
  // Keep the dice and its result directly above the collection.
  app.querySelector('.ms-columns').before(app.querySelector('.ms-picks'));
}
