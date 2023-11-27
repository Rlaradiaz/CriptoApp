const mongoose = require('mongoose');

const cryptocurrencyTransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencia al modelo de usuario
    required: true,
  },
  cryptocurrencyId: {
    type: String, // Puedes ajustar el tipo según tu necesidad
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
  // Otros campos necesarios para tu aplicación
});

const CryptocurrencyTransaction = mongoose.model('CryptocurrencyTransaction', cryptocurrencyTransactionSchema);

module.exports = CryptocurrencyTransaction;
