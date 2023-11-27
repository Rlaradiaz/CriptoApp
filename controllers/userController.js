const axios = require('axios');
const User = require('../models/User');
const CryptocurrencyTransaction = require('../models/CryptocurrencyTransaction');

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Obtener transacciones del usuario
    const transactions = await CryptocurrencyTransaction.find({ userId: user._id });

    // Calcular el valor actual en USD de las transacciones
    const TotalInvestment = await calculateTotalValueUSD(transactions);

    // Calcular el total del balance en USD considerando si es ganancia o pérdida
    const TotalBalance = user.balance + TotalInvestment; // Cambiado de resta a suma

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      balance: user.balance,
      transactions: transactions,
      TotalInvest,
      TotalBalance, // Cambiado de resta a suma
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    // Obtener todos los usuarios
    const users = await User.find();

    // Obtener las transacciones para cada usuario
    const usersWithTransactions = await Promise.all(
      users.map(async (user) => {
        // Obtener transacciones del usuario
        const transactions = await CryptocurrencyTransaction.find({ userId: user._id });

        // Calcular el valor actual en USD de las transacciones
        const TotalInvestment = await calculateTotalValueUSD(transactions);

        // Calcular el total del balance en USD considerando si es ganancia o pérdida
        const TotalBalance = user.balance + TotalInvestment; // Cambiado de resta a suma

        // Devolver el usuario con las transacciones, el valor actual y el total del balance
        return {
          _id: user._id,
          username: user.username,
          email: user.email,
          password: user.password,
          balance: user.balance,
          transactions: transactions,
          TotalInvestment,
          TotalBalance, // Cambiado de resta a suma
        };
      })
    );

    res.json(usersWithTransactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const giveMoneyToUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndUpdate(userId, { balance: 50000 }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper function to calculate total value in USD for transactions
const calculateTotalValueUSD = async (transactions) => {
  const totalValueUSD = await Promise.all(
    transactions.map(async (transaction) => {
      // Obtener el precio actual de la criptomoneda
      const cryptocurrencyPrice = await getCurrentCryptocurrencyPrice(transaction.cryptocurrencyId);

      // Calcular el valor actual de la transacción
      const currentValue = transaction.quantity * cryptocurrencyPrice;
      return currentValue;
    })
  );

  return totalValueUSD.reduce((total, currentValue) => total + currentValue, 0);
};

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
    return 0; // Manejar el error según tus necesidades
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
  giveMoneyToUser,
  // Agrega otras funciones según tus necesidades
};
