const express = require('express');
const router = express.Router();
const Jour = require('../models/Jour');
const Parametres = require('../models/Parametres');
const PDFDocument = require('pdfkit');

// GET du jour
router.get('/dujour', async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  const params = await Parametres.findOne();
  if (!params) {
    return res.status(500).json({ error: "Aucun paramètre trouvé. Veuillez réinitialiser ou créer les paramètres." });
  }
  
  let jour = await Jour.findOneAndUpdate(
    { date: today },
    { $setOnInsert: { stock: params.stock_initial, date: today } },
    { new: true, upsert: true }
  );
  res.json(jour);
});

// POST production/ventes/depenses du jour
router.post('/dujour', async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  const params = await Parametres.findOne();
  if (!params) {
    return res.status(500).json({ error: "Aucun paramètre trouvé. Veuillez réinitialiser ou créer les paramètres." });
  }

  // Utilise upsert pour éviter les doublons
  let jour = await Jour.findOneAndUpdate(
    { date: today },
    { $setOnInsert: { stock: params.stock_initial, date: today } },
    { new: true, upsert: true }
  );

  if (req.body.production !== undefined) jour.production = req.body.production;
  if (req.body.ventes !== undefined) jour.ventes = req.body.ventes;
  if (req.body.depenses !== undefined) jour.depenses = req.body.depenses;

  jour.invendus = (jour.production ?? 0) - (jour.ventes ?? 0);
  jour.chiffre_affaires = (jour.ventes ?? 0) * params.prix_sachet;

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const prev = await Jour.findOne({ date: yesterday });
  const stock_prec = prev ? prev.stock : params.stock_initial;
  jour.stock = stock_prec + (jour.production ?? 0) - (jour.ventes ?? 0);

  await jour.save();
  res.json(jour);
});

// GET historique
router.get('/historique', async (req, res) => {
  const jours = await Jour.find().sort({ date: -1 });
  res.json(jours);
});

// Export PDF
router.get('/export', async (req, res) => {
  const jours = await Jour.find().sort({ date: 1 });

  const doc = new PDFDocument({ margin: 30, size: 'A4' });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=historique.pdf');
  doc.pipe(res);

  // Titre
  doc.fontSize(16).text("Historique de production", { align: 'center' });
  doc.moveDown(1);

  // Définition des colonnes
  const columns = [
    { label: "Date", width: 70 },
    { label: "Production", width: 70 },
    { label: "Ventes", width: 60 },
    { label: "Invendus", width: 60 },
    { label: "Chiffre d'affaires", width: 90 },
    { label: "Stock", width: 60 },
    { label: "Dépenses", width: 60 }
  ];

  // Position de départ
  let y = doc.y + 10;
  let x = 30;

  // Largeur totale du tableau
  const tableWidth = columns.reduce((a, c) => a + c.width, 0);

  // En-tête du tableau (fond gris)
  doc.save()
    .lineWidth(2)
    .rect(x, y, tableWidth, 24)
    .fillAndStroke('#e3f2fd', '#0288d1')
    .restore();
  doc.fillColor('#0288d1').fontSize(10).font('Helvetica-Bold');
  let colX = x;
  columns.forEach(col => {
    doc.text(col.label, colX + 2, y + 6, { width: col.width - 4, align: 'center', ellipsis: true });
    colX += col.width;
  });
  doc.fillColor('black').font('Helvetica');
  y += 24;

  // Lignes du tableau
  jours.forEach(j => {
    let colX = x;
    // Bordure horizontale supérieure
    doc.save().lineWidth(1).moveTo(x, y).lineTo(x + tableWidth, y).stroke().restore();
    [
      j.date,
      j.production ?? 0,
      j.ventes ?? 0,
      j.invendus ?? 0,
      j.chiffre_affaires ?? 0,
      j.stock ?? 0,
      j.depenses ?? 0
    ].forEach((val, idx) => {
      // Bordure verticale de la cellule
      doc.save().lineWidth(1).moveTo(colX, y).lineTo(colX, y + 20).stroke().restore();
      doc.fontSize(10).text(
        String(val),
        colX + 2,
        y + 6,
        { width: columns[idx].width - 4, align: 'center', ellipsis: true }
      );
      colX += columns[idx].width;
    });
    // Dernière bordure verticale droite
    doc.save().lineWidth(1).moveTo(x + tableWidth, y).lineTo(x + tableWidth, y + 20).stroke().restore();
    // Ligne horizontale inférieure
    doc.save().lineWidth(1).moveTo(x, y + 20).lineTo(x + tableWidth, y + 20).stroke().restore();
    y += 20;
    // Saut de page 
    if (y > doc.page.height - 50) {
      doc.addPage();
      y = 40;
    }
  });
  doc.end();
});

// Réinitialisation totale
router.delete('/reset', async (req, res) => {
  try {
    await Jour.deleteMany({});
    await Parametres.deleteMany({});
    await Parametres.create({
      stock_initial: 0,
      prix_sachet: 10
    });
    res.json({ message: 'Toutes les données ont été réinitialisées.' });
  } catch(err) {
    res.status(500).json({ error: 'Erreur lors de la réinitialisation.' });
  }
});

module.exports = router;