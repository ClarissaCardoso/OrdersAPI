CREATE TABLE orders (
    orderId VARCHAR(50) PRIMARY KEY,
    value NUMERIC(10,2),
    creationDate TIMESTAMP
);

CREATE INDEX idx_orders_creation_date ON orders(creationdate);

CREATE TABLE orders_items (
    id SERIAL PRIMARY KEY,
    orderId VARCHAR(50),
    productId INTEGER,
    quantity INTEGER,
    price NUMERIC(10,2),
    FOREIGN KEY (orderId) REFERENCES orders(orderId) ON DELETE CASCADE
);

CREATE INDEX idx_orders_items_order_id ON orders_items(orderid);