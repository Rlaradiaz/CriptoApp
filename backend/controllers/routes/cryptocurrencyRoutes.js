// cryptocurrencyRoutes.js

const express = require('express');
const router = express.Router();
const cryptocurrencyController = require('../CryptocurrencyController');

// Endpoint para obtener las 10 principales criptomonedas desde la API de CoinGecko
router.get('/top', cryptocurrencyController.getTopCryptocurrencies);

// Endpoint para obtener la lista de criptomonedas
router.get('/', cryptocurrencyController.getCryptocurrencies);

// Endpoint para consultar transacciones de criptomonedas
router.get('/transactions', (req, res) => {
  // Implementa la lógica para obtener las transacciones de criptomonedas
  res.send('Consulta de transacciones de criptomonedas');
});

// Endpoint para crear una nueva transacción de criptomonedas
router.post('/transactions', cryptocurrencyController.createTransaction);

// Endpoint para vender criptomonedas
router.post('/sell', cryptocurrencyController.sellCryptocurrency);

// Endpoint para actualizar una transacción de criptomonedas
router.put('/transactions/:id', cryptocurrencyController.updateTransaction);

// Endpoint para eliminar una transacción de criptomonedas
router.delete('/transactions/:id', cryptocurrencyController.deleteTransaction);



module.exports = router;
