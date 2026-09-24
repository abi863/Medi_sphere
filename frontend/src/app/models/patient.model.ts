import { Vital } from './vital.model';
import { RiskAssessment } from './risk-assessment.model';
import { LabReport, PreventiveCare } from './lab-report.model';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  condition: string;
  status: string; // "Active" | "Monitoring" | "Discharged"
  riskLevel: string; // "Low" | "Medium" | "High"
  riskScore: number; // 0-100
  assignedDoctor?: string;
  roomNumber?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Patient360Response {
  patient: Patient;
  currentVitals: Vital;
  riskAssessment: RiskAssessment;
  labReports: LabReport[];
  preventiveCare: PreventiveCare[];
  dataSource: 'LIVE_CLINICAL' | 'SYNTHETIC_DEMO';
}

export interface PatientFormData {
  name: string;
  age: number;
  gender: string;
  condition: string;
  status?: string;
}
