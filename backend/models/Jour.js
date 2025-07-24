const mongoose = require('mongoose');

const JourSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true },
  production: { type: Number, default: 0 },
  ventes: { type: Number, default: 0 },
  invendus: { type: Number, default: 0 },
  chiffre_affaires: { type: Number, default: 0 },
  stock: { type: Number, default: 0 }, 
  depenses: { type: Number, default: 0 }
});

module.exports = mongoose.model('Jour', JourSchema);