import { Termekek } from "./Termekek.js";
import { Kosar } from "./Kosar.js";
import { AdminTermekek } from "./admin/AdminTermekek.js";
import { AdatService } from "./AdatService.js";

export class Webshop {
    #termekek;
    #kosar;
    #adatService;
    #adatLista = [];

    constructor() {
        this.szuloElem = document.querySelector("#main-content");
        this.#adatService = new AdatService();
        this.#kosar = new Kosar(this.szuloElem);
        this.init();
    }

    async adatBetoltes() {
        this.#adatLista = await this.#adatService.get("/api/termekek");
    }

    async init() {
        await this.adatBetoltes();
        this.#termekek = new Termekek(this.#adatLista, this.szuloElem);
        this.esemenyFigyeles();
        this.kosarbaEsemenyFigyeles();
    }

    kosarbaEsemenyFigyeles() {
        window.addEventListener("kosarba", (event) => {
            const termekId = event.detail;
            const kivalasztott = this.#adatLista.find((t) => t.id === termekId);
            this.#kosar.hozzaad(kivalasztott);
        });
    }

    esemenyFigyeles() {
        const gombok = document.querySelectorAll("nav button");
        gombok.forEach((gomb) => {
            gomb.addEventListener("click", () => {
                const tipus = gomb.getAttribute("data-view");
                this.nezetValtas(tipus);
            });
        });
    }

    async nezetValtas(tipus) {
        this.szuloElem.innerHTML = "";
        if (tipus === "shop") {
            await this.adatBetoltes();
            this.#termekek = new Termekek(this.#adatLista, this.szuloElem);
            this.#termekek.megjelenit();
        } else if (tipus === "kosar") {
            this.#kosar.megjelenit();
        } else if (tipus === "admin") {
            await this.adatBetoltes();
            new AdminTermekek(this.#adatLista, this.szuloElem);
        }
    }
}