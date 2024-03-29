import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TitleCard from "../../components/Cards/TitleCard";
import { showNotification } from "../common/headerSlice";
import { openModal } from "../common/modalSlice";
import LeadManagement from "./LeadManagement";
import { deleteLead, getLeadsContent } from "./leadSlice";
import LeadsTable from "./LeadsTable";

import ConfirmDeleteModal from "../../components/ConfirmModal/ConfirmDeleteModal";

function Leads() {
  const dispatch = useDispatch();
  const { leads } = useSelector((state) => state.lead);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState(null);

  useEffect(() => {
    dispatch(getLeadsContent());
  }, [dispatch]);

  useEffect(() => {
    setFilteredLeads(leads);
  }, [leads]);

  const applySearch = useCallback(
    (searchValue) => {
      const newFiltered = leads.filter(
        (lead) =>
          lead.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          lead.surname.toLowerCase().includes(searchValue.toLowerCase()),
      );
      setFilteredLeads(newFiltered);
    },
    [leads],
  );

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
    // console.log("Dados a serem enviados para o modal:", lead);
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
        <LeadManagement applySearch={applySearch} />
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
