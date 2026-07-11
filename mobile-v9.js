(() => {
  "use strict";
  const byId = id => document.getElementById(id);
  const quiz = byId("quiz");
  if (!quiz || byId("quizTabs")) return;

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
      summary.innerHTML = `<span class="ok">Tvoj odgovor je točan ✓</span><span><b>${selectedText}</b></span>`;
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

  byId("againBtn").addEventListener("click", () => setScreen("setup"));
  byId("exitBtn").addEventListener("click", () => {
    if (byId("quiz").classList.contains("hidden")) setScreen("setup");
  });
  byId("retryWrongBtn").addEventListener("click", () => setScreen("quiz"));

  const countSelect = byId("count");
  if (countSelect) countSelect.value = "10";

  setScreen(byId("quiz").classList.contains("hidden") ? "setup" : "quiz");
  activateTab("question");
})();
