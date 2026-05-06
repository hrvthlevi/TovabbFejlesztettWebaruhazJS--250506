import { Termekek } from "./Termekek.js";
import { Kosar } from "./Kosar.js";
import { AdminTermekek } from "./admin/AdminTermekek.js";
import { AdatService } from "./AdatService.js";
import { hitelesites } from "./auth.js";

export class Webshop {
  #termekek;
  #kosar;
  #adatService;
  #adatLista = [];

  constructor() {
    this.mainContent = document.querySelector("#main-content");
    this.#adatService = new AdatService();
    this.#kosar = new Kosar(this.mainContent);
    
    this.init();
    this.navFrissites();
    this.logoutFigyeles();
    
    window.addEventListener("userFrissites", () => this.navFrissites());
  }

  async adatBetoltes() {
    try {
      this.#adatLista = await this.#adatService.get("/api/termekek");
    } catch (err) {
      console.error(err);
      this.#adatLista = [];
    }
  }

  async init() {
    await this.adatBetoltes();
    const listaElem = document.querySelector("#product-list");
    if (listaElem) {
      this.#termekek = new Termekek(this.#adatLista, listaElem);
    }
    this.navigacioFigyeles();
    this.kosarbaEsemenyFigyeles();
    this.ujAdatFigyeles();
    this.torlesEsemenyFigyeles();
    this.szuroFigyeles();
    this.keresesFigyeles();
  }

  navFrissites() {
    const user = JSON.parse(localStorage.getItem("bejelentkezettUser"));
    
    const adminGomb = document.querySelector('button[data-view="admin"]');
    const loginGomb = document.querySelector('button[data-view="login"]');
    const logoutGomb = document.querySelector('button[data-nav="logout-gomb"]');
    const pontKijelzo = document.querySelector("#user-pontok");

    if (user) {
      if (loginGomb) loginGomb.classList.add("hidden");
      if (logoutGomb) logoutGomb.classList.remove("hidden");
      
      if (pontKijelzo) {
        pontKijelzo.textContent = `Gyűjtött pontok: ${user.pontok || 0}`;
        pontKijelzo.classList.remove("hidden");
      }

      if (adminGomb) {
        user.role === "admin" ? adminGomb.classList.remove("hidden") : adminGomb.classList.add("hidden");
      }
    } else {
      if (loginGomb) loginGomb.classList.remove("hidden");
      if (logoutGomb) logoutGomb.classList.add("hidden");
      if (adminGomb) adminGomb.classList.add("hidden");
      if (pontKijelzo) pontKijelzo.classList.add("hidden");
    }
  }

  logoutFigyeles() {
    document.addEventListener("click", (e) => {
      if (e.target.dataset.nav === "logout-gomb") {
        localStorage.removeItem("bejelentkezettUser");
        this.navFrissites();
        this.nezetValtas("shop");
      }
    });
  }

  navigacioFigyeles() {
    const navButtons = document.querySelector(".nav-buttons");
    if (navButtons) {
      navButtons.addEventListener("click", (e) => {
        const gomb = e.target.closest("button");
        if (!gomb) return;
        const tipus = gomb.getAttribute("data-view");
        if (tipus) this.nezetValtas(tipus);
      });
    }
  }

  loginFigyeles() {
    const form = document.querySelector("#login-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.querySelector("#login-email").value.trim();
      const pass = document.querySelector("#login-pass").value.trim();
      const felhasznalo = hitelesites(email, pass);

      if (felhasznalo) {
        localStorage.setItem("bejelentkezettUser", JSON.stringify(felhasznalo));
        this.navFrissites();
        this.nezetValtas("shop");
      } else {
        const hibaElem = document.querySelector("#login-hiba");
        if (hibaElem) hibaElem.classList.remove("hidden");
      }
    });
  }

  keresesFigyeles() {
    this.mainContent.addEventListener("input", (e) => {
      if (e.target.id === "kereso-mezo" && this.#termekek) {
        this.#termekek.keres(e.target.value);
      }
    });
  }

  szuroFigyeles() {
    this.mainContent.addEventListener("change", (e) => {
      if (e.target.id === "kategoria-szuro" && this.#termekek) {
        this.#termekek.szur(e.target.value);
      }
    });
  }

  kosarbaEsemenyFigyeles() {
    window.addEventListener("kosarba", (event) => {
      const kivalasztott = this.#adatLista.find((t) => t.id === event.detail);
      if (kivalasztott) this.#kosar.hozzaad(kivalasztott);
    });
  }

  ujAdatFigyeles() {
    window.addEventListener("ujAdatFelvitel", async (event) => {
      try {
        await this.#adatService.post("/api/termekek", event.detail);
        await this.adatBetoltes();
        this.nezetValtas("admin");
      } catch (err) {
        console.error(err);
      }
    });
  }

  torlesEsemenyFigyeles() {
    window.addEventListener("adatTorles", async (event) => {
      try {
        await this.#adatService.delete("/api/termekek", event.detail);
        await this.adatBetoltes();
        this.nezetValtas("admin");
      } catch (err) {
        console.error(err);
      }
    });
  }

  async nezetValtas(tipus) {
    if (tipus === "admin") {
      const user = JSON.parse(localStorage.getItem("bejelentkezettUser"));
      if (!user || user.role !== "admin") {
        this.nezetValtas("shop");
        return;
      }
    }

    this.mainContent.innerHTML = "";

    if (tipus === "shop") {
      this.mainContent.innerHTML = `
            <section class="filters container">
                <div class="filter-group">
                    <label for="kereso-mezo">KERESÉS:</label>
                    <input type="text" id="kereso-mezo" placeholder="Írd be a könyv címét...">
                </div>
                <div class="filter-group">
                    <label for="kategoria-szuro">KATEGÓRIA:</label>
                    <select id="kategoria-szuro">
                        <option value="all">Összes kategória</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Disztópia">Disztópia</option>
                        <option value="Ismeretterjesztő">Ismeretterjesztő</option>
                        <option value="Krimi">Krimi</option>
                        <option value="Sci-fi">Sci-fi</option>
                        <option value="Klasszikus">Klasszikus</option>
                        <option value="Horror">Horror</option>
                    </select>
                </div>
            </section>
            <section class="hero">
                <h2>Vackold be magad egy jó könyvvel! ☕</h2>
                <p>Vannak napok, amikor csak egy jó sztori hiányzik.</p>
            </section>
            <div id="product-list" class="book-grid"></div>
        `;
      await this.adatBetoltes();
      const listaElem = document.querySelector("#product-list");
      if (listaElem) this.#termekek = new Termekek(this.#adatLista, listaElem);
      
    } else if (tipus === "login") {
      this.mainContent.innerHTML = `
        <section class="login-container">
            <form id="login-form">
                <h3>Bejelentkezés</h3>
                <div class="filter-group">
                    <label>E-mail</label>
                    <input type="email" id="login-email" required>
                </div>
                <div class="filter-group">
                    <label>Jelszó</label>
                    <input type="password" id="login-pass" required>
                </div>
                <button type="submit" class="buy-button">Belépés</button>
                <p id="login-hiba" class="hidden" style="color: red; margin-top: 1rem;">Helytelen adatok!</p>
            </form>
        </section>
      `;
      this.loginFigyeles();
    } else if (tipus === "kosar") {
      this.#kosar.megjelenit();
    } else if (tipus === "admin") {
      await this.adatBetoltes();
      new AdminTermekek(this.#adatLista, this.mainContent);
    }
  }
}