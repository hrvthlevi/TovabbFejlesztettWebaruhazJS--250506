import { Termek } from "./Termek.js";

export class Termekek {
  #lista = [];
  #szuloElem;

  constructor(adatLista, szuloElem) {
    this.#szuloElem = szuloElem;
    adatLista.forEach((adat) => {
      this.#lista.push(new Termek(adat, this.#szuloElem));
    });
    this.megjelenit(this.#lista);
  }

  megjelenit(lista) {
    this.#szuloElem.innerHTML = "";
    lista.forEach((termek) => {
      termek.megjelenit();
    });
  }

  szur(kat) {
    if (kat === "all" || kat === "") {
      this.megjelenit(this.#lista);
    } else {
      const szurtLista = this.#lista.filter((termek) => {
        return termek.getKategoria && termek.getKategoria() === kat;
      });
      this.megjelenit(szurtLista);
    }
  }

  keres(szo) {
    const szurtLista = this.#lista.filter((termek) => {
      if (termek.getNev) {
        return termek.getNev().toLowerCase().includes(szo.toLowerCase());
      }
      return false;
    });
    this.megjelenit(szurtLista);
  }
}