const mongoose = require('mongoose');

const ParametresSchema = new mongoose.Schema({
  stock_initial: { type: Number, default: 0 },
  prix_sachet: { type: Number, default: 10 }
});

module.exports = mongoose.model('Parametres', ParametresSchema); 