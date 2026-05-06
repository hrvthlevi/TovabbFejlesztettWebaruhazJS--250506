export class AdminUrlap {
    #szuloElem;

    constructor(szuloElem) {
        this.#szuloElem = szuloElem;
        this.megjelenit();
    }

    megjelenit() {
        this.#szuloElem.innerHTML = `
            <h3>Új termék hozzáadása</h3>
            <form id="uj-termek-form">
                <input type="text" id="nev" placeholder="Név" required>
                <input type="text" id="szerzo" placeholder="Szerző">
                <input type="number" id="ar" placeholder="Ár" required>
                <input type="text" id="kep" placeholder="Kép URL">
                <button type="submit">Mentés</button>
            </form>
        `;
    }

    beolvas() {
    }

    validal() {
        return true;
    }
}