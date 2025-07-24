import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Historique() {
  const [historique, setHistorique] = useState([]);

  useEffect(() => {
    const fetchHistorique = async () => {
      const { data } = await supabase.from('jour').select('*').order('date', { ascending: false });
      setHistorique(data || []);
    };
    fetchHistorique();
  }, []);

  return (
    <div className="card">
      <h2 className="historique-title">Historique</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th><th>Production</th><th>Ventes</th><th>Invendus</th><th>CA</th><th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {historique.map(j => (
            <tr key={j.date}>
              <td>{j.date}</td>
              <td>{j.production}</td>
              <td>{j.ventes}</td>
              <td>{j.invendus}</td>
              <td>{j.chiffre_affaires}</td>
              <td>{j.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}