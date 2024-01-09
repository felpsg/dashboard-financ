import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TitleCard from "../../components/Cards/TitleCard";
import { showNotification } from "../common/headerSlice";
import { openModal } from "../common/modalSlice";
import LeadManagement from "./LeadManagement";
import { deleteLead, getLeadsContent } from "./leadSlice";
import LeadsTable from "./LeadsTable";

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
    let newFiltered = leads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        lead.surname.toLowerCase().includes(searchValue.toLowerCase()),
    );
    if (filterParam) {
      newFiltered = newFiltered.filter((lead) => lead.location === filterParam);
    }
    setFilteredLeads(newFiltered);
  };

  const applyFilter = (filter) => {
    setFilterParam(filter);
    applySearch("");
  };

  const removeFilter = () => {
    setFilterParam("");
    applySearch("");
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
      <TitleCard title="Clientes Atuais" topMargin="mt-2">
        <LeadManagement
          applySearch={applySearch}
          applyFilter={applyFilter}
          removeFilter={removeFilter}
          filterParam={filterParam}
        />
        <LeadsTable
          leads={filteredLeads}
          onEditLead={editCurrentLead}
          onDeleteLead={openDeleteModal}
        />
      </TitleCard>
      {isDeleteModalOpen && (
        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={confirmDelete}
          leadId={selectedLeadId}
        />
      )}
    </>
  );
}

export default Leads;
