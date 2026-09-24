import React from "react";

function RiskCard({ risk }) {
  if (!risk) return null;

  const getRiskClass = (level) => {
    if (level === "High") return "risk-high";
    if (level === "Moderate") return "risk-moderate";
    return "risk-low";
  };

  return (
    <div className="risk-card">
      <div className="risk-card-header">
        <div>
          <p className="risk-label">HEALTH RISK</p>
          <h3>Risk Assessment</h3>
        </div>

        <div className={`risk-indicator ${getRiskClass(risk.level)}`}>
          {risk.level}
        </div>
      </div>

      <div className="risk-score-section">
        <div className="risk-score">
          <strong>{risk.score}</strong>
          <span>/ 100</span>
        </div>

        <div className="risk-score-bar">
          <div
            className={`risk-score-fill ${getRiskClass(risk.level)}`}
            style={{ width: `${risk.score}%` }}
          ></div>
        </div>
      </div>

      <div className="risk-message">
        <span className="risk-message-icon">!</span>
        <p>{risk.message}</p>
      </div>
    </div>
  );
}

export default RiskCard;