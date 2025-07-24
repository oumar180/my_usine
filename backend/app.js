const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Autorise toutes les origines (pour démo sur Vercel/Netlify)
app.use(cors());

app.use(bodyParser.json());

// Connexion à MongoDB Atlas
mongoose.connect(
  'mongodb+srv://omr180:azerty1973@cluster0.uqeipxe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use('/api/jour', require('./routes/jour'));
app.use('/api/parametres', require('./routes/parametres'));

// Pour Vercel, utilise le port fourni par la plateforme ou 5000 en local
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur backend sur le port ${PORT}`));