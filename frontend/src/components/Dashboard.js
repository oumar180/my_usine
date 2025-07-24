import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { FaIndustry, FaShoppingCart, FaWater, FaEuroSign, FaBoxOpen, FaMoneyBillWave, FaCalculator } from 'react-icons/fa';

export default function Dashboard() {
  const [jour, setJour] = useState(null);

  useEffect(() => {
    const fetchJour = async () => {
      const today = new Date().toISOString().slice(0, 10);
      let { data, error } = await supabase.from('jour').select('*').eq('date', today).limit(1);
      if (error) return;
      setJour(data && data.length > 0 ? data[0] : {});
    };
    fetchJour();
  }, []);

  if (!jour) return <div>Chargement...</div>;

  const depenses = jour.depenses ?? 0;
  const beneficeNet = (jour.chiffre_affaires ?? 0) - depenses;

  return (
    <div className="dashboard card">
      <h2 className="dashboard-title">Tableau de bord du jour</h2>
      <div>
        <div className="dashboard-row">
          <FaIndustry color="#0288d1" size={40} />
          <span className="dashboard-label">Production :</span>
          <span className="dashboard-value">{jour.production}</span>
        </div>
        <div className="dashboard-row">
          <FaShoppingCart color="#0288d1" size={40} />
          <span className="dashboard-label">Ventes :</span>
          <span className="dashboard-value">{jour.ventes}</span>
        </div>
        <div className="dashboard-row">
          <FaBoxOpen color="#0288d1" size={40}/>
          <span className="dashboard-label">Invendus :</span>
          <span className="dashboard-value">{jour.invendus}</span>
        </div>
        <div className="dashboard-row">
          <FaEuroSign color="#0288d1" size={40}/>
          <span className="dashboard-label">Chiffre d'affaires :</span>
          <span className="dashboard-value">{jour.chiffre_affaires} FG</span>
        </div>
        <div className="dashboard-row">
          <FaWater color="#0288d1" size={40}/>
          <span className="dashboard-label">Stock actuel :</span>
          <span className="dashboard-value">{jour.stock}</span>
        </div>
        <div className="dashboard-row">
          <FaMoneyBillWave color="#0288d1" size={40}/>
          <span className="dashboard-label">Dépenses :</span>
          <span className="dashboard-value">{depenses} FG</span>
        </div>
        <div className="dashboard-row">
          <FaCalculator color="#0288d1" size={40}/>
          <span className="dashboard-label">Bénéfice net :</span>
          <span className="dashboard-value">{beneficeNet} FG</span>
        </div>
      </div>
    </div>
  );
}