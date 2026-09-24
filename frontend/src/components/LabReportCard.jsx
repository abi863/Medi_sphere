import React from "react";

function LabReportCard({ report }) {
  if (!report) return null;

  const getStatusClass = (status) => {
    if (status === "High") return "lab-high";
    if (status === "Low") return "lab-low";
    if (status === "Borderline") return "lab-borderline";
    return "lab-normal";
  };

  return (
    <div className="lab-report-card">
      <div className="lab-report-info">
        <div className="lab-report-icon">⌁</div>

        <div>
          <h4>{report.name}</h4>
          <p>Latest laboratory result</p>
        </div>
      </div>

      <div className="lab-report-result">
        <strong>{report.value}</strong>

        <span className={`lab-status ${getStatusClass(report.status)}`}>
          {report.status}
        </span>
      </div>
    </div>
  );
}

export default LabReportCard;