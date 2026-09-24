import React from "react";

function PatientCard({ patient, onSelect }) {
  if (!patient) return null;

  const getRiskClass = (level) => {
    if (level === "High") return "risk-high";
    if (level === "Moderate") return "risk-moderate";
    return "risk-low";
  };

  return (
    <div className="patient-card">
      <div className="patient-card-main">
        <div className="patient-avatar">
          {patient.name
            .split(" ")
            .map((name) => name[0])
            .join("")
            .slice(0, 2)}
        </div>

        <div className="patient-details">
          <h3>{patient.name}</h3>

          <p>
            {patient.id} • {patient.age} years • {patient.gender}
          </p>
        </div>
      </div>

      <div className="patient-condition">
        <span>{patient.condition}</span>
      </div>

      <div className="patient-status">
        <span
          className={`status-badge ${
            patient.status === "Active"
              ? "status-active"
              : "status-monitoring"
          }`}
        >
          {patient.status}
        </span>
      </div>

      <div className="patient-risk">
        <span className={`risk-badge ${getRiskClass(patient.risk?.level)}`}>
          {patient.risk?.level || "Unknown"} Risk
        </span>
      </div>

      <button
        className="view-patient-button"
        onClick={() => onSelect(patient)}
      >
        View 360 →
      </button>
    </div>
  );
}

export default PatientCard;