import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import FormulaireSaisie from './components/FormulaireSaisie';
import Historique from './components/Historique';
import Parametres from './components/Parametres';
import ExportCSV from './components/ExportCSV';
import { FaTint } from 'react-icons/fa';
import "@fontsource/quicksand";
import axios from 'axios';
import ConfirmModal from './components/ConfirmModal';

function App() {
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState('dashboard');
  const [showConfirm, setShowConfirm] = useState(false);

  const handleMaj = () => setRefresh(!refresh);

  const handleReset = async () => {
    await axios.delete('http://localhost:5000/api/jour/reset');
    window.location.reload();
  };

  return (
    <div style={{fontFamily: "Quicksand, Arial, sans-serif", background: "none", minHeight: "100vh", position: "relative"}}>
      <header>
        <h1 style={{fontSize: "2.7em", display: "flex", alignItems: "center", justifyContent: "center", gap: 16}}>
          <FaTint style={{color: "#26c6da", fontSize: "1.2em"}} />
          Gestion de Production d’Eau Mouna
        </h1>
      </header>
      <nav>
        <button onClick={() => setPage('dashboard')}>Tableau de bord</button>
        <button onClick={() => setPage('saisie')}>Saisie</button>
        <button onClick={() => setPage('historique')}>Historique</button>
        <button onClick={() => setPage('parametres')}>Paramètres</button>
        <ExportCSV />
        <button
          onClick={() => setShowConfirm(true)}
          style={{background: '#e53935', marginLeft: 16}}
        >
          Réinitialiser
        </button>
      </nav>
      <div style={{zIndex: 1, position: 'relative'}}>
        {page === 'dashboard' && <Dashboard key={refresh} />}
        {page === 'saisie' && <FormulaireSaisie onMaj={handleMaj} />}
        {page === 'historique' && <Historique />}
        {page === 'parametres' && <Parametres />}
      </div>
     <ConfirmModal
        open={showConfirm}
        onConfirm={() => { setShowConfirm(false); handleReset(); }}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
}

export default App;