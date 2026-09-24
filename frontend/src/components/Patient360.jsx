function Patient360({ patient, onBack }) {
  if (!patient) {
    return (
      <div className="patient360-empty">
        <h2>No patient selected</h2>
        <button onClick={onBack}>← Back to Patients</button>
      </div>
    );
  }

  const initials = patient.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="patient360-page">

      {/* TOP HEADER */}

      <div className="top-header">

        <div className="breadcrumb">
          <span>MediSphere</span>
          <span>→</span>
          <strong>Patient 360</strong>
        </div>

        <div className="top-actions">

          <div className="global-search">
            🔍
            <span>Search patients...</span>
          </div>

          <button className="notification-btn">
            ♧
          </button>

          <div className="user-box">

            <div className="user-avatar">
              AD
            </div>

            <div>
              <strong>admin</strong>
              <small>Mentor workspace</small>
            </div>

          </div>

        </div>

      </div>


      {/* MAIN CONTENT */}

      <main className="patient360-content">

        {/* PAGE TITLE */}

        <div className="patient360-heading">

          <div>

            <small className="section-label">
              PATIENT 360
            </small>

            <h1>
              {patient.name}
            </h1>

            <p>
              Unified synthetic context for {patient.id}.
              Current source data is labeled for mentor review.
            </p>

          </div>

          <div className="heading-actions">

            <span className="twin-active">
              ● Twin active
            </span>

            <button className="consent-btn">
              ♡ Consent
            </button>

          </div>

        </div>


        {/* PATIENT PROFILE */}

        <section className="profile-card">

          <div className="profile-left">

            <div className="large-avatar">
              {initials}
            </div>

            <div className="profile-details">

              <small className="section-label">
                SYNTHETIC PATIENT PROFILE
              </small>

              <h2>
                {patient.name}
              </h2>

              <div className="patient-basic-info">

                <strong>
                  {patient.id}
                </strong>

                <span>•</span>

                <span>
                  {patient.age} years
                </span>

                <span>•</span>

                <span>
                  {patient.gender}
                </span>

              </div>

              <div className="dob">
                ▣ Date of birth
                <strong>
                  {patient.dob || "14 Feb 1984"}
                </strong>
              </div>

            </div>

          </div>


          <div className="profile-status">

            <div>
              <small>DIGITAL TWIN</small>

              <strong className="active-text">
                ● Active
              </strong>
            </div>

            <div>
              <small>CONSENT</small>

              <strong className="granted-text">
                GRANTED
              </strong>
            </div>

            <div>
              <small>LAST SYNC</small>

              <strong>
                2 min ago
              </strong>
            </div>

          </div>

        </section>


        {/* TWO COLUMN AREA */}

        <div className="patient-main-grid">


          {/* LEFT COLUMN */}

          <div className="patient-left-column">


            {/* VITALS */}

            <section className="vitals-section">

              <div className="card-heading">

                <div>

                  <small className="section-label">
                    CURRENT VITALS
                  </small>

                  <h2>
                    Signal snapshot
                  </h2>

                </div>

                <span className="live-feed">
                  ● Live test feed
                </span>

              </div>


              <div className="vitals-grid">


                {/* HEART RATE */}

                <div className="vital-card heart-card">

                  <div className="vital-title">
                    <span className="vital-icon">
                      ♡
                    </span>

                    Heart rate

                    <span>•••</span>
                  </div>

                  <div className="vital-value">
                    {patient.heartRate || 85}
                    <small>bpm</small>
                  </div>

                  <div className="heart-line">
                    ╱╲___╱╲____╱╲__
                  </div>

                  <small className="vital-note">
                    Within demo range
                  </small>

                </div>


                {/* BLOOD PRESSURE */}

                <div className="vital-card bp-card">

                  <div className="vital-title">
                    <span className="vital-icon">
                      ∿
                    </span>

                    Blood pressure

                    <span>•••</span>
                  </div>

                  <div className="vital-value">
                    {patient.bloodPressure || "120/80"}
                    <small>mmHg</small>
                  </div>

                  <div className="bp-bars">
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                  </div>

                  <small className="vital-note">
                    Last synced today
                  </small>

                </div>


                {/* SPO2 */}

                <div className="vital-card oxygen-card">

                  <div className="vital-title">
                    <span className="vital-icon">
                      ⚡
                    </span>

                    Oxygen saturation

                    <span>•••</span>
                  </div>

                  <div className="vital-value">
                    {patient.spo2 || 98}
                    <small>%</small>
                  </div>

                  <div className="oxygen-line">
                    ╱╲_╱╲___╱╲_
                  </div>

                  <small className="vital-note">
                    Stable test signal
                  </small>

                </div>

              </div>

            </section>


            {/* LAB REPORTS */}

            <section className="labs-card">

              <div className="card-heading">

                <div>

                  <small className="section-label">
                    LAB REPORTS
                  </small>

                  <h2>
                    Latest results
                  </h2>

                </div>

                <button className="all-reports">
                  All reports →
                </button>

              </div>


              <div className="lab-grid">

                <div className="lab-item">

                  <small>
                    ● Blood glucose
                  </small>

                  <strong>
                    110
                    <em> mg/dL</em>
                  </strong>

                  <span>
                    31 Aug 2026 · Fasting
                  </span>

                </div>


                <div className="lab-item">

                  <small>
                    ● HbA1c
                  </small>

                  <strong>
                    5.8
                    <em> %</em>
                  </strong>

                  <span>
                    31 Aug 2026 · Reviewed
                  </span>

                </div>


                <div className="lab-review">

                  <span>
                    Reviewed
                  </span>

                  <p>
                    Indexed to twin record
                  </p>

                </div>

              </div>

            </section>


            {/* PATIENT INFORMATION */}

            <section className="patient-info-card">

              <div>

                <small className="section-label">
                  PROFILE FIELDS
                </small>

                <h2>
                  Patient information
                </h2>

              </div>

              <div className="info-fields">

                <div>
                  <small>PATIENT ID</small>
                  <strong>{patient.id}</strong>
                </div>

                <div>
                  <small>GENDER</small>
                  <strong>{patient.gender}</strong>
                </div>

                <div>
                  <small>DATE OF BIRTH</small>
                  <strong>
                    {patient.dob || "14 Feb 1984"}
                  </strong>
                </div>

                <div>
                  <small>DATA MODE</small>
                  <strong>
                    ● Synthetic
                  </strong>
                </div>

              </div>

            </section>

          </div>


          {/* RIGHT COLUMN */}

          <aside className="digital-twin-card">

            <div className="twin-header">

              <div>

                <small>
                  DIGITAL HEALTH TWIN
                </small>

                <h2>
                  Context layer
                </h2>

              </div>

              <span>
                Synced
              </span>

            </div>


            {/* TWIN VISUAL */}

            <div className="twin-visual">

              <div className="orbit orbit-one"></div>
              <div className="orbit orbit-two"></div>
              <div className="orbit orbit-three"></div>

              <div className="human-body">

                <div className="head"></div>

                <div className="body"></div>

              </div>


              <div className="twin-node vitals-node">
                <small>Vitals</small>
                <strong>3 signals</strong>
              </div>

              <div className="twin-node labs-node">
                <small>Labs</small>
                <strong>2 results</strong>
              </div>

              <div className="twin-node consent-node">
                <small>Consent</small>
                <strong>Granted</strong>
              </div>

            </div>


            {/* RECORD COMPOSITION */}

            <div className="record-composition">

              <small>
                RECORD COMPOSITION
              </small>

              <strong>
                FHIR + wearable + lab
              </strong>

              <button>
                ↗
              </button>

            </div>

          </aside>

        </div>


        {/* FOOTER */}

        <div className="patient-footer">

          <span>
            ● Synthetic data environment
          </span>

          <span>
            Milestone 1 · FHIR · Digital Twin · Wearables · Consent
          </span>

          <span>
            v0.1.0 · Data safety note
          </span>

        </div>

      </main>

    </div>
  );
}

export default Patient360;