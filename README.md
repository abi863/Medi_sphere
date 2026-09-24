# MEDISPHERE COGNITIVE TWIN

**Clinical Intelligence, Unified.**

An enterprise-grade, modern healthcare intelligence platform providing clinicians with unified patient context, continuous vital telemetry, risk assessment, AI-assisted decision support, preventive-care surveillance, and an interactive **Digital Health Twin** physiological overview.

---

> [!IMPORTANT]
> **Synthetic Healthcare Data & Clinical Decision-Support Notice**
> This application is built as a student/project demonstration using **SYNTHETIC HEALTHCARE DATA**. No real patient information is utilized. All AI predictions, risk scores, and digital twin insights serve strictly as **decision-support information**, NOT as medically validated diagnoses.

> [!NOTE]
> **HIPAA-Oriented Technical Safeguards**
> Medisphere implements HIPAA-aligned safeguards including role-based access control, cryptographic JWT session validation, and complete clinical audit trails (`AuditLog`). This demonstration does not claim certified regulatory compliance.

---

## 1. Architecture Overview

```
                         CLINICIAN / DOCTOR
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │   Angular 20 Frontend   │
                    │ (Standalone Components) │
                    └────────────┬────────────┘
                                 │ HTTPS / REST (JWT)
                                 ▼
                    ┌─────────────────────────┐
                    │   Spring Boot 4 /       │
                    │   Java 25 Backend       │
                    └────────────┬────────────┘
                                 │
            ┌────────────────────┼────────────────────┐
            ▼                    ▼                    ▼
     ┌─────────────┐      ┌─────────────┐      ┌──────────────┐
     │   MongoDB   │      │Apache Kafka │      │ FHIR & SMART │
     │ (HIPAA Vault│      │  (Streams)  │      │   on FHIR    │
     │  Storage)   │      └──────┬──────┘      └──────────────┘
     └─────────────┘             │
                                 ▼
                     ┌────────────────────────┐
                     │  TensorFlow Federated  │
                     │      AI/ML (ai/)       │
                     │   Multi-Hospital Node  │
                     │    FedAvg Simulation   │
                     └───────────┬────────────┘
                                 │
                                 ▼
                     ┌────────────────────────┐
                     │ Risk Scoring, Insights │
                     │  & Preventive Care     │
                     └────────────────────────┘

                 Docker Compose + Kubernetes Manifests
```

### Architectural Principles:
1. **Separation of Concerns**: Angular NEVER connects directly to MongoDB; all queries traverse Spring Boot REST endpoints with input validation.
2. **Resilient Demo Mode**: If external services (MongoDB, Kafka, FHIR servers) are offline, both frontend and backend automatically fall back to an in-memory synthetic seed store, ensuring full interactive functionality.

---

## 2. Technology Stack

| Domain | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | Angular 20 | Modern standalone components, Signals, Reactive Forms, SCSS, Tailwind CSS |
| **Backend** | Java 25, Spring Boot 4 | Spring Data MongoDB, Spring Kafka, Spring Security, Jakarta Validation |
| **Database** | MongoDB | Collections: `patients`, `vitals`, `lab_reports`, `risk_assessments`, `audit_logs` |
| **Event Streaming** | Apache Kafka | Topics: `patient.vitals`, `patient.observations`, `patient.alerts`, etc. |
| **AI / Machine Learning** | TensorFlow Federated | Decentralized multi-hospital federated learning simulation (`FedAvg`) |
| **Healthcare Standards** | HL7 FHIR, SMART on FHIR | FHIR R4 Patient/Observation mappings and OAuth 2.0 Capability Statements |
| **Security** | HIPAA-Oriented | Stateless JWT tokens, role-based security, comprehensive clinical audit logging |
| **DevOps & Containers** | Docker & Kubernetes | Multi-stage Dockerfiles, Docker Compose, Kubernetes Deployments/Services |

---

## 3. Directory Structure

```
medisphere-cognitive-twin/
├── frontend/                     # Angular 20 Single-Page Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/services/    # api, patient, vital, lab, risk, auth services
│   │   │   ├── models/           # patient, vital, lab-report, risk-assessment interfaces
│   │   │   ├── components/       # sidebar, header, vital-card, risk-card, digital-twin, alert-card
│   │   │   ├── pages/            # login, dashboard, patients, patient-360
│   │   │   └── guards/           # auth.guard.ts
│   │   ├── index.html            # Clinical design system & typography
│   │   └── styles.scss           # Animation primitives and scrollbars
│   ├── Dockerfile                # Multi-stage Angular build with Nginx
│   └── nginx.conf                # Nginx reverse proxy routing
├── backend/                      # Spring Boot 4 / Java 25 Microservice
│   ├── src/main/java/com/medisphere/backend/
│   │   ├── controller/           # Patient, Vital, LabReport, Risk, Fhir, Health controllers
│   │   ├── service/              # Patient, Vital, LabReport, Risk, Fhir, AuthService
│   │   ├── repository/           # Spring Data Mongo repositories
│   │   ├── model/                # Patient, Vital, LabReport, RiskAssessment, AuditLog
│   │   ├── dto/                  # PatientRequest/Response, AuthRequest/Response, HealthStatus
│   │   ├── config/               # Security, Cors, Mongo, Kafka configurations
│   │   ├── fhir/                 # FHIR R4 DTOs and SMART on FHIR authorization metadata
│   │   ├── kafka/                # Producers, Consumers, and Demo Telemetry Generators
│   │   ├── audit/                # HIPAA audit service
│   │   └── security/             # JWT utility and authentication filter
│   ├── src/main/resources/       # application.properties
│   ├── pom.xml                   # Maven project descriptor (Java 25 compatible)
│   └── Dockerfile                # Multi-stage backend container
├── ai/                           # TensorFlow Federated AI/ML Module
│   ├── federated_risk_model.py   # Multi-hospital FedAvg aggregation simulation
│   ├── service.py                # Standalone HTTP inference microservice
│   └── README.md                 # Federated learning mathematical specification
├── infrastructure/kubernetes/    # Kubernetes Orchestration Manifests
│   ├── configmap.yaml            # Platform configuration
│   ├── secret.yaml               # Sensitive credential templates
│   ├── frontend-deployment.yaml  # Angular web deployment
│   ├── frontend-service.yaml     # ClusterIP service
│   ├── backend-deployment.yaml   # Spring Boot deployment
│   ├── backend-service.yaml      # ClusterIP service
│   ├── mongodb-deployment.yaml   # MongoDB persistent pod
│   ├── mongodb-service.yaml      # MongoDB service
│   ├── kafka-deployment.yaml     # Kafka & Zookeeper pod
│   └── kafka-service.yaml        # Kafka streaming service
├── docker-compose.yml            # Multi-container local orchestration
├── .env.example                  # Environment configuration template
└── README.md                     # Platform documentation
```

---

## 4. Demo Login Credentials

Use the following credentials on the `/login` screen:

- **Email**: `doctor@medisphere.demo`
- **Password**: `demo123`
- **Clinician**: Dr. Ananya Sharma
- **Role**: Clinical Administrator

---

## 5. Quick Start: Running Locally

### Prerequisites
- Node.js 20+ / 24+
- Java 21+ / 25
- Apache Maven 3.9+
- Python 3.9+ (for AI simulation)

### Step 1: Start the Backend
```bash
cd backend
mvn spring-boot:run
```
*The Spring Boot backend will start on `http://localhost:8080`.*

### Step 2: Start the Frontend
```bash
cd frontend
npm start
```
*Open `http://localhost:4200` in your web browser.*

### Step 3: (Optional) Run the TensorFlow Federated Simulation
```bash
cd ai
python federated_risk_model.py
```

---

## 6. Docker Deployment

To launch the full suite (Frontend, Backend, MongoDB, Kafka, Zookeeper) with Docker Compose:

```bash
# Copy environment file
cp .env.example .env

# Build and run containers
docker compose up --build -d
```

- **Frontend Application**: `http://localhost`
- **Backend REST API**: `http://localhost:8080/api`
- **MongoDB**: `localhost:27017`
- **Kafka**: `localhost:9092`

---

## 7. Kubernetes Deployment

To deploy to a Kubernetes cluster (e.g. Minikube, kind, or cloud EKS/GKE):

```bash
cd infrastructure/kubernetes

# Apply configurations and secrets
kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml

# Deploy database and event stream
kubectl apply -f mongodb-deployment.yaml
kubectl apply -f mongodb-service.yaml
kubectl apply -f kafka-deployment.yaml
kubectl apply -f kafka-service.yaml

# Deploy backend and frontend
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml
```

---

## 8. REST API Specification

### Patient Management
- `GET /api/patients` - Retrieve all patients with optional search & filter (`?search=Arun&condition=Hypertension&status=Active`)
- `GET /api/patients/{id}` - Retrieve patient profile
- `GET /api/patients/{id}/360` - Retrieve comprehensive Patient 360 payload
- `POST /api/patients` - Register new patient (validated with Jakarta Bean Validation)
- `PUT /api/patients/{id}` - Update patient records
- `DELETE /api/patients/{id}` - Discharge and archive patient

### Physiological Telemetry
- `GET /api/patients/{id}/vitals` - Retrieve latest telemetry packet
- `POST /api/patients/{id}/vitals` - Ingest sensor telemetry
- `POST /api/patients/{id}/vitals/simulate` - Generate simulated Kafka telemetry

### Risk Assessment & AI Insights
- `GET /api/patients/{id}/risk` - Retrieve risk score, category, and contributing factors
- `GET /api/patients/{id}/insights` - Retrieve TensorFlow Federated clinical insights

### Laboratory & Preventive Care
- `GET /api/patients/{id}/labs` - Retrieve diagnostic panels and reference ranges
- `GET /api/patients/{id}/preventive-care` - Retrieve clinical surveillance schedule

### FHIR & SMART on FHIR Interoperability
- `GET /api/fhir/metadata` - SMART on FHIR OAuth 2.0 CapabilityStatement
- `GET /api/fhir/Patient/{id}` - HL7 FHIR R4 Patient resource
- `GET /api/fhir/Observation?patient={id}` - HL7 FHIR R4 Observation resource (LOINC codes)

### Platform Health & Security Audit
- `GET /api/health` - Basic health check
- `GET /api/health/status` - Microservice dependency status
- `GET /api/health/audit-logs` - HIPAA audit trail inspection

---

## 9. Simulation vs. Live Integration Details

| Feature | In Demo Mode | In Live Production Mode |
| :--- | :--- | :--- |
| **MongoDB** | Fast fallback memory cache seeded with 5 synthetic profiles | Persistent Spring Data MongoDB replica set |
| **Kafka** | In-process timer generator simulating live vitals | Apache Kafka cluster with topic partitions |
| **FHIR Server** | Built-in FHIR R4 DTO exporter | External EHR FHIR server integration via SMART OAuth |
| **TensorFlow Federated** | Simulated FedAvg aggregation across 3 nodes | Distributed hospital edge nodes with secure aggregation |
