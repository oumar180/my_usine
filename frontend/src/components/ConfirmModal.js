import React from 'react';

export default function ConfirmModal({ open, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Confirmation</h3>
        <p>Voulez-vous vraiment tout réinitialiser ?<br/>Cette action est irréversible.</p>
        <div className="modal-actions">
          <button className="btn-confirm" onClick={onConfirm}>Oui, réinitialiser</button>
          <button className="btn-cancel" onClick={onCancel}>Annuler</button>
        </div>
      </div>
    </div>
  );
}