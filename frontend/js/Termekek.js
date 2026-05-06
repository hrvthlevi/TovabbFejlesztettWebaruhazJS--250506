import { Termek } from "./Termek.js";

export class Termekek {
  #lista = [];
  #szuloElem;

  constructor(adatLista, szuloElem) {
    this.#szuloElem = szuloElem;
    adatLista.forEach((adat) => {
      this.#lista.push(new Termek(adat, this.#szuloElem));
    });
    this.megjelenit()
  }
  megjelenit() {
    this.#szuloElem.innerHTML = "";
    this.#lista.forEach((termek) => {
      termek.megjelenit();
    });
  }

  keres(szo) {
    console.log("Keresés folyamatban:", szo);
  }

  szur(kat) {
    console.log("Szűrés kategóriára:", kat);
  }
}
