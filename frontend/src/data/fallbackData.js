export const patients = [
  {
    id: "P001",
    name: "Arun Kumar",
    age: 45,
    gender: "Male",
    condition: "Hypertension",
    status: "Active",

    vitals: {
      heartRate: 78,
      bloodPressure: "128/82",
      spo2: 98,
      temperature: 98.4
    },

    risk: {
      level: "Low",
      score: 24,
      message: "Current health indicators are stable."
    },

    labs: [
      {
        name: "Hemoglobin",
        value: "14.2 g/dL",
        status: "Normal"
      },
      {
        name: "Blood Glucose",
        value: "102 mg/dL",
        status: "Normal"
      },
      {
        name: "Cholesterol",
        value: "188 mg/dL",
        status: "Normal"
      }
    ]
  },

  {
    id: "P002",
    name: "Priya Sharma",
    age: 38,
    gender: "Female",
    condition: "Diabetes",
    status: "Active",

    vitals: {
      heartRate: 84,
      bloodPressure: "132/86",
      spo2: 97,
      temperature: 98.7
    },

    risk: {
      level: "Moderate",
      score: 52,
      message: "Some health indicators require monitoring."
    },

    labs: [
      {
        name: "HbA1c",
        value: "6.8 %",
        status: "High"
      },
      {
        name: "Blood Glucose",
        value: "142 mg/dL",
        status: "High"
      },
      {
        name: "Cholesterol",
        value: "201 mg/dL",
        status: "Borderline"
      }
    ]
  },

  {
    id: "P003",
    name: "Ravi Chandran",
    age: 52,
    gender: "Male",
    condition: "Cardiac Risk",
    status: "Monitoring",

    vitals: {
      heartRate: 92,
      bloodPressure: "146/94",
      spo2: 96,
      temperature: 99.1
    },

    risk: {
      level: "High",
      score: 78,
      message: "Elevated cardiovascular risk detected."
    },

    labs: [
      {
        name: "Troponin",
        value: "0.04 ng/mL",
        status: "Normal"
      },
      {
        name: "LDL",
        value: "156 mg/dL",
        status: "High"
      },
      {
        name: "Triglycerides",
        value: "218 mg/dL",
        status: "High"
      }
    ]
  },

  {
    id: "P004",
    name: "Meena Devi",
    age: 61,
    gender: "Female",
    condition: "Hypertension",
    status: "Active",

    vitals: {
      heartRate: 76,
      bloodPressure: "138/88",
      spo2: 98,
      temperature: 98.2
    },

    risk: {
      level: "Moderate",
      score: 46,
      message: "Blood pressure requires regular monitoring."
    },

    labs: [
      {
        name: "Hemoglobin",
        value: "12.8 g/dL",
        status: "Normal"
      },
      {
        name: "Blood Glucose",
        value: "110 mg/dL",
        status: "Normal"
      },
      {
        name: "Creatinine",
        value: "0.9 mg/dL",
        status: "Normal"
      }
    ]
  },

  {
    id: "P005",
    name: "Karthik Raj",
    age: 29,
    gender: "Male",
    condition: "Healthy",
    status: "Active",

    vitals: {
      heartRate: 72,
      bloodPressure: "118/76",
      spo2: 99,
      temperature: 98.1
    },

    risk: {
      level: "Low",
      score: 12,
      message: "No significant health risks detected."
    },

    labs: [
      {
        name: "Hemoglobin",
        value: "15.1 g/dL",
        status: "Normal"
      },
      {
        name: "Blood Glucose",
        value: "91 mg/dL",
        status: "Normal"
      },
      {
        name: "Cholesterol",
        value: "172 mg/dL",
        status: "Normal"
      }
    ]
  }
];

export const dashboardStats = {
  totalPatients: patients.length,
  activePatients: patients.filter(
    (patient) => patient.status === "Active"
  ).length,
  monitoringPatients: patients.filter(
    (patient) => patient.status === "Monitoring"
  ).length,

  averageAge: Math.round(
    patients.reduce((total, patient) => total + patient.age, 0) /
      patients.length
  )
};

export const alerts = [
  {
    id: 1,
    patientId: "P003",
    patientName: "Ravi Chandran",
    type: "High Risk",
    message: "Elevated cardiovascular risk detected."
  },
  {
    id: 2,
    patientId: "P002",
    patientName: "Priya Sharma",
    type: "Lab Alert",
    message: "Blood glucose and HbA1c are above normal range."
  }
];