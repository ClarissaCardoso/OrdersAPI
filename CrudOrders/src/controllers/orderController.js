const service = require("../services/orderService");

function getErrorStatus(error) {
    const msg = error?.message || "";
    if (msg.includes("not found") || msg.includes("Order not found")) return 404;
    if (msg.includes("required") || msg.includes("must contain") || msg.includes("invalid")) return 400;
    return 500;
}

exports.createOrder = async (req, res) => {
    try {
        const order = await service.createOrder(req.body);
        res.status(201).json(order);
    } catch (error) {
        console.error("Erro ao criar pedido:", error);
        const status = getErrorStatus(error);
        return res.status(status).json({ message: error.message || "Erro ao criar pedido" });
    }
};

exports.getOrder = async (req, res) => {
    try {
        const order = await service.getOrder(req.params.id);
        return res.status(200).json(order);
    } catch (error) {
        console.error(`Erro ao buscar pedido ${req.params.id}:`, error);
        const status = getErrorStatus(error);
        return res.status(status).json({ message: error.message || "Erro ao buscar pedido" });
    }
};

exports.listOrders = async (req, res) => {
    try {
        const orders = await service.listOrders();
        return res.status(200).json(orders);
    } catch (error) {
        console.error("Erro ao listar pedidos:", error);
        return res.status(500).json({ message: "Erro ao listar pedidos" });
    }
};

exports.updateOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await service.updateOrder(id, req.body);
        return res.status(200).json(order);
    } catch (error) {
        console.error(`Erro ao atualizar pedido ${id}:`, error);
        const status = getErrorStatus(error);
        return res.status(status).json({ message: error.message || "Erro ao atualizar pedido" });
    }
};

exports.deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        await service.deleteOrder(id);
        return res.status(200).json({ message: "Pedido excluído com sucesso" });
    } catch (error) {
        console.error(`Erro ao excluir pedido ${id}:`, error);
        const status = getErrorStatus(error);
        return res.status(status).json({ message: error.message || "Erro ao excluir pedido" });
    }
};