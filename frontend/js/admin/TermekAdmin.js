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
    const gomb = this.#szuloElem.querySelector(`[data-id="${this.#adat.id}"]`);

    gomb.addEventListener("click", () => {
      fetch(`http://localhost:3000/api/termekek/${this.#adat.id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          location.reload(); 
        });
    });
  }
}
