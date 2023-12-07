// CryptocurrencyController.js

const axios = require('axios');
const CryptocurrencyTransaction = require('../models/CryptocurrencyTransaction');
const User = require('../models/User');

// Función para obtener el precio actual de una criptomoneda
const getCurrentCryptocurrencyPrice = async (cryptocurrencyId) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: cryptocurrencyId,
        vs_currencies: 'usd',
      },
    });

    return response.data[cryptocurrencyId].usd;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener el precio actual de la criptomoneda');
  }
};


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

  res.send('Lista completa de criptomonedas');
};

const createTransaction = async (req, res) => {
  try {
    const { userId, cryptocurrencyId, totalCost } = req.body;

    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
      params: {
        ids: cryptocurrencyId,
        vs_currencies: 'usd',
      },
    });

    const cryptocurrencyPrice = response.data[cryptocurrencyId].usd;

    
    const totalPrice = totalCost;
    if (user.balance < totalPrice) {
      return res.status(400).json({ error: 'Saldo insuficiente', totalPrice, userBalance: user.balance });
    }

   
    const quantity = totalCost / cryptocurrencyPrice;

    
    const transaction = await CryptocurrencyTransaction.create({
      userId,
      cryptocurrencyId,
      quantity, 
      totalCost,
    });

    
    await User.findByIdAndUpdate(userId, { $inc: { balance: -totalPrice } }, { new: true });

    res.json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al realizar la transacción de criptomonedas', detailedError: error.message });
  }
};

const sellCryptocurrency = async (req, res) => {
  try {
    const { userId, cryptocurrencyId, quantitySold } = req.body;

    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

   
    const transaction = await CryptocurrencyTransaction.findOne({
      userId,
      cryptocurrencyId,
    });

    if (!transaction || transaction.quantity < quantitySold) {
      return res.status(400).json({ error: 'Cantidad insuficiente de criptomoneda para vender' });
    }

    
    const cryptocurrencyPrice = await getCurrentCryptocurrencyPrice(cryptocurrencyId);

    
    const soldValue = quantitySold * cryptocurrencyPrice;

    
    const remainingCryptocurrencyQuantity = transaction.quantity - quantitySold;

    
    const updatedTotalInvestment = user.TotalInvestment - soldValue;

    const updatedBalance = user.balance + soldValue;

    
    const updatedTransaction = await CryptocurrencyTransaction.findByIdAndUpdate(
      transaction._id,
      { quantity: remainingCryptocurrencyQuantity },
      { new: true }
    );

    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        TotalInvestment: updatedTotalInvestment,
        balance: updatedBalance,
      },
      { new: true }
    );

    res.json({
      user: updatedUser,
      transaction: updatedTransaction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al realizar la venta de criptomonedas', detailedError: error.message });
  }
};

const updateTransaction = async (req, res) => {
 
  res.send(`Transacción de criptomonedas actualizada - ID: ${req.params.id}`);
};

const deleteTransaction = async (req, res) => {
 
  res.send(`Transacción de criptomonedas eliminada - ID: ${req.params.id}`);
};

module.exports = {
  getTopCryptocurrencies,
  getCryptocurrencies,
  createTransaction,
  sellCryptocurrency,
  updateTransaction,
  deleteTransaction,
};
