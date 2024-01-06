import DashboardStats from "./components/DashboardStats";
import AmountStats from "./components/AmountStats";
import PageStats from "./components/PageStats";

import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon";
import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon";
import UserChannels from "./components/UserChannels";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import DashboardTopBar from "./components/DashboardTopBar";
import { useDispatch } from "react-redux";
import { showNotification } from "../common/headerSlice";
import DoughnutChart from "./components/DoughnutChart";
// import { useState } from "react";

const dadosDasEstatisticas = [
  {
    title: "Novos Usuários",
    value: "34.7k",
    icon: <UserGroupIcon className="w-8 h-8" />,
    description: "↗︎ 2300 (22%)",
  },
  {
    title: "Vendas Totais",
    value: "$34,545",
    icon: <CreditCardIcon className="w-8 h-8" />,
    description: "Mês atual",
  },
  {
    title: "Leads Pendentes",
    value: "450",
    icon: <CircleStackIcon className="w-8 h-8" />,
    description: "50 em leads quentes",
  },
  {
    title: "Usuários Ativos",
    value: "5.6k",
    icon: <UsersIcon className="w-8 h-8" />,
    description: "↙ 300 (18%)",
  },
];

function Painel() {
  const dispatch = useDispatch();

  const atualizarPeriodoDoPainel = (novoIntervalo) => {
    // Intervalo do painel alterado, escreva código para atualizar seus valores
    dispatch(
      showNotification({
        message: `Período atualizado para ${novoIntervalo.startDate} até ${novoIntervalo.endDate}`,
        status: 1,
      }),
    );
  };

  return (
    <>
      {/** ---------------------- Conteúdo Selecionar Período ------------------------- */}
      <DashboardTopBar updateDashboardPeriod={atualizarPeriodoDoPainel} />

      {/** ---------------------- Conteúdo de estatísticas diferentes 1 ------------------------- */}
      <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
        {dadosDasEstatisticas.map((d, k) => {
          return <DashboardStats key={k} {...d} colorIndex={k} />;
        })}
      </div>

      {/** ---------------------- Gráficos diferentes ------------------------- */}
      <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <LineChart />
        <BarChart />
      </div>

      {/** ---------------------- Conteúdo de estatísticas diferentes 2 ------------------------- */}

      <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
        <AmountStats />
        <PageStats />
      </div>

      {/** ---------------------- Tabela de canais de origem do usuário  ------------------------- */}

      <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <UserChannels />
        <DoughnutChart />
      </div>
    </>
  );
}

export default Painel;
