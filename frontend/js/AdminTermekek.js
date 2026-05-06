import { TermekAdmin } from "./TermekAdmin.js";
import { AdminUrlap } from "./AdminUrlap.js";

export class AdminTermekek {
    #lista;
    #szuloElem;

    constructor(lista, szuloElem) {
        this.#lista = lista;
        this.#szuloElem = szuloElem;
        this.megjelenit();
    }

    megjelenit() {
        this.#szuloElem.innerHTML = `
            <section class="admin-urlap-container"></section>
            <section class="admin-lista-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th><th>Kép</th><th>Név</th><th>Szerző</th><th>Ár</th><th>Műveletek</th>
                        </tr>
                    </thead>
                    <tbody class="admin-tablazat"></tbody>
                </table>
            </section>
        `;
        
        new AdminUrlap(document.querySelector(".admin-urlap-container"));

        const tbody = document.querySelector(".admin-tablazat");
        this.#lista.forEach(adat => {
            new TermekAdmin(adat, tbody);
        });
    }
}