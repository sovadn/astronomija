(() => {
  "use strict";

  function updateProfileCardSafe() {
    const card = document.getElementById("profileCard");
    if (!card || typeof loadProfile !== "function" || typeof rankIndex !== "function") return;
    const p = loadProfile();
    const i = rankIndex(p.xp);
    const currentRank = RANKS[i];
    const next = RANKS[i + 1];
    const name = document.getElementById("profileRankName");
    const xpText = document.getElementById("profileXpText");
    const fill = document.getElementById("profileXpFill");
    const nextText = document.getElementById("profileXpNext");
    if (name) name.textContent = currentRank[1];
    if (xpText) xpText.textContent = `${p.xp} XP`;
    if (next) {
      const pct = Math.max(0, Math.min(100, (p.xp - currentRank[0]) / (next[0] - currentRank[0]) * 100));
      if (fill) fill.style.width = `${pct}%`;
      if (nextText) nextText.textContent = `${next[0] - p.xp} XP do čina „${next[1]}”`;
    } else {
      if (fill) fill.style.width = "100%";
      if (nextText) nextText.textContent = "Dosegnut je najviši čin";
    }
  }

  window.renderLevel = updateProfileCardSafe;
  updateProfileCardSafe();
  if (typeof window.renderBadges === "function") window.renderBadges();
  if (typeof window.updateStatsText === "function") window.updateStatsText();
})();
