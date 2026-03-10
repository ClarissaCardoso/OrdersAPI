const express = require("express");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./auth/authRoutes");
const authenticate = require("./auth/authMiddleware");

const app = express();

app.use(express.json({ limit: "100kb" }));

// rota pública
app.use("/", authRoutes);

// rotas protegidas
app.use("/order", authenticate, orderRoutes);

app.use((err, req, res, next) => {
    console.error("Erro não tratado:", err);
    res.status(500).json({ message: "Erro interno do servidor" });
});

module.exports = app;