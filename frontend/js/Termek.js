export class Termek {
  #id;
  #nev;
  #kategoria;
  #kep;
  #szuloElem;
  #leiras;
  #ar;
  #szerzo;
  #adat;

  constructor(adat, szuloElem) {
    this.#id = adat.id;
    this.#nev = adat.nev;
    this.#kategoria = adat.kategoria;
    this.#kep = adat.kep;
    this.#szuloElem = szuloElem;
    this.#leiras = adat.leiras;
    this.#ar = adat.ar;
    this.#adat = adat;
    this.#szerzo = adat.szerzo;
  }

  getKategoria() {
    return this.#kategoria;
  }
  getNev() {
    return this.#adat.nev;
  }

  megjelenit() {
    const termekHTML = `
      <div class="book-card">
        <div class="book-cover">
          <img src="${this.#kep}" alt="${this.#nev}">
        </div>
        <div class="book-info">
          <h3 class="book-title">${this.#nev}</h3>
          <p class="book-author">${this.#szerzo}</p>
          <p class="book-description">${this.#kategoria}</p>
          <p class="book-price">${this.#ar} Ft</p>
          <button id="v-${this.#id}" class="buy-button">Kosárba</button>
        </div>
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
