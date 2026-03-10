const db = require("../database/connection");

class OrderRepository {

    async create(order) {

        const client = await db.getClient();

        try {

            await client.query("BEGIN");

            await client.query(
                `INSERT INTO orders (orderId, value, creationDate)
                 VALUES ($1, $2, $3)`,
                [
                    order.orderId,
                    order.value,
                    order.creationDate
                ]
            );

            if (order.items.length > 0) {
                const values = order.items
                    .map((_, i) => `($1, $${i * 3 + 2}, $${i * 3 + 3}, $${i * 3 + 4})`)
                    .join(", ");
                const params = order.items.flatMap(item => [
                    item.productId,
                    item.quantity,
                    item.price
                ]);
                await client.query(
                    `INSERT INTO orders_items (orderId, productId, quantity, price) VALUES ${values}`,
                    [order.orderId, ...params]
                );
            }

            await client.query("COMMIT");

            return order;

        } catch (error) {

            await client.query("ROLLBACK");
            throw error;

        } finally {

            client.release();

        }

    }

    async findById(orderId) {

        const orderResult = await db.query(
            `SELECT * FROM orders WHERE orderId = $1`,
            [orderId]
        );

        if (orderResult.rows.length === 0)
            return null;

        const itemsResult = await db.query(
            `SELECT productId, quantity, price
             FROM orders_items
             WHERE orderId = $1`,
            [orderId]
        );

        const order = orderResult.rows[0];

        order.items = itemsResult.rows;

        return order;

    }

    async findAll() {
        const result = await db.query(`SELECT * FROM orders ORDER BY creationDate DESC`);
        const orders = result.rows;

        for (const order of orders) {
            const itemsResult = await db.query(
                `SELECT productId, quantity, price FROM orders_items WHERE orderId = $1`,
                [order.orderid]
            );
            order.items = itemsResult.rows;
        }

        return orders;
    }

    async update(order) {

        const client = await db.getClient();

        try {

            await client.query("BEGIN");

            await client.query(
                `UPDATE orders
                 SET value = $1,
                     creationDate = $2
                 WHERE orderId = $3`,
                [
                    order.value,
                    order.creationDate,
                    order.orderId
                ]
            );

            await client.query(
                `DELETE FROM orders_items WHERE orderId = $1`,
                [order.orderId]
            );

            if (order.items.length > 0) {
                const values = order.items
                    .map((_, i) => `($1, $${i * 3 + 2}, $${i * 3 + 3}, $${i * 3 + 4})`)
                    .join(", ");
                const params = order.items.flatMap(item => [
                    item.productId,
                    item.quantity,
                    item.price
                ]);
                await client.query(
                    `INSERT INTO orders_items (orderId, productId, quantity, price) VALUES ${values}`,
                    [order.orderId, ...params]
                );
            }

            await client.query("COMMIT");

            return order;

        } catch (error) {

            await client.query("ROLLBACK");
            throw error;

        } finally {

            client.release();

        }

    }

    async delete(orderId) {

        const client = await db.getClient();

        try {

            await client.query("BEGIN");

            await client.query(
                `DELETE FROM orders_items
                 WHERE orderId = $1`,
                [orderId]
            );

            await client.query(
                `DELETE FROM orders
                 WHERE orderId = $1`,
                [orderId]
            );

            await client.query("COMMIT");

            return true;

        } catch (error) {

            await client.query("ROLLBACK");
            throw error;

        } finally {

            client.release();

        }

    }
}

module.exports = new OrderRepository();