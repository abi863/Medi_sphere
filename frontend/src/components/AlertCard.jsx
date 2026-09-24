import React from "react";

function AlertCard({ alert }) {
  if (!alert) return null;

  const getAlertClass = (type) => {
    if (type === "High Risk") return "alert-danger";
    if (type === "Lab Alert") return "alert-warning";
    return "alert-info";
  };

  return (
    <div className={`alert-card ${getAlertClass(alert.type)}`}>
      <div className="alert-icon">
        !
      </div>

      <div className="alert-content">
        <div className="alert-top">
          <h4>{alert.type}</h4>

          <span className="alert-patient-id">
            {alert.patientId}
          </span>
        </div>

        <p>{alert.message}</p>

        <span className="alert-patient-name">
          {alert.patientName}
        </span>
      </div>
    </div>
  );
}

export default AlertCard;