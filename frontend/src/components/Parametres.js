import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Parametres() {
  const [stockInitial, setStockInitial] = useState('');
  const [prixSachet, setPrixSachet] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchParams = async () => {
      const { data, error } = await supabase.from('parametres').select('stock_initial,prix_sachet').limit(1);
      if (error) setMessage("Erreur chargement : " + error.message);
      if (data && data.length > 0) {
        setStockInitial(data[0].stock_initial);
        setPrixSachet(data[0].prix_sachet);
      }
    };
    fetchParams();
  }, []);

  const handleSave = async () => {
    const { error } = await supabase.from('parametres').upsert([{ stock_initial: Number(stockInitial), prix_sachet: Number(prixSachet) }]);
    if (error) setMessage("Erreur enregistrement : " + error.message);
    else setMessage('Paramètres enregistrés !');
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