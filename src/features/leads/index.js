import EditIcon from "@heroicons/react/24/outline/PencilIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TitleCard from "../../components/Cards/TitleCard";
import { showNotification } from "../common/headerSlice";
import { openModal } from "../common/modalSlice";
import { deleteLead, getLeadsContent } from "./leadSlice";

function ConfirmDeleteModal({ isOpen, onClose, onConfirm, leadId }) {
  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box">
        <p>Tem certeza de que deseja excluir este cliente?</p>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button className="btn btn-error" onClick={() => onConfirm(leadId)}>Excluir</button>
        </div>
      </div>
    </div>
  );
}

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewLeadModal = () => {
    dispatch(
      openModal({ title: "Adicionar Novo Cliente", bodyType: "LEAD_ADD_NEW" }),
    );
  };

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={openAddNewLeadModal}
      >
        Adicionar Novo Cliente
      </button>
    </div>
  );
};

function Leads() {
  const { leads } = useSelector((state) => state.lead);
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState(null);

  useEffect(() => {
    dispatch(getLeadsContent());
  }, [dispatch]);

  const openDeleteModal = (leadId) => {
    setSelectedLeadId(leadId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = (leadId) => {
    dispatch(deleteLead({ id: leadId }));
    dispatch(showNotification({ message: "Cliente excluído com sucesso!", status: 1 }));
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
        TopSideButtons={<TopSideButtons />}
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
              {leads.map((lead) => (
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
