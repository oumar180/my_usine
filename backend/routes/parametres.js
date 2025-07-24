const express = require('express');
const router = express.Router();
const Parametres = require('../models/Parametres');

// GET paramètres
router.get('/', async (req, res) => {
  try {
    let params = await Parametres.findOne();
    if (!params) {
      params = new Parametres();
      await params.save();
    }
    res.json(params);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération des paramètres." });
  }
});

// POST paramètres
router.post('/', async (req, res) => {
  try {
    let params = await Parametres.findOne();
    if (!params) params = new Parametres();
    if (req.body.stock_initial !== undefined) params.stock_initial = req.body.stock_initial;
    if (req.body.prix_sachet !== undefined) params.prix_sachet = req.body.prix_sachet;
    await params.save();
    res.json(params);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la sauvegarde des paramètres." });
  }
});

module.exports = router;