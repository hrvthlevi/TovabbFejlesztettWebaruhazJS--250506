export class AdatService {
    #BASE_URL = "http://localhost:3000"; 

    async get(vegpont) {
        try {
            const valasz = await fetch(this.#BASE_URL + vegpont);
            if (!valasz.ok) throw new Error(`Hiba a letöltésnél: ${valasz.status}`);
            return await valasz.json();
        } catch (hiba) {
            console.error("Service hiba (GET):", hiba);
            throw hiba;
        }
    }

    async post(vegpont, adat) {
        try {
            const valasz = await fetch(this.#BASE_URL + vegpont, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(adat)
            });

            if (!valasz.ok) {
                const hibaSzoveg = await valasz.text();
                console.error("Szerver hibaüzenete:", hibaSzoveg);
                throw new Error(`Szerver hiba: ${valasz.status}`);
            }

            return await valasz.json();
        } catch (hiba) {
            console.error("Service hiba (POST):", hiba);
            throw hiba; 
        }
    }

    async delete(vegpont, id) {
        try {
            const valasz = await fetch(`${this.#BASE_URL}${vegpont}/${id}`, {
                method: "DELETE"
            });

            if (!valasz.ok) throw new Error(`Hiba a törlésnél: ${valasz.status}`);

            if (valasz.status === 204) return { success: true }; 
            return await valasz.json();
        } catch (hiba) {
            console.error("Service hiba (DELETE):", hiba);
            throw hiba;
        }
    }
}