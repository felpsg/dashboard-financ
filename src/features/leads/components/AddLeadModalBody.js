import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { closeModal } from "../../../features/common/modalSlice";
import { addNewLead, updateLead } from "../leadSlice";

const INITIAL_LEAD_OBJ = {
  name: "",
  surname: "",
  cpf: "",
  rg: "",
  address: "",
  photoUrl: "",
  date: "",
};

const useLeadState = (initialData) => {
  const [leadObj, setLeadObj] = useState(
    initialData || { ...INITIAL_LEAD_OBJ },
  );
  const updateFormValue = ({ updateType, value }) =>
    setLeadObj({ ...leadObj, [updateType]: value });
  return [leadObj, updateFormValue];
};

function AddLeadModalBody() {
  const initialData = useSelector((state) => state.modal.initialData);
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, updateFormValue] = useLeadState(initialData);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        updateFormValue({ updateType: "photoUrl", value: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const openFileSelector = () => fileInputRef.current.click();

  const saveLead = () => {
    const emptyField = Object.entries(leadObj).find(
      ([key, value]) => !value.trim() && key in INITIAL_LEAD_OBJ,
    );
    if (emptyField) {
      setErrorMessage(`${emptyField[0]} é obrigatório!`);
      return;
    }

    dispatch(leadObj.id ? updateLead(leadObj) : addNewLead(leadObj));
    dispatch(closeModal());
  };

  const handleClose = () => {
    setShowConfirmModal(false);
    dispatch(closeModal());
  };

  return (
    <>
      {Object.entries(INITIAL_LEAD_OBJ).map(([key, _]) => (
        <InputText
          key={key}
          type={key === "date" ? "date" : "text"}
          value={leadObj[key]}
          updateType={key}
          containerStyle="mt-4"
          labelTitle={key.charAt(0).toUpperCase() + key.slice(1)}
          updateFormValue={updateFormValue}
        />
      ))}

      <div className="mt-4">
        <label className="label">
          <span className="label-text">Documento [RG,CNH]</span>
        </label>
        <button className="btn btn-primary" onClick={openFileSelector}>
          Upload Documento
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {selectedFile && <div className="mt-2">{selectedFile.name}</div>}
      </div>

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>

      <div className="modal-action">
        <button
          className="btn btn-ghost"
          onClick={() => setShowConfirmModal(true)}
        >
          Cancelar
        </button>
        <button className="btn btn-primary px-6" onClick={saveLead}>
          {leadObj.id ? "Atualizar" : "Salvar"}
        </button>
      </div>

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleClose}
        message="Tem certeza de que deseja cancelar a edição deste cadastro?"
        confirmButtonText="Sim, cancelar"
        cancelButtonText="Não"
      />
    </>
  );
}

export default AddLeadModalBody;
