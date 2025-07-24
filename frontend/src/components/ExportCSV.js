import React from 'react';
import { FaFileCsv } from 'react-icons/fa';

const API = process.env.REACT_APP_API_URL;

export default function ExportCSV() {
  const handleExport = () => {
    window.open(`${API}/jour/export`, '_blank');
  };

  return (
    <button onClick={handleExport} style={{display: 'flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #0288d1 0%, #4fc3f7 100%)', borderRadius: 18, padding: '12px 20px', fontWeight: 'bold', fontSize: '1em', border: 'none', color: 'white', boxShadow: '0 2px 8px rgba(2,136,209,0.10)', cursor: 'pointer'}}>
      <FaFileCsv />
      Exporter l’historique (PDF)
    </button>
  );
}