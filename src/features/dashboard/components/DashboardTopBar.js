import React from "react";
import SelectBox from "../../../components/Input/SelectBox";
import ArrowDownTrayIcon from "@heroicons/react/24/outline/ArrowDownTrayIcon";
import ShareIcon from "@heroicons/react/24/outline/ShareIcon";
import EnvelopeIcon from "@heroicons/react/24/outline/EnvelopeIcon";
import EllipsisVerticalIcon from "@heroicons/react/24/outline/EllipsisVerticalIcon";
import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";

const opcoesPeriodo = [
  { name: "Hoje", value: "TODAY" },
  { name: "Ontem", value: "YESTERDAY" },
  { name: "Esta Semana", value: "THIS_WEEK" },
  { name: "Semana Passada", value: "LAST_WEEK" },
  { name: "Este Mês", value: "THIS_MONTH" },
  { name: "Mês Passado", value: "LAST_MONTH" },
];

function BarraSuperiorPainel({ atualizarValorSelectBox }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="">
        <SelectBox
          options={opcoesPeriodo}
          labelTitle="Período"
          placeholder="Selecione o intervalo de datas"
          containerStyle="w-72"
          labelStyle="hidden"
          defaultValue="TODAY"
          updateFormValue={atualizarValorSelectBox}
        />
      </div>
      <div className="text-right ">
        <button className="btn btn-ghost btn-sm normal-case">
          <ArrowPathIcon className="w-4 mr-2" />
          Atualizar Dados
        </button>
        <button className="btn btn-ghost btn-sm normal-case  ml-2">
          <ShareIcon className="w-4 mr-2" />
          Compartilhar
        </button>

        <div className="dropdown dropdown-bottom dropdown-end  ml-2">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-sm normal-case btn-square "
          >
            <EllipsisVerticalIcon className="w-5" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu menu-compact  p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <button>
                <EnvelopeIcon className="w-4" />
                Resumos por Email
              </button>
            </li>
            <li>
              <button>
                <ArrowDownTrayIcon className="w-4" />
                Baixar
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BarraSuperiorPainel;
