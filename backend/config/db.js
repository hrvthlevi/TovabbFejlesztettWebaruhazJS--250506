const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "webshop"
});

connection.connect((err) => {
    if (err) {
        console.error("Hiba a csatlakozáskor:", err);
    } else {
        console.log("Sikeres adatbázis kapcsolat!");
    }
});

module.exports = connection;
require("dotenv").config();