import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaIndustry, FaShoppingCart, FaMoneyBillWave } from 'react-icons/fa';

const API = process.env.REACT_APP_API_URL;

export default function FormulaireSaisie({ onMaj }) {
  const [production, setProduction] = useState('');
  const [ventes, setVentes] = useState('');
  const [depenses, setDepenses] = useState('');
  const [depenseDuJour, setDepenseDuJour] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`${API}/jour/dujour`)
      .then(res => setDepenseDuJour(res.data.depenses ?? 0));
  }, [message, onMaj]);

  const handleProduction = () => {
    axios.post(`${API}/jour/dujour`, { production: Number(production) })
      .then(() => { setMessage('Production enregistrée !'); onMaj(); setProduction(''); });
  };

  const handleVentes = () => {
    axios.post(`${API}/jour/dujour`, { ventes: Number(ventes) })
      .then(() => { setMessage('Ventes enregistrées !'); onMaj(); setVentes(''); });
  };

  const handleDepenses = () => {
    axios.post(`${API}/jour/dujour`, { depenses: Number(depenses) })
      .then(() => { setMessage('Dépenses enregistrées !'); onMaj(); setDepenses(''); });
  };

  return (
    <div className="card">
      <h2 className="saisie-title">Saisie du jour</h2>
      <div style={{display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center'}}>
        <div>
          <FaIndustry color="#0288d1" style={{marginRight: 8}} size={25}/>
          <input type="number" placeholder="Production du jour" value={production} onChange={e => setProduction(e.target.value)} />
          <button onClick={handleProduction} style={{marginLeft: 8}}>Ajouter</button>
        </div>
        <div>
          <FaShoppingCart color="#0288d1" style={{marginRight: 8}} size={25}/>
          <input type="number" placeholder="Ventes du jour" value={ventes} onChange={e => setVentes(e.target.value)} />
          <button onClick={handleVentes} style={{marginLeft: 8}}>Ajouter</button>
        </div>
        <div>
          <FaMoneyBillWave color="#0288d1" style={{marginRight: 8}} size={25}/>
          <input type="number" placeholder="Dépenses du jour" value={depenses} onChange={e => setDepenses(e.target.value)} />
          <button onClick={handleDepenses} style={{marginLeft: 8}}>Ajouter</button>
        </div>
        <div style={{marginTop: 8, color: "#333"}}>
        </div>
        <div style={{color: "green", minHeight: 24}}>{message}</div>
      </div>
    </div>
  );
}