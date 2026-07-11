/* Astro kviz v18 — Rosetta Stone učenje zviježđa
   1) Ako pitanje spominje zviježđe, a nema sliku: prikaži oblik zviježđa
      uz pitanje (bez imena zvijezda — učenik povezuje sliku i pojam).
   2) U objašnjenju: ista slika s ISTAKNUTOM i imenovanom zvijezdom
      o kojoj se pitalo (npr. Algol u Perzeju).
   3) Raznovrsnije bonus činjenice (bez ponavljanja iste rečenice).
   Oblici su generirani iz stvarnih RA/Dec koordinata (J2000). */
(() => {
  "use strict";
  if (document.documentElement.dataset.astroV18 === "1") return;
  document.documentElement.dataset.astroV18 = "1";

  const SKY = {"orion":{"stars":[[56.1,24.3,6.2],[113.7,32.4,5.2],[100.5,83.3,4.6],[92.3,90.2,5.1],[83.7,95.9,5.1],[70.3,155.0,4.8],[133.9,143.8,6.5],[94.5,5.0,3.6]],"lines":[[0,7],[7,1],[1,2],[2,3],[3,4],[4,0],[4,5],[2,6]]},"labud":{"stars":[[65.5,52.7,6.5],[86.9,82.4,5.4],[116.0,112.9,3.6],[144.6,155.0,4.5],[128.6,53.6,4.7],[145.7,14.7,3.7],[159.9,5.0,3.7],[60.1,119.5,5.1],[30.1,141.6,4.3]],"lines":[[0,1],[1,2],[2,3],[6,5],[5,4],[4,1],[1,7],[7,8]]},"kasiopeja":{"stars":[[187.5,93.5,6.4],[132.4,130.3,6.5],[103.9,71.3,5.9],[52.7,78.1,5.4],[2.5,29.7,3.6]],"lines":[[0,1],[1,2],[2,3],[3,4]]},"velikimedvjed":{"stars":[[185.4,30.9,6.5],[187.5,73.3,5.4],[129.5,94.5,5.2],[105.4,68.2,3.6],[62.3,76.6,6.5],[28.8,84.8,5.6],[2.5,129.1,6.3]],"lines":[[6,5],[5,4],[4,3],[3,0],[0,1],[1,2],[2,3]]},"perzej":{"stars":[[104.6,30.3,6.5],[125.2,92.1,6.1],[129.5,5.0,5.0],[80.9,44.7,4.9],[61.9,98.6,5.1],[66.6,155.0,5.1],[129.0,106.7,4.4],[123.5,65.0,3.9],[60.5,127.9,3.6]],"lines":[[2,0],[0,3],[3,4],[4,8],[8,5],[0,7],[7,1],[1,6]]},"lira":{"stars":[[142.6,24.1,6.5],[110.6,5.0,3.6],[108.8,49.4,3.7],[66.7,63.1,3.8],[47.4,155.0,4.5],[85.6,140.5,4.3]],"lines":[[0,1],[0,2],[2,3],[3,4],[4,5],[5,2]]},"orao":{"stars":[[70.2,45.0,6.5],[79.2,31.0,4.7],[61.1,64.7,3.7],[160.7,5.0,4.4],[120.6,91.0,4.1],[66.9,107.9,3.6],[29.3,122.5,4.2],[159.0,155.0,4.0]],"lines":[[1,0],[0,2],[0,4],[4,3],[4,7],[4,5],[5,6]]},"bik":{"stars":[[106.0,109.0,6.5],[21.5,22.2,5.7],[2.5,75.7,4.4],[133.1,115.3,3.7],[127.8,101.6,3.6],[118.3,89.8,3.8],[165.2,137.8,3.9],[187.5,54.5,4.9]],"lines":[[3,4],[4,5],[5,1],[3,0],[0,2],[3,6]]},"lav":{"stars":[[153.7,124.6,6.5],[155.3,94.1,4.1],[136.3,74.6,5.8],[141.2,51.9,4.1],[177.1,35.4,3.6],[187.5,49.6,4.6],[55.0,70.2,5.2],[54.8,102.6,4.3],[2.5,108.0,5.6]],"lines":[[0,1],[1,2],[2,3],[3,4],[4,5],[2,6],[6,8],[8,7],[7,0],[6,7]]},"velikipas":{"stars":[[113.2,5.0,6.5],[171.0,18.9,4.3],[53.1,113.8,4.4],[78.4,142.7,4.6],[12.8,146.5,4.0],[177.2,155.0,3.6],[67.1,85.0,3.6]],"lines":[[0,1],[1,5],[0,6],[6,2],[2,3],[2,4]]},"malipas":{"stars":[[21.3,155.0,6.5],[168.7,5.0,3.6]],"lines":[[0,1]]},"volar":{"stars":[[119.3,124.3,6.5],[82.6,79.9,4.7],[44.4,44.8,3.8],[61.4,5.0,3.8],[98.7,16.7,4.2],[99.1,61.4,3.8],[145.6,128.7,4.4],[87.4,155.0,3.6]],"lines":[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[0,6],[0,7]]},"blizanci":{"stars":[[27.7,5.0,6.1],[4.1,42.4,6.5],[153.5,155.0,5.8],[185.9,95.8,5.0],[139.7,70.4,4.9],[59.7,100.9,4.4],[24.7,53.3,3.9],[79.5,20.9,3.6]],"lines":[[0,7],[7,4],[4,3],[1,6],[6,5],[5,2]]},"skorpion":{"stars":[[127.5,47.4,6.5],[160.1,5.0,4.7],[167.1,23.0,5.0],[169.2,45.4,4.4],[138.7,42.0,4.4],[118.6,58.8,4.5],[99.2,97.7,5.0],[96.9,121.8,4.3],[93.2,149.4,3.6],[69.2,155.0,3.9],[34.8,153.5,5.5],[20.8,135.1,4.2],[27.8,128.1,4.9],[39.9,115.7,5.8]],"lines":[[1,2],[2,3],[2,4],[4,0],[0,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13]]},"kocijas":{"stars":[[115.0,5.0,6.5],[41.5,14.1,4.8],[41.2,80.8,4.1],[148.8,115.7,4.1],[140.2,23.8,3.7],[132.5,46.1,3.6],[98.6,155.0,5.0]],"lines":[[0,4],[4,5],[5,3],[3,6],[6,2],[2,1],[1,0]]},"djevica":{"stars":[[22.9,155.0,6.5],[96.8,89.1,4.7],[62.0,5.0,4.7],[73.1,56.3,4.1],[183.1,67.3,3.9],[133.6,83.8,3.6],[6.9,83.4,4.1]],"lines":[[4,5],[5,1],[1,3],[3,2],[1,0],[0,6]]},"malimedvjed":{"stars":[[12,20,5.5],[50,30,4.5],[86,40,4.5],[120,52,4.5],[118,90,4.5],[172,102,5],[178,60,5]],"lines":[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,3]]}};

  const STARS = [
 {re:/denebol/i, c:"lav", i:8, name:"Denebola", dx:8, dy:18},
 {re:/deneb/i, c:"labud", i:0, name:"Deneb", dx:-20, dy:-16},
 {re:/albireo/i, c:"labud", i:3, name:"Albireo", dx:10, dy:16},
 {re:/algol/i, c:"perzej", i:1, name:"Algol", dx:12, dy:4},
 {re:/mirfak/i, c:"perzej", i:0, name:"Mirfak", dx:10, dy:-8},
 {re:/betelg/i, c:"orion", i:0, name:"Betelgeuse", dx:-74, dy:-10},
 {re:/\brigel/i, c:"orion", i:6, name:"Rigel", dx:12, dy:6},
 {re:/sirijus|sirius/i, c:"velikipas", i:0, name:"Sirijus", dx:-56, dy:-4},
 {re:/\bveg(a|e|i|om|u)\b/i, c:"lira", i:0, name:"Vega", dx:12, dy:-6},
 {re:/altair/i, c:"orao", i:0, name:"Altair", dx:-50, dy:-10},
 {re:/aldebaran/i, c:"bik", i:0, name:"Aldebaran", dx:10, dy:18},
 {re:/plejad/i, c:"bik", i:7, name:"Plejade", dx:-20, dy:-14},
 {re:/regul/i, c:"lav", i:0, name:"Regulus", dx:10, dy:16},
 {re:/arktur|arcturus/i, c:"volar", i:0, name:"Arktur", dx:12, dy:10},
 {re:/sjevernja\u010d|polaris/i, c:"malimedvjed", i:0, name:"Sjevernjača", dx:4, dy:-14},
 {re:/antares/i, c:"skorpion", i:0, name:"Antares", dx:12, dy:-6},
 {re:/kastor|castor/i, c:"blizanci", i:0, name:"Kastor", dx:-50, dy:-10},
 {re:/poluks|pollux/i, c:"blizanci", i:1, name:"Poluks", dx:-52, dy:14},
 {re:/procion|prokion/i, c:"malipas", i:0, name:"Procion", dx:10, dy:16},
 {re:/mizar/i, c:"velikimedvjed", i:5, name:"Mizar", dx:-8, dy:-14},
 {re:/kapel(a|e|i|om|u)/i, c:"kocijas", i:0, name:"Kapela", dx:10, dy:-8},
 {re:/\bspik(a|e|i|om|u)\b/i, c:"djevica", i:0, name:"Spika", dx:10, dy:16}
  ];

  /* Nazivi zviježđa s hrvatskim padežima. amb=true znači da je riječ
     višeznačna (lav, bik...) pa tražimo i astronomski kontekst. */
  const CONS = [
    {re:/\blabud/i, c:"labud"},
    {re:/sjeverni\s+kri\u017e/i, c:"labud"},
    {re:/perzej/i, c:"perzej"},
    {re:/\borion/i, c:"orion"},
    {re:/velik\w*\s+(medvjed|kola)/i, c:"velikimedvjed"},
    {re:/mal\w*\s+(medvjed|kola)/i, c:"malimedvjed"},
    {re:/kasiopej/i, c:"kasiopeja"},
    {re:/\blir(a|e|i|om|u)\b/i, c:"lira", amb:true},
    {re:/\b(orao|orla|orlu|orlom)\b/i, c:"orao", amb:true},
    {re:/\bbik(a|u|om)?\b/i, c:"bik", amb:true},
    {re:/\blav(a|u|om)?\b/i, c:"lav", amb:true},
    {re:/\u0161korpion/i, c:"skorpion"},
    {re:/blizanc/i, c:"blizanci", amb:true},
    {re:/velik\w*\s+p(as|sa|su|som)\b/i, c:"velikipas"},
    {re:/mal\w*\s+p(as|sa|su|som)\b/i, c:"malipas"},
    {re:/volar/i, c:"volar"},
    {re:/ko\u010dija\u0161/i, c:"kocijas"},
    {re:/djevic(a|e|i|om|u)/i, c:"djevica", amb:true}
  ];

  const ASTRO = /zvije\u017e|zvijezd/i;

  function consIn(text, topicText) {
    const found = new Set();
    for (const c of CONS) {
      if (!c.re.test(text)) continue;
      if (c.amb && !ASTRO.test(text) && !ASTRO.test(topicText)) continue;
      found.add(c.c);
    }
    return [...found];
  }
  function starIn(text) {
    for (const s of STARS) if (s.re.test(text)) return s;
    return null;
  }
  function plainShape(key) {
    const s = SKY[key];
    return { type:"constellation", stars:s.stars, lines:s.lines };
  }
  function starShape(st) {
    const s = SKY[st.c];
    return { type:"constellation", stars:s.stars, lines:s.lines,
             highlight:st.i, labels:[[st.i, st.name, st.dx, st.dy]] };
  }

  function enrich(q) {
    if (!q || !q.answers) return;
    const qt = String(q.question || "");
    const et = String(q.explanation || "");
    const ans = String(q.answers[q.correct] || "");
    const topic = String(q.topic || "");

    /* Slika uz pitanje: samo kad je zviježđe IMENOVANO u pitanju,
       jednoznačno, i pitanje nema svoju sliku. Bez oznaka — ne otkriva
       odgovor, ali daje vizualni kontekst za učenje. */
    if (!q.image && !/koliko/i.test(qt)) {
      const cs = consIn(qt, topic);
      if (cs.length === 1 && SKY[cs[0]]) q.image = plainShape(cs[0]);
    }

    /* Slika u objašnjenju: istakni i imenuj zvijezdu iz točnog odgovora
       (ili spomenutu u pitanju/objašnjenju). */
    if (!q.feedbackImage) {
      const st = starIn(ans) || starIn(qt) || starIn(et);
      if (st && SKY[st.c]) {
        q.feedbackImage = starShape(st);
      } else if (!q.image) {
        const cs = consIn(qt + " " + et, topic);
        if (cs.length === 1 && SKY[cs[0]]) q.feedbackImage = plainShape(cs[0]);
      }
    }
  }

  const oldBegin = window.begin;
  if (typeof oldBegin === "function") {
    window.begin = function (list) {
      try { (list || []).forEach(enrich); } catch (e) { /* nikad ne ruši kviz */ }
      oldBegin(list);
    };
  }

  /* ---------- raznovrsnije bonus činjenice ---------- */
  const BONUS = [
    "Sjevernjača nije najsjajnija zvijezda neba — po sjaju je tek oko 48. mjesta.",
    "Me\u0111unarodna astronomska unija priznaje to\u010dno 88 zvije\u017e\u0111a.",
    "Zbog Zemljine vrtnje \u010dini se da se cijelo no\u0107no nebo okre\u0107e oko Sjevernja\u010de.",
    "Svjetlost Deneba putuje do nas dulje od 1400 godina.",
    "Betelgeuse je tako golema da bi, na mjestu Sunca, progutala i Zemljinu putanju.",
    "Sirijus je najsjajnija zvijezda no\u0107nog neba \u2014 udaljena je samo 8,6 svjetlosnih godina.",
    "Boja zvijezde otkriva temperaturu: plavkaste su najvru\u0107e, a crvenkaste najhladnije.",
    "Algol svaka tri dana potamni jer ga zaklanja zvijezda pratilica \u2014 zato ga zovu Vra\u017eja zvijezda.",
    "Zvijezde u zvije\u017e\u0111u obi\u010dno nisu stvarno blizu \u2014 samo ih tako vidimo sa Zemlje.",
    "Neke zvijezde koje ve\u010deras vidi\u0161 mo\u017eda vi\u0161e i ne postoje \u2014 njihova svjetlost putovala je tisu\u0107ama godina."
  ];
  function patchBonus(q) {
    const span = document.querySelector("#feedback .bonus-fact > span:last-child");
    if (!span || !q) return;
    if (!span.textContent.includes("Zvijezde u jednom zvije\u017e\u0111u")) return;
    const h = Math.abs(String(q.id || q.question).split("").reduce((a, c) => a + c.charCodeAt(0), 0));
    span.innerHTML = "<strong>Bonus \u010dinjenica</strong>" + BONUS[h % BONUS.length];
  }
  const oldChoose = window.chooseAnswer;
  if (typeof oldChoose === "function") {
    window.chooseAnswer = function (btn, i, q) { oldChoose(btn, i, q); try { patchBonus(q); } catch (e) {} };
  }
  const oldTimeUp = window.timeUp;
  if (typeof oldTimeUp === "function") {
    window.timeUp = function (q) { oldTimeUp(q); try { patchBonus(q); } catch (e) {} };
  }
})();
