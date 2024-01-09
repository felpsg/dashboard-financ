import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
// Importações necessárias
import EditIcon from "@heroicons/react/24/outline/PencilIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TitleCard from "../../components/Cards/TitleCard";
import SearchBar from "../../components/Input/SearchBar";
import { showNotification } from "../common/headerSlice";
import { openModal } from "../common/modalSlice";
import { deleteLead, getLeadsContent } from "./leadSlice";

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

// Componente TopSideButtons
const TopSideButtons = ({
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
              <a onClick={() => applyFilter(l)}>{l}</a>
            </li>
          ))}
          <div className="divider mt-0 mb-0"></div>
          <li>
            <a onClick={removeFilter}>Remove Filter</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

// Componente Leads
function Leads() {
  const { leads } = useSelector((state) => state.lead);
  const dispatch = useDispatch();
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [filterParam, setFilterParam] = useState("");

  useEffect(() => {
    dispatch(getLeadsContent());
  }, [dispatch]);

  useEffect(() => {
    setFilteredLeads(leads);
  }, [leads]);

  const applySearch = (searchValue) => {
    let newFiltered = leads;
    if (searchValue) {
      newFiltered = newFiltered.filter(
        (lead) =>
          lead.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          lead.surname.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }
    if (filterParam) {
      newFiltered = newFiltered.filter((lead) => lead.location === filterParam);
    }
    setFilteredLeads(newFiltered);
  };

  const applyFilter = (filter) => {
    setFilterParam(filter);
    applySearch(""); // Reinicia a pesquisa quando um filtro é aplicado
  };

  const removeFilter = () => {
    setFilterParam("");
    applySearch(""); // Atualiza a lista quando o filtro é removido
  };

  const openDeleteModal = (leadId) => {
    setSelectedLeadId(leadId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = (leadId) => {
    dispatch(deleteLead({ id: leadId }));
    dispatch(
      showNotification({ message: "Cliente excluído com sucesso!", status: 1 }),
    );
    closeDeleteModal();
  };

  const editCurrentLead = (lead) => {
    dispatch(
      openModal({
        title: "Editar Cliente",
        bodyType: "LEAD_ADD_NEW",
        initialData: lead,
      }),
    );
  };

  return (
    <>
      <TitleCard
        title="Clientes Atuais"
        topMargin="mt-2"
        TopSideButtons={
          <TopSideButtons
            applySearch={applySearch}
            applyFilter={applyFilter}
            removeFilter={removeFilter}
            filterParam={filterParam}
          />
        }
      >
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nome</th>
                <th>Sobrenome</th>
                <th>CPF</th>
                <th>RG</th>
                <th>Endereço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id}>
                  <td>
                    {lead.photoUrl && (
                      <img
                        src={lead.photoUrl}
                        alt={`Foto de ${lead.name}`}
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                  </td>
                  <td>{lead.name}</td>
                  <td>{lead.surname}</td>
                  <td>{lead.cpf}</td>
                  <td>{lead.rg}</td>
                  <td>{lead.address}</td>
                  <td>
                    <button
                      className="btn btn-square btn-ghost"
                      onClick={() => editCurrentLead(lead)}
                    >
                      <EditIcon className="w-5 h-5" />
                    </button>
                    <button
                      className="btn btn-square btn-ghost"
                      onClick={() => openDeleteModal(lead.id)}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TitleCard>
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        leadId={selectedLeadId}
      />
    </>
  );
}

export default Leads;
