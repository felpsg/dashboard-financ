import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { addNewLead } from "../leadSlice";

const INITIAL_LEAD_OBJ = {
  name: "",
  surname: "",
  cpf: "",
  rg: "",
  address: "",
};

function AddLeadModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

  const saveNewLead = () => {
    if (leadObj.name.trim() === "") return setErrorMessage("Name is required!");
    else if (leadObj.surname.trim() === "")
      return setErrorMessage("Surname is required!");
    else if (leadObj.cpf.trim() === "")
      return setErrorMessage("CPF is required!");
    else if (leadObj.rg.trim() === "")
      return setErrorMessage("RG is required!");
    else if (leadObj.address.trim() === "")
      return setErrorMessage("Address is required!");
    else {
      dispatch(addNewLead(leadObj));
      dispatch(showNotification({ message: "New Lead Added!", status: 1 }));
      closeModal();
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLeadObj({ ...leadObj, [updateType]: value });
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={leadObj.name}
        updateType="name"
        containerStyle="mt-4"
        labelTitle="Name"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        defaultValue={leadObj.surname}
        updateType="surname"
        containerStyle="mt-4"
        labelTitle="Surname"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        defaultValue={leadObj.cpf}
        updateType="cpf"
        containerStyle="mt-4"
        labelTitle="CPF"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        defaultValue={leadObj.rg}
        updateType="rg"
        containerStyle="mt-4"
        labelTitle="RG"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        defaultValue={leadObj.address}
        updateType="address"
        containerStyle="mt-4"
        labelTitle="Address"
        updateFormValue={updateFormValue}
      />

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={closeModal}>
          Cancel
        </button>
        <button className="btn btn-primary px-6" onClick={saveNewLead}>
          Save
        </button>
      </div>
    </>
  );
}

export default AddLeadModalBody;
