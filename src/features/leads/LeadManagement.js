import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import SearchBar from "../../components/Input/SearchBar";
import { openModal } from "../common/modalSlice";

const LeadManagement = ({ applySearch }) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    applySearch(searchText);
  }, [searchText, applySearch]);

  const openAddNewLeadModal = () => {
    dispatch(
      openModal({ title: "Adicionar Novo Cliente", bodyType: "LEAD_ADD_NEW" }),
    );
  };

  return (
    <div className="inline-block float-right">
      <SearchBar
        searchText={searchText}
        styleClass="mr-4"
        setSearchText={setSearchText}
      />
      <button
        className="btn px-6 btn-sm normal-case btn-primary mr-9"
        onClick={openAddNewLeadModal}
      >
        Adicionar Novo Cliente
      </button>
    </div>
  );
};

export default LeadManagement;
