import React from "react";

function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  message,
  confirmButtonText,
  cancelButtonText,
}) {
  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <p>{message}</p>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>
            {cancelButtonText || "Cancelar"}
          </button>
          <button className="btn btn-error" onClick={onConfirm}>
            {confirmButtonText || "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
