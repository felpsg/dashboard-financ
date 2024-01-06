function EstatisticasDeQuantidade({}) {
  return (
    <div className="stats bg-base-100 shadow">
      <div className="stat">
        <div className="stat-title">Quantidade a ser Coletada</div>
        <div className="stat-value">$25,600</div>
        <div className="stat-actions">
          <button className="btn btn-xs">Ver Usuários</button>
        </div>
      </div>

      <div className="stat">
        <div className="stat-title">Dinheiro em Mãos</div>
        <div className="stat-value">$5,600</div>
        <div className="stat-actions">
          <button className="btn btn-xs">Ver Membros</button>
        </div>
      </div>
    </div>
  );
}

export default EstatisticasDeQuantidade;
