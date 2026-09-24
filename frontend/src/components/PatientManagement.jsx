import { useState } from "react";

function PatientManagement({
  patients,
  setPatients,
  onOpenPatient,
}) {
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "",
    condition: "",
  });

  const [search, setSearch] = useState("");

  // Input change
  const handleChange = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  };

  // Add patient
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !patient.name.trim() ||
      !patient.age ||
      !patient.gender ||
      !patient.condition.trim()
    ) {
      alert("Please fill all patient details");
      return;
    }

    const newPatient = {
      id: `P${String(patients.length + 1).padStart(3, "0")}`,
      name: patient.name.trim(),
      age: Number(patient.age),
      gender: patient.gender,
      condition: patient.condition.trim(),

      // Default synthetic vital data
      heartRate: 80,
      bloodPressure: "120/80",
      spo2: 98,
      temperature: "98.6°F",

      status: "Active",
      twin: "Active",
      fhir: "Connected",
      wearable: "Connected",
      consent: "Granted",
    };

    const updatedPatients = [...patients, newPatient];

    setPatients(updatedPatients);

    // Save patients in browser
    localStorage.setItem(
      "medisphere_patients",
      JSON.stringify(updatedPatients)
    );

    // Clear form
    setPatient({
      name: "",
      age: "",
      gender: "",
      condition: "",
    });

    alert(`${newPatient.name} added successfully!`);
  };

  // Search
  const filteredPatients = patients.filter((p) => {
    const searchText = search.toLowerCase();

    return (
      p.name.toLowerCase().includes(searchText) ||
      p.id.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="dashboard">

      {/* PAGE HEADER */}
      <section className="patients-header">
        <div>
          <small className="label">
            PATIENT REGISTRY
          </small>

          <h1>Patients</h1>

          <p>
            Synthetic profiles across the active
            Milestone 1 demonstration set.
          </p>
        </div>

        <div className="total-patients">
          <span>Total Patients</span>

          <strong>
            {patients.length}
          </strong>
        </div>
      </section>

      {/* ADD PATIENT */}
      <section className="panel add-patient-panel">

        <small className="label">
          NEW PATIENT
        </small>

        <h2>Add Patient</h2>

        <form
          className="patient-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">
            <label>Patient Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter patient name"
              value={patient.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Age</label>

            <input
              type="number"
              name="age"
              placeholder="Enter age"
              min="1"
              max="120"
              value={patient.age}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Gender</label>

            <select
              name="gender"
              value={patient.gender}
              onChange={handleChange}
            >
              <option value="">
                Select gender
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </div>

          <div className="form-group condition-field">
            <label>Medical Condition</label>

            <input
              type="text"
              name="condition"
              placeholder="Enter medical condition"
              value={patient.condition}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="primary-btn add-btn"
          >
            + Add Patient
          </button>

        </form>
      </section>

      {/* PATIENT LIST */}
      <section className="panel patient-list-panel">

        <div className="patient-list-header">

          <div>
            <small className="label">
              PATIENT REGISTRY
            </small>

            <h2>All Patients</h2>
          </div>

          <input
            className="patient-search"
            type="text"
            placeholder="Search by patient ID or name"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        {/* TABLE */}
        {filteredPatients.length > 0 ? (

          <div className="patient-table-wrapper">

            <table className="patients-table">

              <thead>
                <tr>
                  <th>PATIENT</th>
                  <th>AGE</th>
                  <th>GENDER</th>
                  <th>HEART RATE</th>
                  <th>BLOOD PRESSURE</th>
                  <th>SPO2</th>
                  <th>TWIN</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>

                {filteredPatients.map((p) => (

                  <tr key={p.id}>

                    {/* PATIENT */}
                    <td>
                      <div className="patient-name-cell">

                        <div className="patient-avatar-small">
                          {p.name
                            .substring(0, 2)
                            .toUpperCase()}
                        </div>

                        <div>
                          <strong>
                            {p.name}
                          </strong>

                          <small>
                            {p.id}
                          </small>
                        </div>

                      </div>
                    </td>

                    {/* AGE */}
                    <td>
                      {p.age}
                    </td>

                    {/* GENDER */}
                    <td>
                      {p.gender}
                    </td>

                    {/* HEART RATE */}
                    <td>
                      <span className="vital-dot">
                        ●
                      </span>{" "}
                      {p.heartRate} bpm
                    </td>

                    {/* BLOOD PRESSURE */}
                    <td>
                      <span className="bp-dot">
                        ●
                      </span>{" "}
                      {p.bloodPressure} mmHg
                    </td>

                    {/* SPO2 */}
                    <td>
                      <span className="vital-dot">
                        ●
                      </span>{" "}
                      {p.spo2}%
                    </td>

                    {/* TWIN */}
                    <td>
                      <span className="status status-active">
                        {p.twin}
                      </span>
                    </td>

                    {/* OPEN */}
                    <td>
                      <button
                        type="button"
                        className="open-btn"
                        onClick={() => onOpenPatient(p)}
                      >
                        Open →
                      </button>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        ) : (

          <div className="empty-patients">

            <div>◉</div>

            <strong>
              No patients found
            </strong>

            <p>
              Add a patient above to create
              the first patient record.
            </p>

          </div>

        )}

      </section>

    </div>
  );
}

export default PatientManagement;