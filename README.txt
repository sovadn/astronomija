ASTRONOMIJA – KVIZ ZA 5. RAZRED

DATOTEKE
- index.html             aplikacija
- questions.json         baza pitanja
- manifest.json          PWA postavke
- service-worker.js      offline rad
- icon.svg               ikona aplikacije

LOKALNO TESTIRANJE NA RAČUNALU
1. Otvori terminal u ovoj mapi.
2. Pokreni:
   python -m http.server 8000
3. U pregledniku otvori:
   http://localhost:8000

OBJAVA NA GITHUB PAGES
1. Napravi novi javni GitHub repozitorij, npr. astronomija-kviz.
2. Uploadaj svih pet datoteka iz ove mape.
3. U repozitoriju otvori Settings > Pages.
4. Source: Deploy from a branch.
5. Branch: main, folder: /root.
6. Nakon nekoliko minuta aplikacija će biti na:
   https://KORISNICKO-IME.github.io/astronomija-kviz/

INSTALACIJA NA MOBITEL
- Otvori aplikaciju u Chromeu.
- Izbornik preglednika > Dodaj na početni zaslon ili Instaliraj aplikaciju.
- Nakon prvog učitavanja radi i bez interneta.

NOVO U OVOJ VERZIJI (dječje izdanje)
- Maskota Zvjezdan koja se raduje i tuguje s tobom
- XP bodovi i 8 astronautskih činova (od kadeta do legende svemira)
- Niz točnih odgovora (streak) s bonusom
- 8 značaka koje se skupljaju
- Konfeti, zvukovi (gumb za isključivanje) i vibracija na mobitelu
- Raketa koja leti po traci napretka prema planetu
- Brzinska misija: 20 sekundi po pitanju uz dodatni XP
- Zvjezdice i zabavne poruke na rezultatu
- Animirano zvjezdano nebo sa zvijezdama padalicama
- Zanimljivosti o svemiru na početnom zaslonu
Napomena: gumb "Obriši napredak" briše statistiku, XP i značke.

SLIKOVNA PITANJA (od verzije 3)
Pitanju u questions.json može se dodati polje "image" — aplikacija sliku
sama nacrta (SVG), pa sve i dalje radi offline bez dodatnih datoteka.

Podržane vrste:
1) Zviježđe — točke i linije, kao na natjecanju:
   "image": {"type":"constellation",
             "stars":[[x,y,veličina], ...],
             "lines":[[0,1],[1,2], ...]}
   - stars: koordinate zvijezda (treći broj = veličina, neobavezno)
   - lines: parovi indeksa zvijezda koje spaja linija
2) Sunčev sustav s označenim planetom:
   "image": {"type":"solar","highlight":5}
   - highlight: 0=Merkur, 1=Venera, 2=Zemlja, 3=Mars,
                4=Jupiter, 5=Saturn, 6=Uran, 7=Neptun
3) Vlastiti SVG kod:
   "image": {"type":"svg","svg":"<svg ...>...</svg>"}
4) Vanjska slika (png/jpg):
   "image": {"type":"src","src":"images/slika.png"}
   - datoteku stavi u mapu aplikacije i dodaj njezin put u popis
     ASSETS u service-worker.js da radi i bez interneta

Dodano je 8 novih slikovnih pitanja (Q0091–Q0098): Kasiopeja, Velika kola,
Labud, Orion, Mali medvjed te prepoznavanje Saturna, Marsa i Neptuna.
Slika se prikazuje i u popisu pitanja za ponavljanje na kraju kviza.

SLIKA U OBJAŠNJENJU (od verzije 4)
Pitanju se može dodati polje "feedbackImage" — slika koja se prikazuje
tek NAKON odgovora, uz tekstualno objašnjenje (npr. zviježđe s
istaknutom zvijezdom o kojoj se pitalo). Prikazuje se i u popisu
pitanja za ponavljanje. Format je isti kao kod "image", uz dva dodatka
za vrstu "constellation":
  "highlight": 2            -> istakne zvijezdu s indeksom 2
  "highlight": [2,3,4]      -> istakne više zvijezda (npr. Orionov pojas)
  "labels": [[0,"Deneb"], [6,"Rigel",-10,20]]
     -> ispiše ime uz zvijezdu; treći i četvrti broj su neobavezni
        pomaci natpisa (dx, dy) ako zadani položaj nešto prekriva
Slika u objašnjenju dodana je na 14 pitanja (npr. "Najsjajnija zvijezda
u Orionu" sada nakon odgovora pokaže Orion s istaknutim Rigelom), a
dodana su i tri nova zviježđa: Orao (Altair), Veliki pas (Sirijus) i Cefej.

VERZIJA 5
- Gumb ✖ u gornjem desnom kutu kviza: prekid misije i povratak na
  postavke (promjena teme, broja pitanja, težine...). Rezultat prekinute
  misije se ne sprema, ali osvojeni XP ostaje.
- Dodano 45 novih pitanja (Q0099–Q0143) iz školskih, županijskih i
  državnih natjecanja 2012., 2013., 2015./16., 2017., 2024./25. i
  2025./26., s objašnjenjima. Nova tema: Kalendar.
- Nova zviježđa u crtaču: Kit (s promjenjivom zvijezdom Mirom) i
  Lira (s Vegom). Novo slikovno pitanje: prepoznavanje Kita.


VERZIJA 6
- Baza proširena sa 108 novih pitanja iz PDF-ova za 5. razred.
- Ukupno pitanja u bazi: 289.
- Dodani su materijali sa županijskih natjecanja 2001.–2008., školskog i
  državnog natjecanja 2008., županijskog natjecanja 2012. te školskog,
  županijskog i državnog natjecanja 2018.
- Pitanja za druge razrede nisu uključena.
- Zastarjeli ili netočni službeni odgovori nisu preuzimani bez ispravka.


VERZIJA V7
- Dodano novih pitanja: 38.
- Ukupno pitanja u bazi: 289.
- Dodani su novi zadaci iz državnih natjecanja 2001.-2007. i 2025./2026.
- Ponavljanja su preskočena, a zastarjela pitanja nisu dodana.
