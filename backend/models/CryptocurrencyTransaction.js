const mongoose = require('mongoose');

const cryptocurrencyTransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  cryptocurrencyId: {
    type: String, 
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },

  
  
});

const CryptocurrencyTransaction = mongoose.model('CryptocurrencyTransaction', cryptocurrencyTransactionSchema);

module.exports = CryptocurrencyTransaction;
