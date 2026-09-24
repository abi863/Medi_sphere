import React from "react";

function DigitalHealthTwin({ patients = [], selectedPatient, onOpenPatient }) {
  // If no patient is selected, use the first patient
  const patient = selectedPatient || patients[0] || {
    id: "P001",
    name: "John David",
    age: 42,
    gender: "Male",
    heartRate: 85,
    bloodPressure: "120/80",
    spo2: 98,
    condition: "Stable",
  };

  return (
    <div className="dashboard digital-twin-page">

      {/* ================= HEADER ================= */}
      <section className="patients-header twin-page-header">
        <div>
          <small className="label">MILESTONE 1 • DIGITAL TWIN</small>

          <h1>Digital Health Twin</h1>

          <p>
            A composed patient context layer for records, wearable signals,
            and laboratory information.
          </p>
        </div>

        <span className="prototype-badge">
          Prototype ready
        </span>
      </section>


      {/* ================= MAIN TWIN AREA ================= */}
      <section className="twin-main-grid">

        {/* LEFT - VISUALIZATION */}
        <div className="panel twin-visual-panel">

          <div className="twin-panel-header">
            <div>
              <small className="label">CONTEXT MODEL</small>

              <h2>Patient context, visualized</h2>

              <p>
                Current synthetic record for mentor walkthrough.
              </p>
            </div>

            <button
              className="secondary-btn"
              onClick={() =>
                onOpenPatient && onOpenPatient(patient)
              }
            >
              ♙ &nbsp; Open Patient 360
            </button>
          </div>


          {/* VISUALIZATION */}
          <div className="twin-visual-area">

            {/* CURRENT VITALS */}
            <div className="twin-floating-card vitals-floating">
              <span className="floating-dot teal"></span>

              <strong>Current vitals</strong>

              <small>
                Heart rate · BP · SpO₂
              </small>
            </div>


            {/* FHIR */}
            <div className="twin-floating-card fhir-floating">
              <span className="floating-dot blue"></span>

              <strong>FHIR record</strong>

              <small>
                Patient resource mapped
              </small>
            </div>


            {/* CONSENT */}
            <div className="twin-floating-card consent-floating">
              <span className="floating-dot yellow"></span>

              <strong>Consent boundary</strong>

              <small>
                Sharing state respected
              </small>
            </div>


            {/* DIGITAL HUMAN */}
            <div className="digital-human">

              <div className="human-head"></div>

              <div className="human-body"></div>

              <div className="orbit orbit-one"></div>

              <div className="orbit orbit-two"></div>

              <div className="orbit orbit-three"></div>

              <div className="twin-node node-one"></div>
              <div className="twin-node node-two"></div>
              <div className="twin-node node-three"></div>

            </div>

          </div>
        </div>


        {/* ================= RIGHT INSPECTOR ================= */}
        <aside className="twin-inspector">

          <small className="inspector-label">
            TWIN INSPECTOR
          </small>

          <h2>{patient.name}</h2>

          <p className="inspector-subtitle">
            {patient.id} · synthetic demonstration record
          </p>

          <div className="inspector-divider"></div>


          <div className="inspector-stat">
            <span>Source records</span>
            <strong>04</strong>
          </div>

          <div className="inspector-stat">
            <span>Mapped resources</span>
            <strong>07</strong>
          </div>

          <div className="inspector-stat">
            <span>Last composition</span>
            <strong>14:42</strong>
          </div>


          <div className="inspector-divider"></div>


          {/* CONTEXT COMPLETE */}
          <div className="context-complete">

            <div className="complete-title">
              <span>✓</span>
              Context complete
            </div>

            <small>
              All Milestone 1 inputs are represented in this twin.
            </small>

          </div>


          <button
            className="inspect-btn"
            onClick={() =>
              onOpenPatient && onOpenPatient(patient)
            }
          >
            Inspect patient record
            <span>→</span>
          </button>

        </aside>

      </section>


      {/* ================= COMPOSITION LAYERS ================= */}
      <section className="panel composition-panel">

        <div className="composition-header">

          <div>
            <small className="label">
              COMPOSITION LAYERS
            </small>

            <h2>What the twin contains</h2>
          </div>

          <span className="layer-count">
            4 layers · 1 patient context
          </span>

        </div>


        <div className="composition-grid">

          {/* CARD 1 */}
          <div className="composition-card">

            <span className="layer-number">01</span>

            <div className="layer-icon">
              ⛓
            </div>

            <h3>FHIR patient</h3>

            <p>
              Hospital / EHR identity and demographics.
            </p>

          </div>


          {/* CARD 2 */}
          <div className="composition-card">

            <span className="layer-number">02</span>

            <div className="layer-icon">
              ♧
            </div>

            <h3>Wearable signals</h3>

            <p>
              Explicitly marked synthetic test vitals.
            </p>

          </div>


          {/* CARD 3 */}
          <div className="composition-card">

            <span className="layer-number">03</span>

            <div className="layer-icon">
              ⚗
            </div>

            <h3>Lab results</h3>

            <p>
              Indexed reports and review state.
            </p>

          </div>


          {/* CARD 4 */}
          <div className="composition-card">

            <span className="layer-number">04</span>

            <div className="layer-icon">
              ♢
            </div>

            <h3>Consent boundary</h3>

            <p>
              Collection, processing, and sharing state.
            </p>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <div className="twin-footer">

        <span>● Synthetic data environment</span>

        <span>
          Milestone 1 · FHIR · Digital Twin · Wearables · Consent
        </span>

        <span>v0.1.0 · Data safety note</span>

      </div>

    </div>
  );
}

export default DigitalHealthTwin;