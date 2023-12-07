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

    
    const transactions = await CryptocurrencyTransaction.find({ userId: user._id });

    const cryptoHoldings = {};

    for (const transaction of transactions) {
      if (!cryptoHoldings[transaction.cryptocurrencyId]) {
        cryptoHoldings[transaction.cryptocurrencyId] = 0;
      }
      cryptoHoldings[transaction.cryptocurrencyId] += transaction.quantity;
    }

    
    const cryptoHoldingsValue = {};
    for (const cryptocurrencyId of Object.keys(cryptoHoldings)) {
      const cryptocurrencyPrice = await getCurrentCryptocurrencyPrice(cryptocurrencyId);

      
      if (cryptocurrencyPrice === 0) {
        console.warn(`El precio de ${cryptocurrencyId} es 0. Se omite del cálculo.`);
        continue;
      }

      cryptoHoldingsValue[cryptocurrencyId] = cryptoHoldings[cryptocurrencyId] * cryptocurrencyPrice;
    }

    
    const efectivo = user.balance;

    
    const valorPortafolio = efectivo + Object.values(cryptoHoldingsValue).reduce((total, value) => total + value, 0);

    
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
    
    const users = await User.find();

    
    const usersWithTransactions = await Promise.all(
      users.map(async (user) => {
        
        const transactions = await CryptocurrencyTransaction.find({ userId: user._id });

        
        const TotalInvestment = await calculateTotalValueUSD(transactions);

        
        const TotalBalance = user.balance + TotalInvestment; 

        
        return {
          _id: user._id,
          username: user.username,
          email: user.email,
          password: user.password,
          balance: user.balance,
          transactions: transactions,
          TotalInvestment,
          TotalBalance, 
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


const calculateTotalValueUSD = async (transactions) => {
  const totalValueUSD = await Promise.all(
    transactions.map(async (transaction) => {
      
      const cryptocurrencyPrice = await getCurrentCryptocurrencyPrice(transaction.cryptocurrencyId);

      const currentValue = transaction.quantity * cryptocurrencyPrice;
      return currentValue;
    })
  );

  return totalValueUSD.reduce((total, currentValue) => total + currentValue, 0);
};

const getCurrentCryptocurrencyPrice = async (cryptocurrencyId) => {
  try {
    
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
    return 0; 
  }
};


module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
  giveMoneyToUser,
  
};
