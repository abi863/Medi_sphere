import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import PatientCard from "../components/PatientCard";
import { getPatients, createPatient } from "../services/api";

function Patients({ setActivePage, setSelectedPatient }) {
  const [patientList, setPatientList] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "Male",
    condition: "Healthy",
  });

  // Load patients from Spring Boot backend
  useEffect(() => {
    const loadPatients = async () => {
      try {
        const data = await getPatients();
        setPatientList(data);
      } catch (error) {
        console.error("Failed to load patients:", error);
      }
    };

    loadPatients();
  }, []);

  const filteredPatients = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    if (!search) {
      return patientList;
    }

    return patientList.filter(
      (patient) =>
        patient.name?.toLowerCase().includes(search) ||
        patient.id?.toLowerCase().includes(search) ||
        patient.condition?.toLowerCase().includes(search)
    );
  }, [searchTerm, patientList]);

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setActivePage("patient360");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setNewPatient((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAddPatient = async (event) => {
    event.preventDefault();

    if (!newPatient.name.trim() || !newPatient.age) {
      alert("Please enter patient name and age.");
      return;
    }

    const patient = {
      name: newPatient.name.trim(),
      age: Number(newPatient.age),
      gender: newPatient.gender,
      condition: newPatient.condition,
    };

    try {
      // Save patient through Spring Boot backend
      const createdPatient = await createPatient(patient);

      // Add returned patient to the current UI list
      setPatientList((previous) => [
        createdPatient,
        ...previous,
      ]);

      // Reset form
      setNewPatient({
        name: "",
        age: "",
        gender: "Male",
        condition: "Healthy",
      });

      setShowAddForm(false);

      alert(`${createdPatient.name} added successfully.`);
    } catch (error) {
      console.error("Failed to create patient:", error);
      alert("Failed to add patient. Please check the backend.");
    }
  };

  return (
    <div className="page">
      <Header
        title="Patients"
        subtitle="Manage and explore your patient population"
      />

      <main className="patients-content">

        {/* Page Header */}
        <section className="patients-page-header">
          <div>
            <span className="panel-eyebrow">
              PATIENT MANAGEMENT
            </span>

            <h2>Patient Registry</h2>

            <p>
              Search patients and access their complete clinical context.
            </p>
          </div>

          <button
            className="primary-button"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? "Close Form" : "+ Add Patient"}
          </button>
        </section>

        {/* Add Patient Form */}
        {showAddForm && (
          <section className="add-patient-panel">
            <div className="panel-header">
              <div>
                <span className="panel-eyebrow">
                  NEW RECORD
                </span>

                <h3>Add Patient</h3>
              </div>
            </div>

            <form
              className="patient-form"
              onSubmit={handleAddPatient}
            >
              <div className="form-group">
                <label>Full Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter patient name"
                  value={newPatient.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Age</label>

                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  min="1"
                  max="120"
                  value={newPatient.age}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Gender</label>

                <select
                  name="gender"
                  value={newPatient.gender}
                  onChange={handleInputChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Condition</label>

                <select
                  name="condition"
                  value={newPatient.condition}
                  onChange={handleInputChange}
                >
                  <option value="Healthy">Healthy</option>
                  <option value="Hypertension">
                    Hypertension
                  </option>
                  <option value="Diabetes">
                    Diabetes
                  </option>
                  <option value="Cardiac Risk">
                    Cardiac Risk
                  </option>
                </select>
              </div>

              <button
                type="submit"
                className="primary-button form-submit"
              >
                Add Patient
              </button>
            </form>
          </section>
        )}

        {/* Search */}
        <section className="patient-search-section">
          <div className="search-box">
            <span className="search-icon">⌕</span>

            <input
              type="text"
              placeholder="Search by name, patient ID or condition..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />
          </div>

          <div className="patient-count">
            <strong>{filteredPatients.length}</strong>
            <span>patients</span>
          </div>
        </section>

        {/* Patient Table */}
        <section className="patients-table-panel">
          <div className="patient-table-header">
            <span>Patient</span>
            <span>Condition</span>
            <span>Status</span>
            <span>Risk</span>
            <span>Action</span>
          </div>

          <div className="patient-table-body">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <PatientCard
                  key={patient.id}
                  patient={patient}
                  onSelect={handlePatientSelect}
                />
              ))
            ) : (
              <div className="empty-state">
                <div className="empty-icon">⌕</div>

                <h3>No patients found</h3>

                <p>
                  Try searching with a different name,
                  patient ID or condition.
                </p>
              </div>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}

export default Patients;