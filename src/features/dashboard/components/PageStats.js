import HeartIcon from "@heroicons/react/24/outline/HeartIcon";
import BoltIcon from "@heroicons/react/24/outline/BoltIcon";

function EstatisticasPagina({}) {
  return (
    <div className="stats bg-base-100 shadow">
      <div className="stat">
        <div className="stat-figure invisible md:visible">
          <HeartIcon className="w-8 h-8" />
        </div>
        <div className="stat-title">Total de Likes</div>
        <div className="stat-value">25.6K</div>
        <div className="stat-desc">21% a mais que o mês passado</div>
      </div>

      <div className="stat">
        <div className="stat-figure invisible md:visible">
          <BoltIcon className="w-8 h-8" />
        </div>
        <div className="stat-title">Visualizações da Página</div>
        <div className="stat-value">2.6M</div>
        <div className="stat-desc">14% a mais que o mês passado</div>
      </div>
    </div>
  );
}

export default EstatisticasPagina;
