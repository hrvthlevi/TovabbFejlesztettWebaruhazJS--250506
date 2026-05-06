export class KosarElem {
    #termekAdat;
    #db;
    #szuloElem;

    constructor(adat, szuloElem) {
        this.#termekAdat = adat;
        this.#db = 1;
        this.#szuloElem = szuloElem;
    }

    getTermekId() { return this.#termekAdat.id; }
    getAr() { return this.#termekAdat.ar * this.#db; }
    novel() { this.#db++; }
    csokken() { if (this.#db > 1) this.#db--; }

megjelenit() {
    const html = `
        <div class="kosar-elem">
            <div class="kosar-info">
                <span><strong>${this.#termekAdat.nev}</strong></span>
                <span>${this.getAr()} Ft</span>
            </div>
            <div class="kosar-vezerlok">
                <button class="csokken-btn">-</button>
                <span class="db">${this.#db} db</span>
                <button class="novel-btn">+</button>
                <button class="torol-btn">Törlés</button>
            </div>
        </div>
    `;
    this.#szuloElem.insertAdjacentHTML("beforeend", html);
    this.#esemenykezelok();
}

#esemenykezelok() {
    const elem = this.#szuloElem.lastElementChild;

    elem.querySelector(".novel-btn").addEventListener("click", () => {
        this.#sajatEsemeny("novelEsemeny");
    });

    elem.querySelector(".csokken-btn").addEventListener("click", () => {
        this.#sajatEsemeny("csokkenEsemeny");
    });

    elem.querySelector(".torol-btn").addEventListener("click", () => {
        this.#sajatEsemeny("torlesEsemeny");
    });
}

#sajatEsemeny(nev) {
    const ev = new CustomEvent(nev, { detail: this.#termekAdat.id });
    window.dispatchEvent(ev);
}
}