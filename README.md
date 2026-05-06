# Könyvkuckó – Webáruház

**Teljes körűen működő webáruház alkalmazás** egy online könyvesbolt szimulációjával. Modern, responsive UI, bejelentkezési rendszer, kosár kezelés, pont gyűjtés, keresés, kategória szűrés és teljes admin panel.

**Technológia**: Node.js + Express | vanilla ES6+ JavaScript Modules | CSS3 (Grid, Flexbox, CSS Variables)

---

## Gyors Indítás

```bash
cd backend
npm install
node app.js
```

Majd nyisd meg: **http://localhost:3000/**

**Demo bejelentkezés:**
- **Admin**: `admin@kucko.hu` / `admin123`
- **User**: `user@kucko.hu` / `user123`

---

## Projekt Struktúra

```
backend/
  ├─ app.js                    # Express szerver + statikus frontend kiszolgálás
  ├─ package.json              # Dependencies (cors, express, mysql2, dotenv)
  ├─ termekek.json             # Termékhalmozás (12+ könyv + SVG képek)
  ├─ routes/
  │  └─ termekRoutes.js        # API útvonalak (GET, POST, DELETE)
  ├─ controllers/
  │  └─ TermekController.js    # CRUD logika (getAll, create, delete)
  ├─ models/
  │  └─ TermekModel.js         # Adatbázis műveletek (JSON fájl alapú)
  └─ config/
     └─ db.js                  # MySQL config (jelenleg nincs aktív)

frontend/
  ├─ index.html                # HTML belépési pont + header + nav
  ├─ style.css                 # Modern CSS (Grid, Flexbox, Variables)
  └─ js/
     ├─ main.js                # App inicializáció
     ├─ Webshop.js             # Központi vezérlő (nézet váltás, events)
     ├─ AdatService.js         # API kommunikáció (get, post, delete)
     ├─ auth.js                # Bejelentkezési adatok + hitelesítés
     ├─ Termekek.js            # Termék lista kezelés (keres, szur)
     ├─ Termek.js              # Egyetlen termék komponens
     ├─ Kosar.js               # Kosár logika + pont gyűjtés
     ├─ KosarElem.js           # Kosár elem komponens
     └─ admin/
        ├─ AdminTermekek.js    # Admin nézet + admin tábla
        ├─ AdminUrlap.js       # Új termék forma + POST kérés
        └─ TermekAdmin.js      # Termék sorkezelés (törlés)
```

---

## Backend API

### Útvonalak

```
GET    /api/termekek              # Összes termék
GET    /api/termekek/:id         # Termék ID alapján
POST   /api/termekek             # Új termék hozzáadása
DELETE /api/termekek/:id         # Termék törlése
```

### TermekModel.js – Adatkezelés

- **getAllTermek()** – JSON fájl beolvasása, összes termék visszaadása
- **getTermekById(id)** – Termék keresése ID alapján
- **deleteTermek(id)** – Termék törlése a fájlból
- **saveTermek(ujAdat)** – Új termék hozzáadása (ID auto-increment)

### TermekController.js – Logika

- **getAll()** → `GET /api/termekek`
- **getById()** → `GET /api/termekek/:id`
- **delete()** → `DELETE /api/termekek/:id`
- **create()** → `POST /api/termekek` (új termék mentése)

---

## Frontend Funkciók

### Termékek Megtekintése

✅ **Termék lista** (12+ könyv)
- Grid layout (CSS `repeat(auto-fill, minmax(260px, 1fr))`)
- Könyv kártyák (kép, cím, szerző, ár, kosár gomb)
- SVG ikona képek

### Keresés

✅ **Működik!** – Real-time keresés a termékcím alapján
```javascript
// Termekek.js – keres(szo)
// Webshop.js – keresesFigyeles()
// HTML: <input id="kereso-mezo">
```
- Kis/nagybetű keresés
- Azonnali szűrés

### Kategória Szűrés

✅ **Működik!** – 8 kategória közül válogatás
```javascript
// Termekek.js – szur(kategoria)
// Webshop.js – szuroFigyeles()
// HTML: <select id="kategoria-szuro">
```
**Kategóriák:** Fantasy, Sci-fi, Krimi, Horror, Klasszikus, Disztópia, Ismeretterjesztő

###  Kosár Kezelés

✅ **Működik!**
- Termék hozzáadása kosárhoz
- Mennyiség módosítása (+ / -)
- Termék törlése a kosárból
- Végösszeg kalkuláció

###  Pont Gyűjtés

✅ **Működik bejelentkezéskor!**
```javascript
// Kosar.js – fizetes()
// localStorage: bejelentkezettUser.pontok
```
- Minden vásárlás után pont (darabszám alapján)
- Felhasználó pontok kijelzése a navban

###  Bejelentkezés / Kijelentkezés

✅ **Működik!**
```javascript
// auth.js – hitelesites(email, jelszo)
// Webshop.js – loginFigyeles(), logoutFigyeles()
// localStorage kezelés
```
**Demo felhasználók:**
- `admin@kucko.hu` / `admin123` (admin)
- `user@kucko.hu` / `user123` (user)

### Admin Panel

✅ **Működik!**

#### 1. Admin Bejelentkezés Szükséges
- Csak admin role-lal elérhető
- Nincs megjelenítve az "Kezelőpult" gomb normál felhasználónak

#### 2. Új Termék Hozzáadása
```javascript
// AdminUrlap.js – megjelenit() + esemenykezelo()
// HTML form: nev, szerzo, kategoria, ar, kep, leiras
// POST /api/termekek
```

#### 3. Termék Törlés
```javascript
// TermekAdmin.js – megjelenit()
// DELETE /api/termekek/:id
// Törlés után oldal frissítés
```

#### 4. Terméklista Táblázat
```javascript
// AdminTermekek.js – megjelenit()
// Táblázat: ID | Kép | Név | Szerző | Ár | Műveletek
```

### Nézet Váltás

✅ **Működik!**
```javascript
// Webshop.js – nezetValtas(tipus)
```
- **shop** – Terméklista + keresés/szűrés
- **login** – Bejelentkezési forma
- **kosar** – Kosár tartalma
- **admin** – Admin panel (csak admin)

### Modern UI

✅ **CSS3 + Responsive Design**
```css
/* style.css */
--bg: #f8f3eb          /* Krémes beige háttér */
--accent: #8b5e34      /* Kávé barna akcentus */
--danger: #c0392b      /* Piros veszélyzóna */
```
- **Grid layout** terméklistához
- **Flexbox** navigáció + kosár
- **CSS Variables** egységes téma
- **Sticky nav** teteje
- **Responsive** media queries
- **Playfair Display** (címek) + **Open Sans** (szöveg)
- **Hover effektusok** interaktivitáshoz

---

## Funkciók Listája

| Funkció | Státusz | Leírás |
|---------|---------|--------|
| Termék lista | ✅ | 12+ könyv Grid-ben |
| Keresés | ✅ | Cím alapján real-time |
| Kategória szűrés | ✅ | 8 kategória |
| Kosár hozzáadás | ✅ | Egy kattintás |
| Kosár módosítás | ✅ | +/-, törlés |
| Pont gyűjtés | ✅ | Vásárláskor pontok |
| Bejelentkezés | ✅ | Email + jelszó |
| Kijelentkezés | ✅ | Kijelentkezés gomb |
| Admin panel | ✅ | Admin nézet |
| Termék hozzáadás | ✅ | Új termék forma |
| Termék törlés | ✅ | Törlés gomb |
| Responsive design | ✅ | Mobile-friendly |

---

## Technológiai Stack

- **Frontend**: HTML5, ES6+ modules, CSS3 (Grid, Flexbox, Variables)
- **Backend**: Node.js, Express.js
- **Adatkezelés**: JSON file (termekek.json)
- **Autentikáció**: localStorage + hitelesites()
- **API**: REST (GET, POST, DELETE)
- **Design**: CSS3 modern (beige/barna téma)

---

## 📋 Adatformátum

### Termék (termekek.json)

```json
{
  "id": 1,
  "szerzo": "J.R.R. Tolkien",
  "nev": "A Gyűrűk Ura",
  "kategoria": "Fantasy",
  "kep": "<svg>...</svg>",
  "leiras": "Egy gyűrű mind felett.",
  "ar": 5990
}
```

### Bejelentkezett Felhasználó (localStorage)

```json
{
  "email": "admin@kucko.hu",
  "jelszo": "admin123",
  "role": "admin",
  "pontok": 15
}
```

---

## 🚀 Webshop.js – Vezérlő Logika

**Központi alkalmazás vezérlő**:

```javascript
// Inicializáció
constructor() → init() → loadData() → setupEventListeners()

// Nézet váltás
nezetValtas(shop|login|kosar|admin)

// Event kezelés
- keresesFigyeles() → Termekek.keres()
- szuroFigyeles() → Termekek.szur()
- kosarbaEsemenyFigyeles() → Kosar.hozzaad()
- ujAdatFigyeles() → AdminUrlap POST
- torlesEsemenyFigyeles() → TermekAdmin DELETE
- loginFigyeles() → auth.hitelesites()
- logoutFigyeles() → kijelentkezés
- navFrissites() → pontok és gombók frissítése
```

---

## CSS Stílus Paletta

```css
:root {
  --bg: #f8f3eb;              /* Háttér - krémes beige */
  --surface: #ffffff;         /* Felület - fehér */
  --text: #342917;            /* Szöveg - csokoládé barna */
  --muted: #6d5a4a;           /* Tompított - világos barna */
  --accent: #8b5e34;          /* Akcentus - kávé barna */
  --danger: #c0392b;          /* Veszély - piros */
  --border: #d8c1a8;          /* Szegély - beige */
  --shadow: 0 14px 35px rgba(52, 41, 25, 0.08); /* Árnyék */
  --radius: 12px;             /* Sarkok */
}
```

---

## 📱 Responsive Breakpoints

```css
/* Desktop */
min-width: 1120px
grid-template-columns: repeat(auto-fill, minmax(260px, 1fr))

/* Tablet / Mobile */
@media (max-width: 768px)
- Stack flex: flex-direction: column
- Kosár elemek egyvonalasak maradnak
- Nav: center align
- Szűrők: teljes szélesség
```

---

## Event Flow

```
1. Bejelentkezés
   → localStorage.setItem("bejelentkezettUser")
   → navFrissites() → gombók frissítése
   → nezetValtas("shop")

2. Keresés
   → input event #kereso-mezo
   → keresesFigyeles() → Termekek.keres()
   → megjelenit(szurtLista)

3. Szűrés
   → change event #kategoria-szuro
   → szuroFigyeles() → Termekek.szur()
   → megjelenit(szurtLista)

4. Kosárba
   → click "Kosárba" gomb
   → CustomEvent "kosarba" dispath
   → kosarbaEsemenyFigyeles()
   → Kosar.hozzaad(termekAdat)

5. Vásárlás
   → click "Megrendelem" gomb
   → Kosar.fizetes()
   → pontok += darabszám
   → localStorage frissítés
   → userFrissites event

6. Admin hozzáadás
   → submit #uj-termek-form
   → AdminUrlap.esemenykezelo()
   → POST /api/termekek
   → ujAdatFelvitel event
   → ujAdatFigyeles()
   → nezetValtas("admin")

7. Admin törlés
   → click "Törlés" gomb
   → adatTorles event
   → torlesEsemenyFigyeles()
   → DELETE /api/termekek/:id
   → nezetValtas("admin")
```

---

## Modulok Összefoglalása

| Modul | Felelősség |
|-------|-----------|
| **main.js** | App indítás |
| **Webshop.js** | Központi vezérlő + event handling |
| **AdatService.js** | API fetch wrapper |
| **auth.js** | Bejelentkezési adatok + hitelesítés |
| **Termekek.js** | Termék lista + keresés/szűrés |
| **Termek.js** | Egyetlen termék kártya |
| **Kosar.js** | Kosár logika + pont gyűjtés |
| **KosarElem.js** | Kosár sor + mennyiség vezérlés |
| **AdminTermekek.js** | Admin nézet + forma + táblázat |
| **AdminUrlap.js** | Új termék form + POST |
| **TermekAdmin.js** | Termék sorkezelés + törlés |

---

## Teljes Funkcionális Projekt

Ez a projekt **teljesen működő**, összes funkció implementálva:
- ✅ Backend CRUD (GET, POST, DELETE)
- ✅ Frontend moduláris architektúra
- ✅ Bejelentkezés + punkt gyűjtés
- ✅ Kosár kezelés
- ✅ Admin panel
- ✅ Keresés + kategória szűrés
- ✅ Modern responsive UI
- ✅ localStorage adatkezelés
- ✅ Custom eventos kezelés

