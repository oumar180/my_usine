const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors({
    origin: 'http://localhost:3000' // Autoriser les requêtes depuis le frontend
}));
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/usine_mouna', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/jour', require('./routes/jour'));
app.use('/api/parametres', require('./routes/parametres'));

app.listen(5000, () => console.log('Serveur backend sur http://localhost:5000')); 