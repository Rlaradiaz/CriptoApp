const axios = require('axios');
const User = require('../models/User');
const CryptocurrencyTransaction = require('../models/CryptocurrencyTransaction');
let cryptoPricesCache = {};

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

    // Obtener la cantidad real de cada criptomoneda que posee el usuario
    const cryptoHoldings = {};

    for (const transaction of transactions) {
      if (!cryptoHoldings[transaction.cryptocurrencyId]) {
        cryptoHoldings[transaction.cryptocurrencyId] = 0;
      }
      cryptoHoldings[transaction.cryptocurrencyId] += transaction.quantity;
    }

    // Calcular el valor actual en USD de las criptomonedas que posee el usuario
    const cryptoHoldingsValue = {};
    for (const cryptocurrencyId of Object.keys(cryptoHoldings)) {
      const cryptocurrencyPrice = await getCurrentCryptocurrencyPrice(cryptocurrencyId);

      // Asegúrate de manejar el caso donde cryptocurrencyPrice es 0
      if (cryptocurrencyPrice === 0) {
        console.warn(`El precio de ${cryptocurrencyId} es 0. Se omite del cálculo.`);
        continue;
      }

      cryptoHoldingsValue[cryptocurrencyId] = cryptoHoldings[cryptocurrencyId] * cryptocurrencyPrice;
    }

    // Cambiar la etiqueta "balance" por "efectivo"
    const efectivo = user.balance;

    // Agregar un campo "valorPortafolio" que suma el efectivo y el valor en dólares de las criptomonedas
    const valorPortafolio = efectivo + Object.values(cryptoHoldingsValue).reduce((total, value) => total + value, 0);

    // Imprime en la consola el valor del portafolio para depuración
    console.log(`Valor del portafolio para el usuario ${userId}: ${valorPortafolio}`);

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      efectivo,
      cryptoHoldings,
      cryptoHoldingsValue,
      valorPortafolio,
      transacciones: transactions,
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
    // Agregar un retraso de 1 segundo entre las solicitudes
    await new Promise(resolve => setTimeout(resolve, 1000));

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
