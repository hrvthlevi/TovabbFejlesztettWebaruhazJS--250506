export class AdatService {
    async get(url) {
        try {
            const valasz = await fetch(url);
            if (!valasz.ok) throw new Error("Hiba a letöltésnél");
            return await valasz.json();
        } catch (hiba) {
            console.error("Service hiba:", hiba);
            throw hiba;
        }
    }

    async post(url, adat) {
        try {
            const valasz = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(adat)
            });
            return await valasz.json();
        } catch (hiba) {
            console.error("Service hiba:", hiba);
        }
    }

    async delete(url, id) {
        try {
            const valasz = await fetch(`${url}/${id}`, {
                method: "DELETE"
            });
            return await valasz.json();
        } catch (hiba) {
            console.error("Service hiba:", hiba);
        }
    }
}