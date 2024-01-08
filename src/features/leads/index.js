import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TitleCard from "../../components/Cards/TitleCard";
import { showNotification } from "../common/headerSlice";
import { openModal } from "../common/modalSlice";
import { deleteLead, getLeadsContent } from "./leadSlice";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewLeadModal = () => {
    dispatch(openModal({ title: "Add New Lead", bodyType: "LEAD_ADD_NEW" }));
  };

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={openAddNewLeadModal}
      >
        Add New
      </button>
    </div>
  );
};

function Leads() {
  const { leads } = useSelector((state) => state.lead);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLeadsContent());
  }, [dispatch]);

  const deleteCurrentLead = (index) => {
    dispatch(deleteLead({ index }));
    dispatch(showNotification({ message: "Lead Deleted Successfully!", status: 1 }));
  };

  return (
    <>
      <TitleCard
        title="Current Leads"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Surname</th>
                <th>CPF</th>
                <th>RG</th>
                <th>Address</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, index) => (
                <tr key={index}>
                  <td>
                    {lead.photoUrl && (
                      <img src={lead.photoUrl} alt="Lead" className="w-10 h-10 rounded-full" />
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
                      onClick={() => deleteCurrentLead(index)}
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
    </>
  );
}

export default Leads;
