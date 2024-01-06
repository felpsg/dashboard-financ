import TitleCard from "../../../components/Cards/TitleCard";

const dadosFonteUsuario = [
  { source: "Anúncios no Facebook", count: "26,345", conversionPercent: 10.2 },
  { source: "Anúncios no Google", count: "21,341", conversionPercent: 11.7 },
  { source: "Anúncios no Instagram", count: "34,379", conversionPercent: 12.4 },
  { source: "Afiliados", count: "12,359", conversionPercent: 20.9 },
  { source: "Orgânico", count: "10,345", conversionPercent: 10.3 },
];

function CanaisUsuario() {
  return (
    <TitleCard title={"Fonte de Cadastro do Usuário"}>
      {/** Dados da Tabela */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th className="normal-case">Fonte</th>
              <th className="normal-case">Número de Usuários</th>
              <th className="normal-case">Conversão</th>
            </tr>
          </thead>
          <tbody>
            {dadosFonteUsuario.map((u, k) => {
              return (
                <tr key={k}>
                  <th>{k + 1}</th>
                  <td>{u.source}</td>
                  <td>{u.count}</td>
                  <td>{`${u.conversionPercent}%`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </TitleCard>
  );
}

export default CanaisUsuario;
