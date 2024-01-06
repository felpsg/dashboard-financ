function EstatisticasDoPainel({ title, icon, value, description, colorIndex }) {
  const CORES = ["primary", "primary"];

  const getEstiloDesc = () => {
    if (description.includes("↗︎"))
      return "font-bold text-green-700 dark:text-green-300";
    else if (description.includes("↙"))
      return "font-bold text-rose-500 dark:text-red-400";
    else return "";
  };

  return (
    <div className="stats shadow">
      <div className="stat">
        <div
          className={`stat-figure dark:text-slate-300 text-${
            CORES[colorIndex % 2]
          }`}
        >
          {icon}
        </div>
        <div className="stat-title dark:text-slate-300">{title}</div>
        <div
          className={`stat-value dark:text-slate-300 text-${
            CORES[colorIndex % 2]
          }`}
        >
          {value}
        </div>
        <div className={"stat-desc  " + getEstiloDesc()}>{description}</div>
      </div>
    </div>
  );
}

export default EstatisticasDoPainel;
