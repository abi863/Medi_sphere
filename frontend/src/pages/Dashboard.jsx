import React from "react";
import Header from "../components/Header";
import PatientCard from "../components/PatientCard";
import AlertCard from "../components/AlertCard";
import { patients, dashboardStats, alerts } from "../data/fallbackData";

function Dashboard({ setActivePage, setSelectedPatient }) {
  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setActivePage("patient360");
  };

  return (
    <div className="page">
      <Header
        title="Dashboard"
        subtitle="Overview of your patient population"
      />

      <main className="dashboard-content">

        {/* Hero Section */}
        <section className="dashboard-hero">
          <div>
            <span className="hero-eyebrow">
              MEDISPHERE COGNITIVE TWIN
            </span>

            <h2>One patient context, assembled.</h2>

            <p>
              A unified view of patients, vital signs, clinical
              risk and laboratory information.
            </p>
          </div>

          <div className="hero-visual">
            <div className="hero-circle">
              <span>◎</span>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon">♙</div>

            <div>
              <span>Total Patients</span>
              <strong>{dashboardStats.totalPatients}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✓</div>

            <div>
              <span>Active Patients</span>
              <strong>{dashboardStats.activePatients}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">◷</div>

            <div>
              <span>Monitoring</span>
              <strong>{dashboardStats.monitoringPatients}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⌁</div>

            <div>
              <span>Average Age</span>
              <strong>{dashboardStats.averageAge}</strong>
              <small>years</small>
            </div>
          </div>

        </section>

        {/* Main Dashboard Grid */}
        <section className="dashboard-grid">

          {/* Patient Registry */}
          <div className="dashboard-panel patient-panel">

            <div className="panel-header">
              <div>
                <span className="panel-eyebrow">PATIENT REGISTRY</span>
                <h3>Recent Patients</h3>
              </div>

              <button
                className="panel-action"
                onClick={() => setActivePage("patients")}
              >
                View all →
              </button>
            </div>

            <div className="patient-list">
              {patients.slice(0, 4).map((patient) => (
                <PatientCard
                  key={patient.id}
                  patient={patient}
                  onSelect={handlePatientSelect}
                />
              ))}
            </div>

          </div>

          {/* Alerts */}
          <div className="dashboard-panel alerts-panel">

            <div className="panel-header">
              <div>
                <span className="panel-eyebrow">ATTENTION</span>
                <h3>Health Alerts</h3>
              </div>

              <span className="alert-count">
                {alerts.length}
              </span>
            </div>

            <div className="alerts-list">
              {alerts.map((alert) => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                />
              ))}
            </div>

          </div>

        </section>

        {/* Quick Access */}
        <section className="dashboard-panel quick-access-panel">

          <div className="panel-header">
            <div>
              <span className="panel-eyebrow">QUICK ACCESS</span>
              <h3>Patient Overview</h3>
            </div>
          </div>

          <div className="quick-patients">

            {patients.map((patient) => (
              <button
                key={patient.id}
                className="quick-patient"
                onClick={() => handlePatientSelect(patient)}
              >
                <div className="quick-avatar">
                  {patient.name
                    .split(" ")
                    .map((name) => name[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <div className="quick-patient-info">
                  <strong>{patient.name}</strong>
                  <span>
                    {patient.id} · {patient.condition}
                  </span>
                </div>

                <span className="quick-arrow">→</span>
              </button>
            ))}

          </div>

        </section>

      </main>
    </div>
  );
}

export default Dashboard;