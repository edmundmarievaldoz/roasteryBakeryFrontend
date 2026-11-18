import "./StatusBadge.scss";

function StatusBadge({ status }) {
  // Initialisation--------------------------------------
  // "Pending" -> "statusBadge--pending". An unknown status still gets the base style.
  const modifier = status ? `statusBadge--${status.toLowerCase()}` : "";

  // State ----------------------------------------------
  // Handlers -------------------------------------------
  // View -----------------------------------------------
  return <span className={`statusBadge ${modifier}`}>{status}</span>;
}

export default StatusBadge;
