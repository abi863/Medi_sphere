import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { getPatientById, getPatientVitals } from "../services/api";

function Patient360({ selectedPatient, setActivePage }) {
  const [patient, setPatient] = useState(selectedPatient || null);
  const [vitals, setVitals] = useState(null);
  const [loading, setLoading] = useState(true);
  const [vitalsLoading, setVitalsLoading] = useState(false);
  const [error, setError] = useState("");

  // Load patient information from backend
  useEffect(() => {
    const loadPatient = async () => {
      if (!selectedPatient?.id) {
        setLoading(false);
        setError("No patient selected.");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await getPatientById(selectedPatient.id);

        setPatient(data);
      } catch (err) {
        console.error("Failed to load patient:", err);

        // Keep selected patient if backend request fails
        setPatient(selectedPatient);
        setError("Unable to refresh patient information from backend.");
      } finally {
        setLoading(false);
      }
    };

    loadPatient();
  }, [selectedPatient]);

  // Load patient vitals
  useEffect(() => {
    const loadVitals = async () => {
      if (!selectedPatient?.id) {
        return;
      }

      try {
        setVitalsLoading(true);

        const data = await getPatientVitals(selectedPatient.id);

        /*
          Backend VitalResponse is expected to contain:
          {
            vital: {...},
            live: true,
            source: "KAFKA_STREAM"
          }
        */

        if (data?.vital) {
          setVitals(data.vital);
        } else {
          setVitals(data);
        }
      } catch (err) {
        console.error("Failed to load patient vitals:", err);
        setVitals(null);
      } finally {
        setVitalsLoading(false);
      }
    };

    loadVitals();
  }, [selectedPatient]);

  if (loading) {
    return (
      <div className="page">
        <Header
          title="Patient 360"
          subtitle="Complete clinical context"
        />

        <main className="patient360-content">
          <div className="empty-state">
            <h3>Loading patient...</h3>
            <p>Fetching clinical information from MediSphere backend.</p>
          </div>
        </main>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="page">
        <Header
          title="Patient 360"
          subtitle="Complete clinical context"
        />

        <main className="patient360-content">
          <div className="empty-state">
            <h3>No patient selected</h3>

            <p>
              Please select a patient from the Patient Registry.
            </p>

            <button
              className="primary-button"
              onClick={() => setActivePage("patients")}
            >
              Back to Patients
            </button>
          </div>
        </main>
      </div>
    );
  }

  const heartRate = vitals?.heartRate ?? "--";

  const bloodPressure =
    vitals?.systolicBp !== undefined &&
    vitals?.diastolicBp !== undefined
      ? `${vitals.systolicBp}/${vitals.diastolicBp}`
      : "--";

  const spo2 =
    vitals?.spo2 !== undefined
      ? `${vitals.spo2}%`
      : "--";

  const temperature =
    vitals?.temperature !== undefined
      ? `${vitals.temperature} °F`
      : "--";

  const vitalStatus = vitals?.status || "No data";

  return (
    <div className="page">
      <Header
        title="Patient 360"
        subtitle="Complete clinical context"
      />

      <main className="patient360-content">

        {/* Back button */}
        <button
          className="secondary-button"
          onClick={() => setActivePage("patients")}
          style={{ marginBottom: "20px" }}
        >
          ← Back to Patients
        </button>

        {/* Patient Header */}
        <section className="patient360-header">
          <div>
            <span className="panel-eyebrow">
              PATIENT 360
            </span>

            <h2>{patient.name}</h2>

            <p>
              {patient.id} · {patient.age} yrs · {patient.gender}
            </p>
          </div>

          <div className="patient360-status">
            <span className="status-dot"></span>
            Active
          </div>
        </section>

        {/* Patient Overview */}
        <section className="patient360-grid">

          <div className="clinical-panel">
            <span className="panel-eyebrow">
              PATIENT PROFILE
            </span>

            <h3>Clinical Overview</h3>

            <div className="clinical-details">

              <div className="detail-item">
                <span>Patient ID</span>
                <strong>{patient.id}</strong>
              </div>

              <div className="detail-item">
                <span>Age</span>
                <strong>{patient.age} years</strong>
              </div>

              <div className="detail-item">
                <span>Gender</span>
                <strong>{patient.gender}</strong>
              </div>

              <div className="detail-item">
                <span>Condition</span>
                <strong>{patient.condition || "Not available"}</strong>
              </div>

            </div>
          </div>

          <div className="clinical-panel">
            <span className="panel-eyebrow">
              MONITORING
            </span>

            <h3>Real-Time Status</h3>

            <div className="monitoring-status">
              <span className="live-indicator"></span>

              <div>
                <strong>
                  {vitalsLoading
                    ? "Fetching telemetry..."
                    : "Telemetry available"}
                </strong>

                <p>
                  Backend-connected physiological monitoring
                </p>
              </div>
            </div>

            {error && (
              <p className="error-message">
                {error}
              </p>
            )}
          </div>

        </section>

        {/* Vital Signs */}
        <section className="clinical-section">

          <div className="section-heading">
            <div>
              <span className="panel-eyebrow">
                LIVE PHYSIOLOGICAL DATA
              </span>

              <h3>Current Vitals</h3>
            </div>

            <span className="telemetry-badge">
              {vitals ? "LIVE DATA" : "NO DATA"}
            </span>
          </div>

          <div className="vitals-grid">

            <div className="vital-card">
              <span className="vital-label">
                HEART RATE
              </span>

              <strong className="vital-value">
                {heartRate}
              </strong>

              <span className="vital-unit">
                bpm
              </span>
            </div>

            <div className="vital-card">
              <span className="vital-label">
                BLOOD PRESSURE
              </span>

              <strong className="vital-value">
                {bloodPressure}
              </strong>

              <span className="vital-unit">
                mmHg
              </span>
            </div>

            <div className="vital-card">
              <span className="vital-label">
                SpO₂
              </span>

              <strong className="vital-value">
                {spo2}
              </strong>

              <span className="vital-unit">
                oxygen saturation
              </span>
            </div>

            <div className="vital-card">
              <span className="vital-label">
                TEMPERATURE
              </span>

              <strong className="vital-value">
                {temperature}
              </strong>

              <span className="vital-unit">
                body temperature
              </span>
            </div>

          </div>

          {vitals && (
            <div className="vitals-meta">

              <span>
                Status: <strong>{vitalStatus}</strong>
              </span>

              <span>
                Source:{" "}
                <strong>
                  Backend / Kafka pipeline
                </strong>
              </span>

              {vitals.timestamp && (
                <span>
                  Updated:{" "}
                  <strong>
                    {new Date(vitals.timestamp).toLocaleString()}
                  </strong>
                </span>
              )}

            </div>
          )}

        </section>

        {/* Cognitive Twin */}
        <section className="clinical-panel cognitive-twin-panel">

          <div className="section-heading">
            <div>
              <span className="panel-eyebrow">
                COGNITIVE TWIN
              </span>

              <h3>Digital Health Representation</h3>
            </div>

            <span className="telemetry-badge">
              MONITORING ACTIVE
            </span>
          </div>

          <div className="cognitive-twin-content">

            <div className="twin-visual">
              <div className="twin-circle">
                <span>360°</span>
              </div>
            </div>

            <div className="twin-information">

              <h4>
                {patient.name}'s Clinical Twin
              </h4>

              <p>
                The patient context combines demographic
                information and physiological telemetry
                retrieved from the MediSphere backend.
              </p>

              <div className="twin-status-row">
                <span>Patient</span>
                <strong>{patient.id}</strong>
              </div>

              <div className="twin-status-row">
                <span>Condition</span>
                <strong>
                  {patient.condition || "Not available"}
                </strong>
              </div>

              <div className="twin-status-row">
                <span>Telemetry</span>
                <strong>
                  {vitals ? "Connected" : "Waiting"}
                </strong>
              </div>

            </div>

          </div>

        </section>

        {/* Clinical Insights */}
        <section className="clinical-panel">

          <span className="panel-eyebrow">
            CLINICAL INTELLIGENCE
          </span>

          <h3>AI-Assisted Insights</h3>

          <div className="insight-list">

            <div className="insight-item">
              <span className="insight-marker"></span>

              <div>
                <strong>
                  Patient context assembled
                </strong>

                <p>
                  Demographic and physiological data
                  are available through the patient 360 view.
                </p>
              </div>
            </div>

            <div className="insight-item">
              <span className="insight-marker"></span>

              <div>
                <strong>
                  Real-time telemetry
                </strong>

                <p>
                  Current vital information is retrieved
                  from the backend monitoring pipeline.
                </p>
              </div>
            </div>

            <div className="insight-item">
              <span className="insight-marker"></span>

              <div>
                <strong>
                  Prototype AI layer
                </strong>

                <p>
                  AI-assisted analysis is currently a
                  synthetic demonstration and is not
                  clinically validated.
                </p>
              </div>
            </div>

          </div>

        </section>

      </main>
    </div>
  );
}

export default Patient360;