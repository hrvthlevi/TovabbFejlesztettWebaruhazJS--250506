const express = require("express");
const router = express.Router();
const TermekController = require("../controllers/TermekController");

router.get("/", TermekController.getAll);
router.post("/", TermekController.create);
router.get("/:id", TermekController.getById);
router.delete("/:id", TermekController.delete);

module.exports = router;