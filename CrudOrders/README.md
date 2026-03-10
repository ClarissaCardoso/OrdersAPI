# Orders API

API REST para gerenciamento de pedidos com autenticação baseada em **JWT**.

O projeto foi desenvolvido como parte de um desafio técnico backend utilizando **Node.js**, seguindo uma arquitetura em camadas semelhante à utilizada em aplicações corporativas.

---

# Tecnologias Utilizadas

* Node.js
* Express
* PostgreSQL
* JWT (Json Web Token)
* bcryptjs

---

# Arquitetura

A aplicação segue uma separação em camadas:

Controller → Service → Repository → Database

Responsabilidades:

* **Controller** → recebe requisições HTTP
* **Service** → aplica regras de negócio
* **Repository** → acesso ao banco de dados
* **Database** → persistência em PostgreSQL

---

# Estrutura do Projeto

```
src
│
├── auth
│   ├── authController.js
│   ├── authMiddleware.js
│   ├── authRoutes.js
│   └── jwt.js
│
├── controllers
│   └── orderController.js
│
├── services
│   └── orderService.js
│
├── repositories
│   └── orderRepository.js
│
├── routes
│   └── orderRoutes.js
│
├── database
│   └── connection.js
│
└── app.js

server.js
```

---

# Configuração do Banco de Dados

Criar banco no PostgreSQL:

```
CREATE DATABASE ordersdb;
```

Criar as tabelas:

```
CREATE TABLE orders (
    orderId VARCHAR(50) PRIMARY KEY,
    value NUMERIC(10,2),
    creationDate TIMESTAMP
);

CREATE TABLE orders_items (
    id SERIAL PRIMARY KEY,
    orderId VARCHAR(50),
    productId INTEGER,
    quantity INTEGER,
    price NUMERIC(10,2),
    FOREIGN KEY (orderId) REFERENCES orders(orderId)
);
```

---

# Instalação

Clone o repositório:

```
git clone https://github.com/ClarissaCardoso/CrudOrders.git
```

Acesse o diretório do projeto:

```
cd CrudOrders
```

Instale as dependências:

```
npm install
```

---

# Executar Aplicação

```
node server.js
```

Servidor iniciará em:

```
http://localhost:3000
```

---

# Autenticação

A API utiliza **JWT (Json Web Token)**.

Primeiro é necessário realizar login para obter o token.

---

# Login

POST

```
/login
```

Body:

```
{
  "username": "admin",
  "password": "123456"
}
```

Resposta:

```
{
  "token": "JWT_TOKEN"
}
```

---

# Uso do Token

Nas rotas protegidas enviar no header:

```
Authorization: Bearer JWT_TOKEN
```

---

# Endpoints

## Criar Pedido

POST

```
/order
```

Body:

```
{
  "numeroPedido": "1001",
  "dataCriacao": "2026-03-09",
  "valorTotal": 200,
  "items": [
    {
      "idItem": 1,
      "quantidadeItem": 2,
      "valorItem": 50
    }
  ]
}
```

---

## Listar Pedidos

GET

```
/order/list
```

---

## Buscar Pedido por ID

GET

```
/order/{id}
```

---

## Atualizar Pedido

PUT

```
/order/{id}
```

---

## Excluir Pedido

DELETE

```
/order/{id}
```

---

# Segurança

* Autenticação via JWT
* Senhas protegidas com bcrypt
* Middleware de autenticação nas rotas de pedidos

---

# Autor

Clarissa Abreu
