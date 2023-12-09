# CryptoApp 

Este es el servidor backend para CryptoApp, una plataforma de seguimiento de inversiones en criptomonedas.

## Descripción

CryptoApp permite al administrador de cuentas realizar seguimiento inversiones en criptomonedas, visualizar transacciones, y ver el rendimiento de sus carteras.

## Funcionalidades Principales

Crear un usuario: POST /api/users
{
  "username": "nuevo_usuario",
  "email": "correo@example.com",
  "password": "contraseña_segura"
}

Obtener todos los usuarios: GET /api/users
Obtener un usuario por ID: GET /api/users/:userId
Actualizar un usuario por ID: PUT /api/users/:userId
Eliminar un usuario por ID: DELETE /api/users/:userId

Dar x cantidad de dinero. 
PUT http://localhost:3000/api/users/ID_DEL_USUARIO/give-money


Transacciones de Criptomonedas:

Obtener las 10 principales criptomonedas: GET /api/transactions/top
Consultar transacciones de criptomonedas: GET /api/transactions/transactions
Crear una nueva transacción de criptomonedas: POST /api/transactions/transactions
{
  "userId": "6564eeaa2c4644e070ca9586",
  "cryptocurrencyId": "ethereum",
  "totalCost": 10000
}
Venta Criptomoneda Metodo Post: http://localhost:3000/api/transactions/sell
  
{"userId": "6565223cff29a6a2283038a4",
  "cryptocurrencyId": "ethereum",
  "quantitySold": 1
}


Actualizar una transacción de criptomonedas por ID: PUT /api/transactions/transactions/:id


## Tecnologías Utilizadas

- Node.js
- Express.js
- MongoDB
- Mongoose (ODM para MongoDB)
- React




