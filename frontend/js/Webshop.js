import { Termekek } from "./Termekek.js";
import { Kosar } from "./Kosar.js";
import { AdminTermekek } from "./admin/AdminTermekek.js";
import { AdatService } from "./AdatService.js";

export class Webshop {
  #termekek;
  #kosar;
  #adatService;
  #adatLista = [];

  constructor() {
    this.mainContent = document.querySelector("#main-content");
    this.szuloElem = document.querySelector("#product-list");
    this.#adatService = new AdatService();
    this.#kosar = new Kosar(this.mainContent);
    this.init();
  }

  async adatBetoltes() {
    try {
      this.#adatLista = await this.#adatService.get("/api/termekek");
    } catch (err) {
      console.error("Hiba az adatok betöltésekor:", err);
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

  navigacioFigyeles() {
    const gombok = document.querySelectorAll("nav button");
    gombok.forEach((gomb) => {
      gomb.addEventListener("click", () => {
        const tipus = gomb.getAttribute("data-view");
        this.nezetValtas(tipus);
      });
    });
  }
  keresesFigyeles() {
    this.mainContent.addEventListener("input", (esemeny) => {
      if (esemeny.target.id === "kereso-mezo") {
        const keresettSzo = esemeny.target.value;
        this.#termekek.keres(keresettSzo);
      }
    });
  }
  szuroFigyeles() {
    this.mainContent.addEventListener("change", (esemeny) => {
      if (esemeny.target.id === "kategoria-szuro") {
        const kategoria = esemeny.target.value;
        this.#termekek.szur(kategoria);
      }
    });
  }

  kosarbaEsemenyFigyeles() {
    window.addEventListener("kosarba", (event) => {
      const termekId = event.detail;
      const kivalasztott = this.#adatLista.find((t) => t.id === termekId);
      if (kivalasztott) {
        this.#kosar.hozzaad(kivalasztott);
      }
    });
  }

  ujAdatFigyeles() {
    window.addEventListener("ujAdatFelvitel", async (event) => {
      try {
        await this.#adatService.post("/api/termekek", event.detail);
        alert("Sikeres mentés!");
        await this.adatBetoltes();
        this.nezetValtas("admin");
      } catch (err) {
        console.error("Mentési hiba:", err);
        alert("Hiba történt a mentés során!");
      }
    });
  }

  torlesEsemenyFigyeles() {
    window.addEventListener("adatTorles", async (event) => {
      const id = event.detail;
      try {
        await this.#adatService.delete("/api/termekek", id);
        alert("Sikeres törlés!");
        await this.adatBetoltes();
        this.nezetValtas("admin");
      } catch (err) {
        console.error("Törlési hiba:", err);
        alert("Hiba történt a törlés során!");
      }
    });
  }

  async nezetValtas(tipus) {
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
                <p>Vannak napok, amikor csak egy jó sztori hiányzik. Nálunk megtalálod a következőt.</p>
            </section>

            <section class="featured-books">
                <div class="section-head">
                    <h3>Ezeket most mindenki viszi</h3>
                </div>
                <div id="product-list" class="book-grid"></div>
            </section>
        `;

      await this.adatBetoltes();
      const listaElem = document.querySelector("#product-list");
      if (listaElem) {
        this.#termekek = new Termekek(this.#adatLista, listaElem);
      }
    } else {
      this.mainContent.innerHTML = "";
      if (tipus === "kosar") {
        this.#kosar.megjelenit();
      } else if (tipus === "admin") {
        await this.adatBetoltes();
        new AdminTermekek(this.#adatLista, this.mainContent);
      }
    }
  }
}
