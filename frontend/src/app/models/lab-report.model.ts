export interface LabReport {
  id: string;
  patientId: string;
  testName: string;
  value: string;
  unit: string;
  status: 'Normal' | 'Attention' | 'Elevated' | 'Critical';
  referenceRange: string;
  date: string;
}

export interface PreventiveCare {
  id: string;
  patientId: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Routine';
  status: 'Scheduled' | 'Pending' | 'Active' | 'Completed';
  interval: string;
}
