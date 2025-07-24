import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Parametres() {
  const [stockInitial, setStockInitial] = useState('');
  const [prixSachet, setPrixSachet] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/parametres').then(res => {
      setStockInitial(res.data.stock_initial);
      setPrixSachet(res.data.prix_sachet);
    });
  }, []);

  const handleSave = () => {
    axios.post('http://localhost:5000/api/parametres', {
      stock_initial: Number(stockInitial),
      prix_sachet: Number(prixSachet)
    }).then(() => setMessage('Paramètres enregistrés !'));
  };

  return (
    <div className="card">
      <h2 className="parametres-title">Paramètres</h2>
      <div style={{display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center'}}>
        <div>
          <label style={{marginRight: 8}}>Stock initial :</label>
          <input type="number" value={stockInitial} onChange={e => setStockInitial(e.target.value)} />
        </div>
        <div>
          <label style={{marginRight: 8}}>Prix d’un sachet :</label>
          <input type="number" value={prixSachet} onChange={e => setPrixSachet(e.target.value)} />
        </div>
        <button onClick={handleSave}>Enregistrer</button>
        <div style={{color: "green", minHeight: 24}}>{message}</div>
      </div>
    </div>
  );
} 