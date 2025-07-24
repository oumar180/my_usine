# Application de Gestion de Production et Ventes - Usine Mouna

## Description
Application locale pour gérer la production, les ventes et le stock d'une usine d'eau. Interface simple, thème "eau", mono-utilisateur, 100% français.

## Structure
- `backend/` : API Express + MongoDB
- `frontend/` : Application React

## Lancement rapide
1. **Backend**
   - Installer [MongoDB](https://www.mongodb.com/try/download/community) et le lancer en local
   - Ouvrir un terminal dans `backend/` puis :
     ```bash
     npm install
     node app.js
     ```
2. **Frontend**
   - Ouvrir un terminal dans `frontend/` puis :
     ```bash
     npm install
     npm start
     ```

## Utilisation
- Saisie de la production et des ventes chaque jour
- Calcul automatique du stock, invendus, chiffre d'affaires
- Historique et export CSV

## Auteur
Maïmouna Camara 