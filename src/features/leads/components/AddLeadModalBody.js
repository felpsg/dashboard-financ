import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
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

function AddLeadModalBody({ closeModal, initialData }) {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState({
    ...INITIAL_LEAD_OBJ,
    ...initialData,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setLeadObj({ ...INITIAL_LEAD_OBJ, ...initialData });
  }, [initialData]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLeadObj((prev) => ({ ...prev, photoUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const openFileSelector = () => {
    fileInputRef.current.click();
  };

  const saveLead = () => {
    if (leadObj.name.trim() === "") {
      setErrorMessage("Name is required!");
      return;
    } else if (leadObj.surname.trim() === "") {
      setErrorMessage("Surname is required!");
      return;
    } else if (leadObj.cpf.trim() === "") {
      setErrorMessage("CPF is required!");
      return;
    } else if (leadObj.rg.trim() === "") {
      setErrorMessage("RG is required!");
      return;
    } else if (leadObj.address.trim() === "") {
      setErrorMessage("Address is required!");
      return;
    }

    if (leadObj.id) {
      dispatch(updateLead(leadObj));
    } else {
      dispatch(addNewLead(leadObj));
    }
    closeModal();
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLeadObj({ ...leadObj, [updateType]: value });
  };

  return (
    <>
      <InputText
        type="text"
        value={leadObj.name}
        updateType="name"
        containerStyle="mt-4"
        labelTitle="Nome"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        value={leadObj.surname}
        updateType="surname"
        containerStyle="mt-4"
        labelTitle="Sobrenome"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        value={leadObj.cpf}
        updateType="cpf"
        containerStyle="mt-4"
        labelTitle="CPF"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        value={leadObj.rg}
        updateType="rg"
        containerStyle="mt-4"
        labelTitle="RG"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        value={leadObj.address}
        updateType="address"
        containerStyle="mt-4"
        labelTitle="Endereço"
        updateFormValue={updateFormValue}
      />

      <div className="mt-4">
        <label className="label">
          <span className="label-text">Data</span>
        </label>
        <input
          type="date"
          value={leadObj.date}
          onChange={(e) =>
            updateFormValue({ updateType: "date", value: e.target.value })
          }
          className="input input-bordered w-full"
        />
      </div>

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
        <button className="btn btn-ghost" onClick={closeModal}>
          Cancel
        </button>
        <button className="btn btn-primary px-6" onClick={saveLead}>
          {leadObj.id ? "Update" : "Save"}
        </button>
      </div>
    </>
  );
}

export default AddLeadModalBody;
