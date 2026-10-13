/* Browser-local preferences. Public community totals require a server. */
(() => {
  const key = 'mathsoc-board-games-v1';
  function readSaved() {
    try {
      const value = JSON.parse(localStorage.getItem(key) || '{}');
      return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
    } catch { return {}; }
  }
  window.mathsocState = {
    saved: readSaved(),
    save(next) {
      // Read the latest values so this tab does not overwrite another tab's posts.
      this.saved = { ...this.saved, ...readSaved(), ...next };
      try { localStorage.setItem(key, JSON.stringify(this.saved)); } catch { /* Continue in memory. */ }
    },
  };
})();
