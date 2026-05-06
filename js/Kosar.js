import { KosarElem } from "./KosarElem.js";

export class Kosar {
    #lista = [];
    #szuloElem;

    constructor(szuloElem) {
        this.#szuloElem = szuloElem;
        this.#esemenyFigyeles();
    }

    #esemenyFigyeles() {
        window.addEventListener("novelEsemeny", (event) => {
            const id = event.detail;
            const elem = this.#lista.find(el => el.getTermekId() === id);
            if (elem) {
                elem.novel();
                this.megjelenit();
            }
        });

        window.addEventListener("csokkenEsemeny", (event) => {
            const id = event.detail;
            const elem = this.#lista.find(el => el.getTermekId() === id);
            if (elem) {
                elem.csokken();
                this.megjelenit();
            }
        });

        window.addEventListener("torlesEsemeny", (event) => {
            const id = event.detail;
            // Kiszűrjük a törlendő elemet a listából
            this.#lista = this.#lista.filter(el => el.getTermekId() !== id);
            this.megjelenit();
        });
    }

    hozzaad(termekAdat) {
        const letezoElem = this.#lista.find(elem => elem.getTermekId() === termekAdat.id);

        if (letezoElem) {
            letezoElem.novel();
        } else {
            const ujElem = new KosarElem(termekAdat, this.#szuloElem);
            this.#lista.push(ujElem);
        }
    }

    megjelenit() {
        this.#szuloElem.innerHTML = "<h1>Kosár</h1>";
        if (this.#lista.length === 0) {
            this.#szuloElem.innerHTML += "<p>A kosár üres.</p>";
        } else {
            this.#lista.forEach(elem => {
                elem.megjelenit();
            });
            
            const vegosszeg = this.getOsszeg();
            this.#szuloElem.insertAdjacentHTML("beforeend", `
                <div class="osszesito">
                    <h3>Összesen: ${vegosszeg} Ft</h3>
                </div>
            `);
        }
    }

    getOsszeg() {
        let sum = 0;
        this.#lista.forEach(elem => {
            sum += elem.getAr();
        });
        return sum;
    }
}