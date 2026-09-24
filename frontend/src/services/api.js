const API_BASE_URL = "http://localhost:8080/api";

export const getPatients = async () => {
  const response = await fetch(`${API_BASE_URL}/patients`);

  if (!response.ok) {
    throw new Error("Failed to fetch patients");
  }

  return response.json();
};

export const getPatientById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/patients/${id}`);

  if (!response.ok) {
    throw new Error("Patient not found");
  }

  return response.json();
};

export const createPatient = async (patient) => {
  const response = await fetch(`${API_BASE_URL}/patients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patient),
  });

  if (!response.ok) {
    throw new Error("Failed to create patient");
  }

  return response.json();
};
export const getPatientVitals = async (id) => {
  const response = await fetch(`${API_BASE_URL}/patients/${id}/vitals`);

  if (!response.ok) {
    throw new Error("Failed to fetch patient vitals");
  }

  return response.json();
};