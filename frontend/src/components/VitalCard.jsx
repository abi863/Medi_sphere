import React from "react";

function VitalCard({ label, value, unit, icon, status = "Normal" }) {
  const getStatusClass = () => {
    if (status === "High") return "vital-high";
    if (status === "Low") return "vital-low";
    return "vital-normal";
  };

  return (
    <div className="vital-card">
      <div className="vital-card-top">
        <div className="vital-icon">{icon}</div>

        <span className={`vital-status ${getStatusClass()}`}>
          {status}
        </span>
      </div>

      <div className="vital-card-content">
        <p>{label}</p>

        <div className="vital-value">
          <strong>{value}</strong>
          {unit && <span>{unit}</span>}
        </div>
      </div>
    </div>
  );
}

export default VitalCard;