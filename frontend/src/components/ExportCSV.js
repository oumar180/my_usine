import React from 'react';
import { FaFileCsv } from 'react-icons/fa';
import { supabase } from '../supabaseClient';

export default function ExportCSV() {
  const handleExport = async () => {
    const { data, error } = await supabase.from('jour').select('*').order('date', { ascending: true });
    if (error || !data) {
      alert("Erreur lors de l'export.");
      return;
    }
    const csvRows = [
      ['Date', 'Production', 'Ventes', 'Invendus', "Chiffre d'affaires", 'Stock', 'Dépenses'],
      ...data.map(j => [
        j.date,
        j.production ?? '',
        j.ventes ?? '',
        j.invendus ?? '',
        j.chiffre_affaires ?? '',
        j.stock ?? '',
        j.depenses ?? ''
      ])
    ];
    const csvContent = csvRows.map(row => row.join(';')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'historique.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={handleExport} style={{display: 'flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #0288d1 0%, #4fc3f7 100%)', borderRadius: 18, padding: '12px 20px', fontWeight: 'bold', fontSize: '1em', border: 'none', color: 'white', boxShadow: '0 2px 8px rgba(2,136,209,0.10)', cursor: 'pointer'}}>
      <FaFileCsv />
      Exporter l’historique (CSV)
    </button>);
}