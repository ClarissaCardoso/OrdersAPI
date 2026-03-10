const express = require("express");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(express.json({ limit: "100kb" }));

app.use("/order", orderRoutes);

app.use((err, req, res, next) => {
    console.error("Erro não tratado:", err);
    res.status(500).json({ message: "Erro interno do servidor" });
});

module.exports = app;