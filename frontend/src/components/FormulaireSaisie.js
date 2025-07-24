import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { FaIndustry, FaShoppingCart, FaMoneyBillWave } from 'react-icons/fa';

export default function FormulaireSaisie({ onMaj }) {
  const [production, setProduction] = useState('');
  const [ventes, setVentes] = useState('');
  const [depenses, setDepenses] = useState('');
  const [message, setMessage] = useState('');

  const today = new Date().toISOString().slice(0, 10);

  const updateJour = async (fields) => {
    // Récupère les paramètres
    const { data: params, error: paramsError } = await supabase.from('parametres').select('stock_initial,prix_sachet').limit(1);
    if (paramsError) return setMessage("Erreur paramètres : " + paramsError.message);
    if (!params || params.length === 0) return setMessage("Paramètres manquants !");
    // Récupère le jour
    let { data: jours, error: joursError } = await supabase.from('jour').select('*').eq('date', today).limit(1);
    if (joursError) return setMessage("Erreur jour : " + joursError.message);
    let jour = jours && jours.length > 0 ? jours[0] : null;
    let base = jour || { date: today, stock: params[0].stock_initial, production: 0, ventes: 0, depenses: 0 };

    // Met à jour les champs
    const productionVal = fields.production !== undefined ? fields.production : base.production ?? 0;
    const ventesVal = fields.ventes !== undefined ? fields.ventes : base.ventes ?? 0;
    const depensesVal = fields.depenses !== undefined ? fields.depenses : base.depenses ?? 0;
    const invendus = productionVal - ventesVal;
    const chiffre_affaires = ventesVal * (params[0].prix_sachet ?? 0);

    // Calcul du stock
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const { data: prev, error: prevError } = await supabase.from('jour').select('stock').eq('date', yesterday).limit(1);
    if (prevError) return setMessage("Erreur stock précédent : " + prevError.message);
    const stock_prec = prev && prev.length > 0 ? prev[0].stock : params[0].stock_initial;
    const stock = stock_prec + productionVal - ventesVal;

    // Upsert (assure-toi que la colonne "date" est UNIQUE dans Supabase !)
    const { error } = await supabase.from('jour').upsert([{
      date: today,
      production: productionVal,
      ventes: ventesVal,
      depenses: depensesVal,
      invendus,
      chiffre_affaires,
      stock
    }], { onConflict: ['date'] });

    if (error) {
      setMessage("Erreur lors de l'enregistrement : " + error.message);
    } else {
      setMessage('Enregistré !');
      onMaj && onMaj();
    }
  };

  return (
    <div className="card">
      <h2 className="saisie-title">Saisie du jour</h2>
      <div style={{display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center'}}>
        <div>
          <FaIndustry color="#0288d1" style={{marginRight: 8}} size={25}/>
          <input type="number" placeholder="Production du jour" value={production} onChange={e => setProduction(e.target.value)} />
          <button onClick={() => { updateJour({ production: Number(production) }); setProduction(''); }}>Ajouter</button>
        </div>
        <div>
          <FaShoppingCart color="#0288d1" style={{marginRight: 8}} size={25}/>
          <input type="number" placeholder="Ventes du jour" value={ventes} onChange={e => setVentes(e.target.value)} />
          <button onClick={() => { updateJour({ ventes: Number(ventes) }); setVentes(''); }}>Ajouter</button>
        </div>
        <div>
          <FaMoneyBillWave color="#0288d1" style={{marginRight: 8}} size={25}/>
          <input type="number" placeholder="Dépenses du jour" value={depenses} onChange={e => setDepenses(e.target.value)} />
          <button onClick={() => { updateJour({ depenses: Number(depenses) }); setDepenses(''); }}>Ajouter</button>
        </div>
        <div style={{color: "green", minHeight: 24}}>{message}</div>
      </div>
    </div>
  );
}