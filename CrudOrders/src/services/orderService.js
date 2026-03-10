const repository = require("../repositories/orderRepository");
const Order = require("../models/orderModel");
const OrderItem = require("../models/orderItemModel");

class OrderService {

    async createOrder(data) {

        if (!data)
            throw new Error("Request body is required");

        if (!data.items || !Array.isArray(data.items) || data.items.length === 0)
            throw new Error("Order must contain items");

        const items = data.items.map(i => {
            const qty = Number(i.quantidadeItem);
            const price = Number(i.valorItem);
            if (!Number.isFinite(qty) || qty < 0 || !Number.isFinite(price) || price < 0)
                throw new Error("Invalid quantity or price for item");
            return new OrderItem(i.idItem, qty, price);
        });

        const order = new Order(
            data.numeroPedido,
            data.valorTotal,
            new Date(data.dataCriacao),
            items
        );

        return repository.create(order);
    }

    async getOrder(orderId) {

        if (!orderId)
            throw new Error("orderId is required");

        const order = await repository.findById(orderId);

        if (!order)
            throw new Error("Order not found");

        return order;
    }

    async listOrders() {

        const orders = await repository.findAll();

        return orders;
    }

    async updateOrder(orderId, data) {

        if (!orderId)
            throw new Error("orderId is required");

        const existingOrder = await repository.findById(orderId);

        if (!existingOrder)
            throw new Error("Order not found");

        if (!data.items || !Array.isArray(data.items) || data.items.length === 0)
            throw new Error("Order must contain items");

        const items = data.items.map(item => {
            const qty = Number(item.quantidadeItem);
            const price = Number(item.valorItem);
            if (!Number.isFinite(qty) || qty < 0 || !Number.isFinite(price) || price < 0)
                throw new Error("Invalid quantity or price for item");
            return {
                productId: item.idItem,
                quantity: qty,
                price
            };
        });

        const order = {
            orderId,
            value: data.valorTotal,
            creationDate: new Date(data.dataCriacao),
            items
        };

        return await repository.update(order);
    }

    async deleteOrder(orderId) {

        if (!orderId)
            throw new Error("orderId is required");

        const existingOrder = await repository.findById(orderId);

        if (!existingOrder)
            throw new Error("Order not found");

        await repository.delete(orderId);

        return {
            message: "Order deleted successfully"
        };
    }

}

module.exports = new OrderService();

