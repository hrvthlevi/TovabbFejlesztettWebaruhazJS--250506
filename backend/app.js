const express = require("express");
const path = require("path");
const cors = require("cors");
const termekRoutes = require("./routes/termekRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend")));

app.use("/api/termekek", termekRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(3000, () => {
    console.log("Szerver fut a 3000-es porton");
});