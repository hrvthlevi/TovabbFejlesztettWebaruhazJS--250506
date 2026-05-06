import { AdatService } from "../AdatService.js";

export class AdminUrlap {
  #szuloElem;
  #adatService;

  constructor(szuloElem) {
    this.#szuloElem = szuloElem;
    this.#adatService = new AdatService();
    this.megjelenit();
  }

  megjelenit() {
    this.#szuloElem.innerHTML = `
        <h3>Új termék hozzáadása</h3>
        <form id="uj-termek-form">
            <input type="text" id="nev" placeholder="Név" required>
            <input type="text" id="szerzo" placeholder="Szerző">
            <select id="kategoria" required>
                <option value="">-- Válassz kategóriát --</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Disztópia">Disztópia</option>
                <option value="Ismeretterjesztő">Ismeretterjesztő</option>
                <option value="Krimi">Krimi</option>
                <option value="Sci-fi">Sci-fi</option>
                <option value="Klasszikus">Klasszikus</option>
                <option value="Horror">Horror</option>
            </select>
            <input type="number" id="ar" placeholder="Ár" required>
            <input type="text" id="kep" placeholder="Kép URL">
            <input type="text" id="leiras" placeholder="Leírás">
            <button type="submit">Mentés</button>
        </form>
    `;

    this.esemenykezelo();
  }
  esemenykezelo() {
    const form = document.getElementById("uj-termek-form");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const adat = {
        nev: document.getElementById("nev").value,
        szerzo: document.getElementById("szerzo").value,
        kategoria: document.getElementById("kategoria").value,
        ar: Number(document.getElementById("ar").value),
        kep: document.getElementById("kep").value,
        leiras: document.getElementById("leiras").value,
      };

      this.#adatService.post("/api/termekek", adat)
        .then((valasz) => {
          console.log("Siker:", valasz);
          alert("Termék hozzáadva!");
          form.reset();
          window.dispatchEvent(new CustomEvent("ujAdatFelvitel", { detail: adat }));
        })
        .catch((err) => {
          console.error("Hiba:", err);
          alert("Hiba a mentéskor: " + err.message);
        });
    });
  }

  beolvas() {}

  validal() {
    return true;
  }
}
