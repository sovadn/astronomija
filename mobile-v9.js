(() => {
  "use strict";
  const byId = id => document.getElementById(id);
  const quiz = byId("quiz");
  const setup = byId("setup");
  if (!quiz || !setup || byId("quizTabs")) return;

  /* ============ početni ekran: Misija / Napredak ============ */
  const setupTabs = document.createElement("div");
  setupTabs.id = "setupTabs";
  setupTabs.className = "setup-tabs";
  setupTabs.setAttribute("role", "tablist");
  setupTabs.setAttribute("aria-label", "Misija i napredak");
  setupTabs.innerHTML = `
    <button id="missionTab" class="setup-tab active" role="tab" aria-selected="true" aria-controls="missionPane">🚀 Misija</button>
    <button id="progressTab" class="setup-tab" role="tab" aria-selected="false" aria-controls="progressPane">🏅 Napredak</button>`;

  const missionPane = document.createElement("div");
  missionPane.id = "missionPane";
  missionPane.className = "setup-pane mission-pane";
  missionPane.setAttribute("role", "tabpanel");
  missionPane.setAttribute("aria-labelledby", "missionTab");

  const progressPane = document.createElement("div");
  progressPane.id = "progressPane";
  progressPane.className = "setup-pane progress-pane hidden";
  progressPane.setAttribute("role", "tabpanel");
  progressPane.setAttribute("aria-labelledby", "progressTab");

  const bubble = setup.querySelector(".bubble");
  const setupHeading = setup.querySelector("h2");
  const setupGrid = setup.querySelector(".grid");
  const speedSwitch = setup.querySelector(".switch");
  const startActions = setup.querySelector(".start-actions");
  const stats = byId("stats");
  const shelfTitle = setup.querySelector(".shelf-title");
  const badges = byId("badges");
  const resetStats = byId("resetStatsBtn");

  setup.prepend(setupTabs);
  setupTabs.after(missionPane, progressPane);
  missionPane.append(bubble, setupHeading, setupGrid);

  const countSelect = byId("count");
  const topicSelect = byId("topic");
  const difficultySelect = byId("difficulty");
  const levelSelect = byId("level");
  const countWrap = countSelect.closest("div");
  const topicWrap = topicSelect.closest("div");
  const difficultyWrap = difficultySelect.closest("div");
  const levelWrap = levelSelect.closest("div");

  countSelect.value = "10";
  countSelect.classList.add("source-select-hidden");
  const countChoices = document.createElement("div");
  countChoices.className = "count-choices";
  countChoices.setAttribute("role", "group");
  countChoices.setAttribute("aria-label", "Broj pitanja");
  [
    ["10", "10"],
    ["20", "20"],
    ["30", "30"],
    ["all", "Sva"]
  ].forEach(([value, label]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "count-choice";
    button.dataset.value = value;
    button.textContent = label;
    button.setAttribute("aria-pressed", value === "10" ? "true" : "false");
    if (value === "10") button.classList.add("active");
    button.addEventListener("click", () => {
      countSelect.value = value;
      countChoices.querySelectorAll(".count-choice").forEach(item => {
        const active = item.dataset.value === value;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
    });
    countChoices.appendChild(button);
  });
  countWrap.appendChild(countChoices);

  const advancedToggle = document.createElement("button");
  advancedToggle.type = "button";
  advancedToggle.className = "advanced-toggle";
  advancedToggle.setAttribute("aria-expanded", "false");
  advancedToggle.innerHTML = `<span>⚙️ Dodatni filteri</span><span class="chev">⌄</span>`;

  const advancedPanel = document.createElement("div");
  advancedPanel.className = "advanced-panel hidden";
  advancedPanel.append(difficultyWrap, levelWrap, speedSwitch);
  missionPane.append(advancedToggle, advancedPanel, startActions);

  advancedToggle.addEventListener("click", () => {
    const open = advancedPanel.classList.toggle("hidden") === false;
    advancedToggle.classList.toggle("open", open);
    advancedToggle.setAttribute("aria-expanded", String(open));
  });

  const progressActions = document.createElement("div");
  progressActions.className = "progress-actions";
  progressActions.appendChild(resetStats);
  progressPane.append(stats, shelfTitle, badges, progressActions);

  function activateSetupTab(name, focus = false) {
    const showMission = name === "mission";
    missionPane.classList.toggle("hidden", !showMission);
    progressPane.classList.toggle("hidden", showMission);
    byId("missionTab").classList.toggle("active", showMission);
    byId("progressTab").classList.toggle("active", !showMission);
    byId("missionTab").setAttribute("aria-selected", String(showMission));
    byId("progressTab").setAttribute("aria-selected", String(!showMission));
    if (focus) (showMission ? byId("missionTab") : byId("progressTab")).focus();
    window.scrollTo(0, 0);
  }
  byId("missionTab").addEventListener("click", () => activateSetupTab("mission"));
  byId("progressTab").addEventListener("click", () => activateSetupTab("progress"));

  /* ============ kviz: Pitanje / Objašnjenje ============ */
  const topbar = quiz.querySelector(".topbar");
  const exit = byId("exitBtn");
  if (topbar && exit) topbar.prepend(exit);

  const tabs = document.createElement("div");
  tabs.id = "quizTabs";
  tabs.className = "quiz-tabs";
  tabs.setAttribute("role", "tablist");
  tabs.setAttribute("aria-label", "Prikaz pitanja i objašnjenja");
  tabs.innerHTML = `
    <button id="questionTab" class="quiz-tab active" role="tab" aria-selected="true" aria-controls="questionPane">Pitanje</button>
    <button id="explanationTab" class="quiz-tab" role="tab" aria-selected="false" aria-controls="explanationPane" disabled>Objašnjenje</button>`;

  const questionPane = document.createElement("div");
  questionPane.id = "questionPane";
  questionPane.className = "quiz-pane question-pane";
  questionPane.setAttribute("role", "tabpanel");
  questionPane.setAttribute("aria-labelledby", "questionTab");

  const explanationPane = document.createElement("div");
  explanationPane.id = "explanationPane";
  explanationPane.className = "quiz-pane explanation-pane hidden";
  explanationPane.setAttribute("role", "tabpanel");
  explanationPane.setAttribute("aria-labelledby", "explanationTab");

  const summary = document.createElement("div");
  summary.id = "answerSummary";
  summary.className = "answer-summary";

  const timer = byId("timer");
  const meta = byId("meta");
  const question = byId("question");
  const qimage = byId("qimage");
  const answers = byId("answers");
  const feedback = byId("feedback");
  const nextrow = quiz.querySelector(".nextrow");

  timer.after(tabs);
  tabs.after(questionPane, explanationPane);
  questionPane.append(meta, question, qimage, answers);
  explanationPane.append(summary, feedback, nextrow);

  function setScreen(name) {
    document.body.classList.remove("screen-setup", "screen-quiz", "screen-result");
    document.body.classList.add(`screen-${name}`);
  }

  function activateTab(name, focus = false) {
    const showQuestion = name === "question";
    questionPane.classList.toggle("hidden", !showQuestion);
    explanationPane.classList.toggle("hidden", showQuestion);
    byId("questionTab").classList.toggle("active", showQuestion);
    byId("explanationTab").classList.toggle("active", !showQuestion);
    byId("questionTab").setAttribute("aria-selected", String(showQuestion));
    byId("explanationTab").setAttribute("aria-selected", String(!showQuestion));
    if (focus) (showQuestion ? byId("questionTab") : byId("explanationTab")).focus();
    questionPane.scrollTop = 0;
    explanationPane.scrollTop = 0;
    feedback.scrollTop = 0;
  }

  function setLengthClasses(q) {
    const lengths = q.answers.map(a => String(a).length);
    const longest = Math.max(...lengths);
    const total = lengths.reduce((a, b) => a + b, 0);
    document.body.classList.toggle("long-question", String(q.question).length > 115);
    document.body.classList.toggle("long-answers", longest > 62 || total > 185);
    document.body.classList.toggle("short-answers", longest <= 24 && total <= 72);
    document.body.classList.toggle("has-image", Boolean(q.image));
  }

  function renderSummary(q, selectedIndex, timedOut = false) {
    const correctText = q.answers[q.correct];
    if (timedOut) {
      summary.innerHTML = `<span class="no">Vrijeme je isteklo.</span><span>Točan odgovor: <b>${correctText}</b></span>`;
      return;
    }
    const selectedText = q.answers[selectedIndex];
    if (selectedIndex === q.correct) {
      summary.innerHTML = `<span class="ok">Točno: <b>${selectedText}</b> ✓</span>`;
    } else {
      summary.innerHTML = `<span class="no">Tvoj odgovor: <b>${selectedText}</b></span><span>Točan odgovor: <b>${correctText}</b></span>`;
    }
  }

  byId("questionTab").addEventListener("click", () => activateTab("question"));
  byId("explanationTab").addEventListener("click", () => {
    if (!byId("explanationTab").disabled) activateTab("explanation");
  });

  const originalBegin = window.begin;
  window.begin = function(list) {
    originalBegin(list);
    setScreen("quiz");
    window.scrollTo(0, 0);
  };

  const originalRenderQuestion = window.renderQuestion;
  window.renderQuestion = function() {
    originalRenderQuestion();
    const q = quizQuestions[current];
    if (q) setLengthClasses(q);
    summary.innerHTML = "";
    byId("explanationTab").disabled = true;
    document.body.classList.remove("answered-state");
    activateTab("question");
    window.scrollTo(0, 0);
  };

  const originalChooseAnswer = window.chooseAnswer;
  window.chooseAnswer = function(btn, selectedIndex, q) {
    originalChooseAnswer(btn, selectedIndex, q);
    renderSummary(q, selectedIndex, false);
    byId("explanationTab").disabled = false;
    document.body.classList.add("answered-state");
    activateTab("explanation");
  };

  const originalTimeUp = window.timeUp;
  window.timeUp = function(q) {
    originalTimeUp(q);
    renderSummary(q, null, true);
    byId("explanationTab").disabled = false;
    document.body.classList.add("answered-state");
    activateTab("explanation");
  };

  const originalFinish = window.finish;
  window.finish = function() {
    originalFinish();
    setScreen("result");
    document.body.classList.remove("answered-state");
    window.scrollTo(0, 0);
  };

  byId("againBtn").addEventListener("click", () => {
    setScreen("setup");
    activateSetupTab("mission");
  });
  byId("exitBtn").addEventListener("click", () => {
    if (byId("quiz").classList.contains("hidden")) {
      setScreen("setup");
      activateSetupTab("mission");
    }
  });
  byId("retryWrongBtn").addEventListener("click", () => setScreen("quiz"));

  setScreen(byId("quiz").classList.contains("hidden") ? "setup" : "quiz");
  activateSetupTab("mission");
  activateTab("question");
})();
