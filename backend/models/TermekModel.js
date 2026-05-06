const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "..", "termekek.json");

const TermekModel = {
    getAllTermek: (callback) => {
        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) return callback(err);
            callback(null, JSON.parse(data));
        });
    },
    getTermekById: (id, callback) => {
        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) return callback(err);
            const termekek = JSON.parse(data);
            const termek = termekek.find(t => t.id == id);
            callback(null, termek);
        });
    },
    deleteTermek: (id, callback) => {
        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) return callback(err);
            let termekek = JSON.parse(data);
            termekek = termekek.filter(t => t.id != id);
            fs.writeFile(filePath, JSON.stringify(termekek, null, 2), (err) => {
                if (err) return callback(err);
                callback(null);
            });
        });
    },
    saveTermek: (ujAdat, callback) => {
        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) return callback(err);
            const termekek = JSON.parse(data);
            const ujId = termekek.length > 0 ? Math.max(...termekek.map(t => t.id)) + 1 : 1;
            ujAdat.id = ujId;
            termekek.push(ujAdat);
            fs.writeFile(filePath, JSON.stringify(termekek, null, 2), (err) => {
                if (err) return callback(err);
                callback(null, ujAdat);
            });
        });
    }
};

module.exports = TermekModel;