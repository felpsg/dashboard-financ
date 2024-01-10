import React from "react";

function ConfirmDeleteModal({ isOpen, onClose, onConfirm, leadId }) {
  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <p>Tem certeza de que deseja excluir este cliente?</p>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-error" onClick={() => onConfirm(leadId)}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
