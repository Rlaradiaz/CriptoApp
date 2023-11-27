// CryptocurrencyController.js

const axios = require('axios');
const CryptocurrencyTransaction = require('../models/CryptocurrencyTransaction');
const User = require('../models/User');

const getTopCryptocurrencies = async (req, res) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
        sparkline: false,
      },
    });

    const topCryptocurrencies = response.data;
    res.json(topCryptocurrencies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las principales criptomonedas' });
  }
};

const getCryptocurrencies = async (req, res) => {
  // Implementa la lógica para obtener la lista completa de criptomonedas
  // Puedes consultar la API de CoinGecko u otra fuente de datos
  res.send('Lista completa de criptomonedas');
};

const createTransaction = async (req, res) => {
  try {
    const { userId, cryptocurrencyId, totalCost } = req.body;

    // Verificar si el usuario existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Obtener el precio actual de la criptomoneda
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
      params: {
        ids: cryptocurrencyId,
        vs_currencies: 'usd',
      },
    });

    const cryptocurrencyPrice = response.data[cryptocurrencyId].usd;

    // Verificar si el usuario tiene suficiente saldo
    const totalPrice = totalCost;
    if (user.balance < totalPrice) {
      return res.status(400).json({ error: 'Saldo insuficiente', totalPrice, userBalance: user.balance });
    }

    // Calcular la cantidad basada en el precio actual
    const quantity = totalCost / cryptocurrencyPrice;

    // Crear la transacción
    const transaction = await CryptocurrencyTransaction.create({
      userId,
      cryptocurrencyId,
      quantity, // Se utiliza la cantidad calculada
      totalCost,
    });

    // Actualizar el saldo del usuario
    await User.findByIdAndUpdate(userId, { $inc: { balance: -totalPrice } }, { new: true });

    res.json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al realizar la transacción de criptomonedas', detailedError: error.message });
  }
};

const updateTransaction = async (req, res) => {
  // Implementa la lógica para actualizar una transacción
  res.send(`Transacción de criptomonedas actualizada - ID: ${req.params.id}`);
};

const deleteTransaction = async (req, res) => {
  // Implementa la lógica para eliminar una transacción
  res.send(`Transacción de criptomonedas eliminada - ID: ${req.params.id}`);
};

module.exports = {
  getTopCryptocurrencies,
  getCryptocurrencies,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
