(() => {
  "use strict";
  if (document.documentElement.dataset.astroV15 === "1") return;
  document.documentElement.dataset.astroV15 = "1";

  const byId = id => document.getElementById(id);
  const NS = "http://www.w3.org/2000/svg";

  const PATHS = {
    rocket: '<path d="M14.5 4.5c3.7-1.3 5-1 5-1s.3 1.3-1 5l-3.4 4.8-4.4-4.4 3.8-4.4Z"/><path d="m10.7 8.9-4.1.7-2.1 2.1 4.2.7M15.1 13.3l-.7 4.1-2.1 2.1-.7-4.2"/><circle cx="15.5" cy="7.5" r="1.4"/><path d="M7.2 16.8c-1.9.3-3.7 1.9-4.2 4.2 2.3-.5 3.9-2.3 4.2-4.2Z"/>',
    medal: '<circle cx="12" cy="14" r="5"/><path d="m9 9-3-6h4l2 4 2-4h4l-3 6"/><path d="m12 11 1 2 2 .3-1.5 1.5.4 2.2-1.9-1-1.9 1 .4-2.2L9 13.3l2-.3 1-2Z"/>',
    sliders: '<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',
    rotate: '<path d="M20 6v5h-5"/><path d="M19 11a8 8 0 1 0 1 5"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5"/>',
    volume: '<path d="M5 10v4h4l5 4V6l-5 4H5Z"/><path d="M17 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12"/>',
    mute: '<path d="M5 10v4h4l5 4V6l-5 4H5Z"/><path d="m18 10 4 4m0-4-4 4"/>',
    star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z"/>',
    orbit: '<circle cx="12" cy="12" r="2.2"/><ellipse cx="12" cy="12" rx="9" ry="4.2" transform="rotate(25 12 12)"/><circle cx="19.4" cy="10" r="1.2" fill="currentColor" stroke="none"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    x: '<path d="m6 6 12 12M18 6 6 18"/>',
    flame: '<path d="M12 22c4 0 7-2.8 7-7 0-4.7-3.1-8.2-6.2-11 .2 3-1.3 4.8-2.6 6.2-.8-1.5-1.9-2.4-3-3.2.2 2.3-2.2 4.5-2.2 8 0 4.2 3 7 7 7Z"/><path d="M9.5 18c0-2 1.4-3.1 2.5-4.6 1 1.5 2.5 2.6 2.5 4.6 0 1.4-1 2.5-2.5 2.5S9.5 19.4 9.5 18Z"/>',
    comet: '<path d="M9 15c2.8 2.8 7.2 2.8 10 0s2.8-7.2 0-10-7.2-2.8-10 0-2.8 7.2 0 10Z"/><path d="M8 16 3 21M6 13 2 15M11 18l-2 4"/>',
    trophy: '<path d="M8 4h8v4c0 3-1.8 5-4 5s-4-2-4-5V4Z"/><path d="M8 6H4v2c0 2 1.5 3 4 3M16 6h4v2c0 2-1.5 3-4 3M12 13v4M8 21h8M9 17h6v4H9z"/>',
    galaxy: '<path d="M4 14c2-7 12-10 16-5 3 4-3 9-8 9-4 0-7-2-6-5 1-2 4-3 6-2 2 1 1 4-1 4"/><circle cx="17" cy="6" r="1" fill="currentColor" stroke="none"/>',
    brain: '<path d="M9 5a3 3 0 0 0-5 2 3 3 0 0 0 1 5 3 3 0 0 0 3 5c1 0 2-.4 2.5-1V6A2.5 2.5 0 0 0 9 5ZM15 5a3 3 0 0 1 5 2 3 3 0 0 1-1 5 3 3 0 0 1-3 5c-1 0-2-.4-2.5-1V6A2.5 2.5 0 0 1 15 5Z"/><path d="M8 9h2.5M16 9h-2.5M8 14h2.5M16 14h-2.5"/>',
    bolt: '<path d="m13 2-8 12h7l-1 8 8-12h-7l1-8Z"/>',
    lock: '<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    spark: '<path d="M12 2v4M12 18v4M4 12H0M24 12h-4M4.2 4.2 7 7M17 17l2.8 2.8M19.8 4.2 17 7M7 17l-2.8 2.8"/><circle cx="12" cy="12" r="3"/>'
  };

  function icon(name, cls = "ui-icon") {
    return `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${PATHS[name] || PATHS.star}</svg>`;
  }

  const badgeIcon = {
    first: "rocket",
    streak5: "flame",
    streak10: "comet",
    perfect: "trophy",
    c50: "star",
    c200: "galaxy",
    fixer: "brain",
    fast: "bolt"
  };

  function decorateStaticControls() {
    const missionTab = byId("missionTab");
    const progressTab = byId("progressTab");
    const startBtn = byId("startBtn");
    const wrongBtn = byId("wrongBtn");
    const resetBtn = byId("resetStatsBtn");
    const advanced = document.querySelector(".advanced-toggle");
    const questionTab = byId("questionTab");
    const explanationTab = byId("explanationTab");
    const exitBtn = byId("exitBtn");
    const nextBtn = byId("nextBtn");
    const againBtn = byId("againBtn");
    const retryWrongBtn = byId("retryWrongBtn");
    const speedText = byId("speed")?.closest("label")?.querySelector("span:last-child");

    if (missionTab) missionTab.innerHTML = `${icon("rocket")}<span>Misija</span>`;
    if (progressTab) progressTab.innerHTML = `${icon("medal")}<span>Napredak</span>`;
    if (startBtn) startBtn.innerHTML = `${icon("rocket")}<span>Kreni u misiju</span>`;
    if (resetBtn) resetBtn.innerHTML = `${icon("trash")}<span>Obriši sav napredak</span>`;
    if (advanced) advanced.innerHTML = `<span class="advanced-label">${icon("sliders")}<span>Dodatni filteri</span></span><span class="chev">⌄</span>`;
    if (questionTab) questionTab.textContent = "Pitanje";
    if (explanationTab) explanationTab.textContent = "Objašnjenje";
    if (exitBtn) exitBtn.innerHTML = icon("x");
    if (nextBtn && !nextBtn.classList.contains("hidden")) nextBtn.innerHTML = `<span>Sljedeće pitanje</span>${icon("orbit")}`;
    if (againBtn) againBtn.innerHTML = `${icon("rocket")}<span>Nova misija</span>`;
    if (retryWrongBtn) retryWrongBtn.innerHTML = `${icon("rotate")}<span>Ponovi pogrešna</span>`;
    if (speedText) speedText.innerHTML = `${icon("bolt")}<span>Brzinska misija <small>20 sekundi po pitanju · dodatni XP</small></span>`;
    decorateWrongButton();
  }

  function decorateWrongButton() {
    const btn = byId("wrongBtn");
    if (!btn) return;
    const count = loadStats().wrong.length;
    btn.innerHTML = `${icon("rotate")}<span>Ponovi pogrešna${count ? ` <b>(${count})</b>` : ""}</span>`;
  }

  /* ---------- zaglavlje i XP u Napredak ---------- */
  const progressPane = byId("progressPane");
  const lvl = byId("lvl");
  const sub = document.querySelector("header .sub");
  if (sub) sub.textContent = "Tvoja svemirska misija do natjecanja!";

  let profileCard = byId("profileCard");
  if (!profileCard && progressPane) {
    profileCard = document.createElement("section");
    profileCard.id = "profileCard";
    profileCard.className = "profile-card";
    profileCard.innerHTML = `
      <div class="profile-rank-row">
        <span class="profile-rank-icon">${icon("rocket")}</span>
        <div class="profile-rank-copy">
          <strong id="profileRankName"></strong>
          <span id="profileXpText"></span>
        </div>
      </div>
      <div class="profile-xp-track"><div id="profileXpFill"></div></div>
      <div id="profileXpNext" class="profile-xp-next"></div>`;
    progressPane.prepend(profileCard);
  }
  if (lvl) lvl.remove();

  function updateProfileCard() {
    if (!profileCard) return;
    const p = loadProfile();
    const i = rankIndex(p.xp);
    const currentRank = RANKS[i];
    const next = RANKS[i + 1];
    byId("profileRankName").textContent = currentRank[1];
    byId("profileXpText").textContent = `${p.xp} XP`;
    if (next) {
      const pct = Math.max(0, Math.min(100, (p.xp - currentRank[0]) / (next[0] - currentRank[0]) * 100));
      byId("profileXpFill").style.width = `${pct}%`;
      byId("profileXpNext").textContent = `${next[0] - p.xp} XP do čina „${next[1]}”`;
    } else {
      byId("profileXpFill").style.width = "100%";
      byId("profileXpNext").textContent = "Dosegnut je najviši čin";
    }
  }

  const oldRenderLevel = window.renderLevel;
  window.renderLevel = function() {
    if (oldRenderLevel) oldRenderLevel();
    updateProfileCard();
  };

  /* ---------- jednobojni SVG zvuk ---------- */
  const oldRenderSoundBtn = window.renderSoundBtn;
  window.renderSoundBtn = function() {
    if (oldRenderSoundBtn) oldRenderSoundBtn();
    const btn = byId("soundBtn");
    if (btn) btn.innerHTML = icon(soundOn ? "volume" : "mute");
  };

  /* ---------- dekoracija mrtvog prostora misije ---------- */
  const missionPane = byId("missionPane");
  if (missionPane && !byId("missionArt")) {
    const art = document.createElement("div");
    art.id = "missionArt";
    art.className = "mission-art";
    art.setAttribute("aria-hidden", "true");
    art.innerHTML = `
      <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="160" cy="92" rx="118" ry="50" transform="rotate(-10 160 92)" stroke="currentColor" stroke-width="2" stroke-dasharray="7 10" opacity=".42"/>
        <circle cx="160" cy="92" r="38" fill="url(#planetFill)"/>
        <ellipse cx="160" cy="94" rx="61" ry="15" transform="rotate(-10 160 94)" stroke="#d7c8ff" stroke-width="7" opacity=".8"/>
        <circle cx="264" cy="69" r="10" fill="#ffd76b"/>
        <g transform="translate(55 112) rotate(-16)">
          <path d="M0 11 25 2l15 9-15 9L0 11Z" fill="#7b67ff"/>
          <circle cx="24" cy="11" r="5" fill="#bdeeff"/>
          <path d="M0 11-12 4v14L0 11Z" fill="#ff8b66"/>
        </g>
        <defs><linearGradient id="planetFill" x1="130" y1="55" x2="190" y2="130" gradientUnits="userSpaceOnUse"><stop stop-color="#50cfff"/><stop offset=".55" stop-color="#705cff"/><stop offset="1" stop-color="#302d82"/></linearGradient></defs>
      </svg>`;
    const bubble = missionPane.querySelector(".bubble");
    if (bubble) bubble.after(art); else missionPane.prepend(art);
  }

  /* ---------- značke s razlogom i napretkom ---------- */
  function badgeProgress(b, owned, stats, profile) {
    const clamp = (v, t) => Math.max(0, Math.min(t, v));
    switch (b.id) {
      case "first": return { value: clamp(stats.attempts, 1), target: 1, text: "Završi prvi kviz" };
      case "streak5": return { value: clamp(profile.bestStreak || 0, 5), target: 5, text: `${clamp(profile.bestStreak || 0, 5)}/5 točnih zaredom` };
      case "streak10": return { value: clamp(profile.bestStreak || 0, 10), target: 10, text: `${clamp(profile.bestStreak || 0, 10)}/10 točnih zaredom` };
      case "perfect": return { value: owned ? 1 : 0, target: 1, text: "Ostvari 100 % u kvizu od 10+ pitanja" };
      case "c50": return { value: clamp(stats.correct, 50), target: 50, text: `${clamp(stats.correct, 50)}/50 ukupno točnih` };
      case "c200": return { value: clamp(stats.correct, 200), target: 200, text: `${clamp(stats.correct, 200)}/200 ukupno točnih` };
      case "fixer": return { value: owned ? 1 : 0, target: 1, text: stats.wrong.length ? `Ispravi još ${stats.wrong.length} pitanja` : "Isprazni popis za ponavljanje" };
      case "fast": return { value: owned ? 1 : 0, target: 1, text: "80 % ili više u brzinskoj misiji" };
      default: return { value: owned ? 1 : 0, target: 1, text: b.desc };
    }
  }

  window.renderBadges = function() {
    const container = byId("badges");
    if (!container) return;
    const profile = loadProfile();
    const stats = loadStats();
    const owned = new Set(profile.badges);
    container.innerHTML = BADGES.map(b => {
      const has = owned.has(b.id);
      const pg = badgeProgress(b, has, stats, profile);
      const pct = pg.target ? Math.round(pg.value / pg.target * 100) : 0;
      return `<article class="badge badge-card ${has ? "earned" : "locked"}">
        <span class="badge-art">${icon(badgeIcon[b.id] || "star", "badge-svg")}</span>
        <span class="badge-copy">
          <strong>${b.name}${has ? `<span class="badge-check">${icon("check")}</span>` : ""}</strong>
          <small>${has ? "Osvojeno" : pg.text}</small>
          <span class="badge-progress"><span style="width:${has ? 100 : pct}%"></span></span>
        </span>
      </article>`;
    }).join("");
  };

  /* ---------- statistika i kontrolni gumbi ---------- */
  const oldUpdateStats = window.updateStatsText;
  window.updateStatsText = function() {
    if (oldUpdateStats) oldUpdateStats();
    decorateWrongButton();
    window.renderBadges();
  };

  /* ---------- mini-lekcija nakon odgovora ---------- */
  function bonusFor(q) {
    const topic = `${q.topic || ""} ${q.question || ""}`.toLowerCase();
    if (topic.includes("sunce")) return "Sunčevoj svjetlosti treba približno 8 minuta i 20 sekundi da stigne do Zemlje.";
    if (topic.includes("mjesec")) return "Mjesec se od Zemlje udaljava približno 3,8 centimetara godišnje.";
    if (topic.includes("vener")) return "Na Veneri jedna rotacija traje dulje od njezina obilaska oko Sunca.";
    if (topic.includes("jupiter")) return "Jupiter je toliko velik da bi u njega moglo stati više od 1300 Zemalja po volumenu.";
    if (topic.includes("saturn")) return "Saturnovi prstenovi građeni su uglavnom od leda i kamenih čestica.";
    if (topic.includes("zvije") || topic.includes("zvijež")) return "Zvijezde u jednom zviježđu obično nisu stvarno blizu jedna drugoj — samo ih tako vidimo sa Zemlje.";
    if (topic.includes("komet") || topic.includes("meteor") || topic.includes("asteroid")) return "Rep kometa uvijek je usmjeren od Sunca zbog Sunčeva vjetra i zračenja.";
    const idx = Math.abs(String(q.id || q.question).split("").reduce((a, c) => a + c.charCodeAt(0), 0)) % FACTS.length;
    return FACTS[idx];
  }

  function lessonVisual(q) {
    const image = q.feedbackImage || q.image;
    if (image) return `<div class="lesson-visual qimage">${buildImage(image)}</div>`;
    return `<div class="lesson-visual lesson-planet" aria-hidden="true">
      <span class="lesson-orbit"></span><span class="lesson-planet-core"></span><span class="lesson-moon"></span>
    </div>`;
  }

  function renderLesson(q, selectedIndex, timedOut = false) {
    const summary = byId("answerSummary");
    const feedback = byId("feedback");
    if (!summary || !feedback) return;
    const correctText = q.answers[q.correct];
    const selectedText = selectedIndex == null ? "Bez odgovora" : q.answers[selectedIndex];
    const isCorrect = !timedOut && selectedIndex === q.correct;

    summary.innerHTML = `
      <div class="lesson-question-label">Pitanje</div>
      <div class="lesson-question">${q.question}</div>
      <div class="lesson-answer-stack">
        ${isCorrect
          ? `<div class="lesson-answer-row correct-row">${icon("check")}<span><small>Točan odgovor</small><b>${correctText}</b></span></div>`
          : `<div class="lesson-answer-row wrong-row">${icon("x")}<span><small>${timedOut ? "Vrijeme je isteklo" : "Tvoj odgovor"}</small><b>${selectedText}</b></span></div>
             <div class="lesson-answer-row correct-row">${icon("check")}<span><small>Točan odgovor</small><b>${correctText}</b></span></div>`}
      </div>`;

    feedback.innerHTML = `
      <section class="lesson-block">
        <h3>${isCorrect ? "Zašto je to točno?" : "Zapamti za sljedeći put"}</h3>
        <p>${q.explanation}</p>
      </section>
      ${lessonVisual(q)}
      <section class="bonus-fact">
        <span class="bonus-icon">${icon("spark")}</span>
        <span><strong>Bonus činjenica</strong>${bonusFor(q)}</span>
      </section>`;

    if (isCorrect) launchStarBurst();
    const next = byId("nextBtn");
    if (next) next.innerHTML = `${current === quizQuestions.length - 1 ? "Prikaži rezultat" : "Sljedeće pitanje"}${icon(current === quizQuestions.length - 1 ? "trophy" : "orbit")}`;
  }

  function launchStarBurst() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const burst = document.createElement("div");
    burst.className = "star-burst";
    burst.innerHTML = Array.from({ length: 9 }, (_, i) => `<span style="--i:${i}">${icon("star")}</span>`).join("");
    document.body.appendChild(burst);
    setTimeout(() => burst.remove(), 900);
  }

  const oldChooseAnswer = window.chooseAnswer;
  window.chooseAnswer = function(btn, selectedIndex, q) {
    oldChooseAnswer(btn, selectedIndex, q);
    renderLesson(q, selectedIndex, false);
  };

  const oldTimeUp = window.timeUp;
  window.timeUp = function(q) {
    oldTimeUp(q);
    renderLesson(q, null, true);
  };

  const oldRenderQuestion = window.renderQuestion;
  window.renderQuestion = function() {
    oldRenderQuestion();
    const counter = byId("counter");
    if (counter) counter.innerHTML = `${icon("orbit")}<span>${current + 1} / ${quizQuestions.length}</span>`;
    const live = byId("liveScore");
    if (live) live.innerHTML = `${icon("star")}<span>${correct}</span>`;
    const rocket = byId("rocket");
    const goal = document.querySelector("#quiz .goal");
    if (rocket) rocket.innerHTML = icon("rocket");
    if (goal) goal.innerHTML = icon("orbit");
    const next = byId("nextBtn");
    if (next) next.innerHTML = `<span>Sljedeće pitanje</span>${icon("orbit")}`;
  };

  const oldUpdatePills = window.updatePills;
  window.updatePills = function() {
    oldUpdatePills();
    const live = byId("liveScore");
    if (live) live.innerHTML = `${icon("star")}<span>${correct}</span>`;
    const streakEl = byId("streakPill");
    if (streakEl && streak >= 2) streakEl.innerHTML = `${icon("flame")}<span>${streak}</span>`;
  };

  const oldShowNext = window.showNext;
  window.showNext = function() {
    oldShowNext();
    const next = byId("nextBtn");
    if (next) next.innerHTML = `<span>${current === quizQuestions.length - 1 ? "Prikaži rezultat" : "Sljedeće pitanje"}</span>${icon(current === quizQuestions.length - 1 ? "trophy" : "orbit")}`;
  };

  /* Ponovno ukrasi elemente koje osnovna aplikacija mijenja tekstom. */
  decorateStaticControls();
  window.renderSoundBtn();
  window.renderLevel();
  window.renderBadges();
  window.updateStatsText();
})();
