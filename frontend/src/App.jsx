import React, { useState } from "react";

import Sidebar from "./components/sidebar";

import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Patient360 from "./pages/Patient360";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const [selectedPatient, setSelectedPatient] = useState(null);

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <Dashboard
            setActivePage={setActivePage}
            setSelectedPatient={setSelectedPatient}
          />
        );

      case "patients":
        return (
          <Patients
            setActivePage={setActivePage}
            setSelectedPatient={setSelectedPatient}
          />
        );

      case "patient360":
        return (
          <Patient360
            selectedPatient={selectedPatient}
            setActivePage={setActivePage}
          />
        );

      default:
        return (
          <Dashboard
            setActivePage={setActivePage}
            setSelectedPatient={setSelectedPatient}
          />
        );
    }
  };

  return (
    <div className="app">

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="main-content">
        {renderPage()}
      </div>

    </div>
  );
}

export default App;