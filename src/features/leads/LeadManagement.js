import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import SearchBar from "../../components/Input/SearchBar";
import { openModal } from "../common/modalSlice";

const LeadManagement = ({
  applySearch,
  applyFilter,
  removeFilter,
  filterParam,
}) => {
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

  const locationFilters = [
    "Cidade1",
    "Cidade2",
    "Cidade3",
    "Cidade4",
    "Cidade5",
  ]; // Substitua com suas opções de filtro

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
      {filterParam && (
        <button
          onClick={removeFilter}
          className="btn btn-xs mr-2 btn-active btn-ghost normal-case"
        >
          {filterParam}
          <XMarkIcon className="w-4 ml-2" />
        </button>
      )}
      <div className="dropdown dropdown-bottom dropdown-end">
        <label tabIndex={0} className="btn btn-sm btn-outline">
          <FunnelIcon className="w-5 mr-2" />
          Filter
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-52"
        >
          {locationFilters.map((l, k) => (
            <li key={k}>
              <button onClick={() => applyFilter(l)}>{l}</button>
            </li>
          ))}
          <div className="divider mt-0 mb-0"></div>
          <li>
            <button onClick={removeFilter}>Remove Filter</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeadManagement;
