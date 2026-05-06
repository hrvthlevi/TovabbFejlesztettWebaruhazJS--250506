const TermekModel = require("../models/TermekModel");

const TermekController = {
    getAll: (req, res) => {
        TermekModel.getAllTermek((err, data) => {
            if (err) return res.status(500).json({ message: "Hiba olvasáskor" });
            res.json(data);
        });
    },
    getById: (req, res) => {
        TermekModel.getTermekById(req.params.id, (err, data) => {
            if (err) return res.status(500).json({ message: "Hiba" });
            if (!data) return res.status(404).json({ message: "Nincs ilyen termék" });
            res.json(data);
        });
    },
    delete: (req, res) => {
        TermekModel.deleteTermek(req.params.id, (err) => {
            if (err) return res.status(500).json({ message: "Hiba törléskor" });
            res.json({ message: "Sikeres törlés" });
        });
    }
};

module.exports = TermekController;