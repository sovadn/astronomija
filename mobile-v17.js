/* Astro kviz v17 — navigacija
   1) Swipe lijevo/desno: Pitanje ⇄ Objašnjenje, Objašnjenje → sljedeće pitanje,
      te Misija ⇄ Napredak na početnom ekranu
   2) Gumb "nazad" (Android/preglednik): iz kviza vraća na postavke
      (uz postojeću potvrdu) umjesto da zatvori aplikaciju */
(() => {
  "use strict";
  if (document.documentElement.dataset.astroV17 === "1") return;
  document.documentElement.dataset.astroV17 = "1";

  const byId = id => document.getElementById(id);

  /* ---------- swipe pomoćnik ---------- */
  function addSwipe(el, handlers) {
    if (!el) return;
    let x0 = 0, y0 = 0, t0 = 0, tracking = false;
    el.addEventListener("touchstart", e => {
      if (e.touches.length !== 1) { tracking = false; return; }
      tracking = true;
      x0 = e.touches[0].clientX;
      y0 = e.touches[0].clientY;
      t0 = Date.now();
    }, { passive: true });
    el.addEventListener("touchend", e => {
      if (!tracking) return;
      tracking = false;
      const t = e.changedTouches[0];
      const dx = t.clientX - x0, dy = t.clientY - y0;
      /* brz, izrazito vodoravan potez */
      if (Date.now() - t0 > 600) return;
      if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.6) return;
      if (dx < 0 && handlers.left) handlers.left();
      if (dx > 0 && handlers.right) handlers.right();
    }, { passive: true });
  }

  /* Kviz: lijevo = naprijed (objašnjenje pa sljedeće pitanje), desno = natrag na pitanje */
  addSwipe(byId("quiz"), {
    left() {
      const expTab = byId("explanationTab");
      const expPane = byId("explanationPane");
      if (!expTab || !expPane) return;
      const onQuestion = expPane.classList.contains("hidden");
      if (onQuestion) {
        if (!expTab.disabled) expTab.click();
      } else {
        const next = byId("nextBtn");
        if (next && !next.classList.contains("hidden")) next.click();
      }
    },
    right() {
      const expPane = byId("explanationPane");
      const qTab = byId("questionTab");
      if (expPane && !expPane.classList.contains("hidden") && qTab) qTab.click();
    }
  });

  /* Početni ekran: lijevo = Napredak, desno = Misija */
  addSwipe(byId("setup"), {
    left() { const t = byId("progressTab"); if (t) t.click(); },
    right() { const t = byId("missionTab"); if (t) t.click(); }
  });

  /* ---------- gumb "nazad" ---------- */
  let armed = false;

  function armBack() {
    if (armed) return;
    history.pushState({ astro: "quiz" }, "");
    armed = true;
  }

  const oldBegin = window.begin;
  if (typeof oldBegin === "function") {
    window.begin = function (list) {
      oldBegin(list);
      armBack();
    };
  }

  window.addEventListener("popstate", () => {
    const quizVisible = !byId("quiz").classList.contains("hidden");
    const resultVisible = !byId("result").classList.contains("hidden");

    if (quizVisible) {
      /* Postojeći exit tijek (s potvrdom). Ako korisnik odustane,
         ponovno "naoružaj" povijest da back i dalje radi. */
      armed = false;
      byId("exitBtn").click();
      const stillInQuiz = !byId("quiz").classList.contains("hidden");
      if (stillInQuiz) armBack();
      return;
    }

    if (resultVisible) {
      armed = false;
      const again = byId("againBtn");
      if (again) again.click();
      return;
    }

    /* Na postavkama: ako je otvoren Napredak, back vraća na Misiju. */
    const progressPane = byId("progressPane");
    if (progressPane && !progressPane.classList.contains("hidden")) {
      const mission = byId("missionTab");
      if (mission) mission.click();
    }
    armed = false;
  });
})();
