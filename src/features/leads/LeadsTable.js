import EditIcon from "@heroicons/react/24/outline/PencilIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { format } from "date-fns";
import React from "react";

const LeadsTable = ({ leads, onEditLead, onDeleteLead }) => {
  return (
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
            <th>Telefone</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>
                {lead.photoUrl ? (
                  <img
                    src={lead.photoUrl}
                    alt={`Foto de ${lead.name}`}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <span>Sem Foto</span> // Substitua ou remova caso não haja foto
                )}
              </td>
              <td>{lead.name}</td>
              <td>{lead.surname}</td>
              <td>{lead.cpf}</td>
              <td>{lead.rg}</td>
              <td>{lead.address}</td>
              <td>{lead.phone}</td>
              <td>
                {lead.date
                  ? format(new Date(lead.date), "dd/MM/yyyy")
                  : "Sem data"}
              </td>
              <td>
                <button
                  className="btn btn-square btn-ghost"
                  onClick={() => onEditLead(lead)}
                >
                  <EditIcon className="w-5 h-5" />
                </button>

                <button
                  className="btn btn-square btn-ghost"
                  onClick={() => onDeleteLead(lead.id)}
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsTable;
