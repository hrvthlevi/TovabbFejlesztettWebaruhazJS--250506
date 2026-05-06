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

    this.esemenykezelo();
  }
  esemenykezelo() {
    const form = document.getElementById("uj-termek-form");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const adat = {
        nev: document.getElementById("nev").value,
        szerzo: document.getElementById("szerzo").value,
        ar: Number(document.getElementById("ar").value),
        kep: document.getElementById("kep").value,
        kategoria: "",
        leiras: "",
      };

      fetch("http://localhost:3000/api/termekek", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adat),
      })
        .then((res) => res.json())
        .then((valasz) => {
          console.log("Siker:", valasz);
          alert("Termék hozzáadva!");

          form.reset();
        })
        .catch((err) => console.error(err));
    });
  }

  beolvas() {}

  validal() {
    return true;
  }
}
