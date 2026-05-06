# Webáruház JavaScript + Node/Express

Ez a projekt egy egyszerű webáruház, amelyben a `frontend` rész kliensoldali modulokból épül fel, a `backend` pedig egy Express szerver, amely a termékadatokat szolgáltatja.

## Fájlstruktúra

- `backend/`
  - `app.js` – az Express szerver és a statikus fájlok kiszolgálása
  - `routes/termekRoutes.js` – API útvonalak a termékek lekéréséhez és törléséhez
  - `controllers/TermekController.js` – a route-okon keresztüli kérések kezelése
  - `models/TermekModel.js` – a termékadatok olvasása és törlése a `termekek.json` fájlból
  - `config/db.js` – MySQL kapcsolatot definiáló fájl, jelenleg a projekt nem használja
- `frontend/`
  - `index.html` – a kliensoldali alkalmazás belépési pontja
  - `js/` – az összes frontend modul
- `termekek.json` – a backend által használt termékadatokat tároló fájl
- `README.md` – ez a dokumentáció

> Megjegyzés: a gyökérben található `js/` mappa jelen projektben duplikátum, mert a valódi frontend modulok a `frontend/js/` alatt találhatók. A `backend` szerver a `frontend` mappát szolgáltatja statikus tartalomként.

## Indítás

A projektet a `backend` mappából kell indítani:

```powershell
cd backend
node app.js
```

Ezután nyisd meg a böngészőt a következő címen:

```
http://localhost:3000/
```

## Backend részletezve

### `backend/app.js`

- Express alkalmazást hoz létre.
- Engedélyezi a CORS-t és a JSON body feldolgozást.
- A `frontend` mappát statikus fájlként szolgáltatja:
  - `app.use(express.static(path.join(__dirname, "../frontend")));`
- Az alap URL-re (`/`) a `frontend/index.html`-t küldi vissza.
- API útvonalakat használ a `/api/termekek` alatti kérésekhez.

### `backend/routes/termekRoutes.js`

- `GET /api/termekek` – az összes termék lekérése.
- `GET /api/termekek/:id` – egy termék lekérése azonosító alapján.
- `DELETE /api/termekek/:id` – egy termék törlése azonosító alapján.

### `backend/controllers/TermekController.js`

- `getAll(req, res)` – meghívja a modell `getAllTermek` metódusát és JSON formátumban küldi a választ.
- `getById(req, res)` – meghívja a modell `getTermekById` metódusát, 404-et ad vissza, ha nincs találat.
- `delete(req, res)` – meghívja a modell `deleteTermek` metódusát és visszaadja a törlés eredményét.

### `backend/models/TermekModel.js`

- `getAllTermek(callback)` – beolvassa a `termekek.json` fájlt és visszaadja a JSON tömböt.
- `getTermekById(id, callback)` – beolvassa a fájlt, majd visszaadja az `id`-hez tartozó terméket.
- `deleteTermek(id, callback)` – beolvassa a fájlt, eltávolítja a megadott terméket és visszaírja a frissített tömböt.

### `backend/config/db.js`

- MySQL kapcsolatot hoz létre, de a projekt jelenlegi állapotában nincs használatban.
- Jelenleg a termékadatok helyette fájlból (`termekek.json`) töltődnek be.

## Frontend részletezve

### `frontend/index.html`

- Modul scriptet használ:
  - `<script type="module" src="js/main.js"></script>`
- A `frontend` mappa a statikus gyökér, így a `js` könyvtár relatív útvonala `js/main.js`.
- Tartalmaz egy navigációs menüt, amely a `shop`, `kosar` és `admin` nézeteket váltja.

### `frontend/js/main.js`

- `import { Webshop } from "./Webshop.js";`
- Az oldal betöltődésekor létrehoz egy `Webshop` példányt.

### `frontend/js/Webshop.js`

Ez a frontend alkalmazás központi vezérlője.

- `constructor()`
  - kiválasztja a `#main-content` elemet,
  - létrehoz egy `AdatService` példányt,
  - létrehoz egy `Kosar` példányt,
  - elindítja az `init()` metódust.
- `adatBetoltes()`
  - fetch-el lekéri az adatokat a `/api/termekek` végpontról.
- `init()`
  - betölti a termékadatokat,
  - létrehozza a `Termekek` komponenst,
  - beállítja a navigációs és kosár eseményfigyelést.
- `kosarbaEsemenyFigyeles()`
  - figyeli a `kosarba` custom eventet,
  - a termék azonosítója alapján hozzáadja az elemet a kosárhoz.
- `esemenyFigyeles()`
  - a navigációs gombokra kattintva vált nézetet.
- `nezetValtas(tipus)`
  - `shop` esetén újra betölti az adatokat és megjeleníti a terméklistát,
  - `kosar` esetén megjeleníti a kosár tartalmát,
  - `admin` esetén admin nézetet tölt be.

### `frontend/js/AdatService.js`

- `get(url)` – GET kérés küldése, JSON visszaolvasása.
- `post(url, adat)` – POST kérés küldése JSON törzzsel.
- `delete(url, id)` – DELETE kérés küldése.

### `frontend/js/Termekek.js`

- `constructor(adatLista, szuloElem)` – létrehoz egy `Termek` objektumot minden adatsornak és megjeleníti azokat.
- `megjelenit()` – végigmegy a terméklistán és meghívja minden elem `megjelenit()` metódusát.
- `keres(szo)` és `szur(kat)` – jelenleg csak `console.log`-ot írnak, de későbbi bővítésre alkalmasak.

### `frontend/js/Termek.js`

- Egyetlen termék megjelenítéséért felelős.
- A `megjelenit()` létrehoz egy kártyát és egy `Kosárba` gombot.
- A gomb kattintásakor egy `kosarba` custom eventet küld a termék `id`-jával.

### `frontend/js/Kosar.js`

- A kosár logikáját kezeli.
- `hozzaad(termekAdat)` – ha a termék már van a kosárban, növeli a darabszámát, különben új `KosarElem`-et hoz létre.
- `megjelennit()` – megjeleníti a kosár tartalmát és az összegzést.
- `getOsszeg()` – kiszámolja a kosár teljes árát.
- Eseményfigyelők vannak a mennyiség növelésére, csökkentésére és törlésre.

### `frontend/js/KosarElem.js`

- Egy kosárban lévő termékegység viselkedéséért felel.
- `getTermekId()` – visszaadja a termék azonosítóját.
- `getAr()` – a mennyiség és az egységár szorzata.
- `novel()` / `csokken()` – mennyiség módosítása.
- `megjelennit()` – megjeleníti a kosár sort és eseménykezelőket ad a gombokhoz.

### `frontend/js/admin/AdminTermekek.js`

- Az admin nézet keretét rajzolja fel: űrlap + terméklista táblázat.
- Létrehozza az `AdminUrlap` és `TermekAdmin` példányokat.

### `frontend/js/admin/TermekAdmin.js`

- Minden termékhez egy admin táblázatsort hoz létre.
- A `Törlés` gomb megnyomásakor `DELETE /api/termekek/:id` kérés küldése történik.
- Sikeres törlés után újratölti az oldalt.

### `frontend/js/admin/AdminUrlap.js`

- Egy űrlapot jelenít meg új termék hozzáadásához.
- A beküldéskor egy POST kérést próbál elküldeni a backend felé.
- **Fontos**: a backend jelenleg nem támogatja a `POST /api/termekek` végpontot, ezért a termék hozzáadása most nem fog működni.

## Működési kapcsolatok

- A böngésző betölti a `frontend/index.html` fájlt.
- Ez elindítja a `frontend/js/main.js` modult.
- A `Webshop` komponens lekéri az adatokat a backend `/api/termekek` végpontjáról.
- A termékadatok `Termekek` és `Termek` objektumokká alakulnak.
- A kosár eseményeket a `Kosar` és `KosarElem` kezelik.
- Az admin nézetben a törlés közvetlenül a backend `DELETE /api/termekek/:id` végpontját használja.

## Jelenlegi korlátozások / hibák

- A `frontend/js/admin/AdminUrlap.js` POST-ot küld, de a backend nem kezeli a `POST /api/termekek` kéréseket.
- A `backend/config/db.js` jelenleg nincs használatban.
- A gyökérben lévő `js/` mappa duplikátum, ami zavart okozhat. A valódi frontend modulok a `frontend/js/` alatt találhatók.

## Javítási javaslatok

1. Ha a backend a fájl alapú adatkezelést tartom meg, akkor hozzáadok `POST /api/termekek` route-ot és egy `addTermek` metódust a modellhez.
2. Ha MySQL-t szeretnék használni, akkor a `backend/config/db.js`-t kell beépíteni és a modell kódját adatbázis-hívásokra kell átalakítani.
3. A gyökérben lévő `js/` mappa törlése vagy elkerülése csökkenti a hibalehetőséget.

## Összegzés

- A backend feladata az adatok szolgáltatása és a statikus frontend kiszolgálása.
- A frontend feladata a termékek megjelenítése, kosár kezelés és admin nézet vezérlése.
- A projekt most működő GET/DELETE API-val rendelkezik, de az adminisztratív hozzáadás még nincs befejezve.
