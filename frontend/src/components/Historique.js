import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Historique() {
  const [historique, setHistorique] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/jour/historique').then(res => setHistorique(res.data));
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