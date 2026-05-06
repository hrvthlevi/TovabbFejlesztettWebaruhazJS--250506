export const USERS = [
    { email: "admin@kucko.hu", jelszo: "admin123", role: "admin", pontok: 0 },
    { email: "user@kucko.hu", jelszo: "user123", role: "user", pontok: 12 }
];

export function hitelesites(email, jelszo) {
    return USERS.find(user => user.email === email && user.jelszo === jelszo);
}