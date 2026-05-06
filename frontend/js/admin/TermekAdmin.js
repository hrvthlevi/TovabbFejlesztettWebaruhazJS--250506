export class TermekAdmin {
  #adat;
  #szuloElem;

  constructor(adat, szuloElem) {
    this.#adat = adat;
    this.#szuloElem = szuloElem;
    this.megjelenit();
  }

  megjelenit() {
    const sor = `
        <tr>
            <td>${this.#adat.id}</td>
            <td><img src="${this.#adat.kep}" style="width:50px"></td>
            <td>${this.#adat.nev}</td>
            <td>${this.#adat.szerzo}</td>
            <td>${this.#adat.ar} Ft</td>
            <td>
                <button class="torol" data-id="${this.#adat.id}">Törlés</button>
            </td>
        </tr>
    `;

    this.#szuloElem.insertAdjacentHTML("beforeend", sor);
    this.esemenykezelo();
  }

esemenykezelo() {
    const gomb = this.#szuloElem.lastElementChild.querySelector(".torol");
    gomb.addEventListener("click", () => {
        if(confirm("Biztosan törlöd?")) {
            window.dispatchEvent(new CustomEvent("adatTorles", { detail: this.#adat.id }));
        }
    });
}
}