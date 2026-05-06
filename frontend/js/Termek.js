export class Termek {
  #id;
  #nev;
  #kategoria;
  #kep;
  #szuloElem;
  #leiras;
  #ar;
  #szerzo;

  constructor(adat, szuloElem) {
    this.#id = adat.id;
    this.#nev = adat.nev;
    this.#kategoria = adat.kategoria;
    this.#kep = adat.kep;
    this.#szuloElem = szuloElem;
    this.#leiras = adat.leiras;
    this.#ar = adat.ar;
    this.#szerzo = adat.szerzo;
  }

  megjelenit() {
    const termekHTML = `
      <div class="termek-kartya" style="border: 1px solid #ccc; padding: 10px; margin: 10px; display: inline-block; width: 220px; vertical-align: top;">
        <img src="${this.#kep}" alt="${this.#nev}" style="width: 100%;">
        <h3>${this.#nev}</h3>
        <p><strong>Szerző:</strong> ${this.#szerzo}</p>
        <p><strong>Kategória:</strong> ${this.#kategoria}</p>
        <p><strong>Ár:</strong> ${this.#ar} Ft</p>
        <button id="v-${this.#id}">Kosárba</button>
      </div>
    `;
    this.#szuloElem.insertAdjacentHTML("beforeend", termekHTML); 

    const gomb = document.querySelector(`#v-${this.#id}`);
    gomb.addEventListener("click", () => {
      this.esemeny("kosarba", this.#id);
    });
  }

  esemeny(nev, id) {
    const esemenyem = new CustomEvent(nev, { detail: id });
    window.dispatchEvent(esemenyem);
  }
}
