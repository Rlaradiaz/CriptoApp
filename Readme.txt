CryptoApp 

CryptoApp permite al administrador de cuentas realizar seguimiento a las inversiones en criptomonedas, visualizar transacciones, y ver el rendimiento de sus carteras.


Características
Gestión de Usuarios:
Registrar nuevos usuarios.
Ver, editar y eliminar perfiles de usuarios.
Dar dinero a los usuarios con fines de prueba.
Transacciones de Criptomonedas:
Comprar y vender criptomonedas.
Ver historial de transacciones.
Monitorear tenencias de criptomonedas y valor del portafolio.
Principales Criptomonedas:

Explorar las 10 principales criptomonedas con precios en tiempo real.
Interfaz Amigable para el Usuario.

Diseño simple e intuitivo para una experiencia de negociación sin complicaciones.


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
- axios




