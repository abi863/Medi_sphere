import { Injectable, inject, signal } from '@angular/core';
import { ApiService } from './api.service';
import { Patient, Patient360Response, PatientFormData } from '../../models/patient.model';
import { Observable, of, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private readonly api = inject(ApiService);

  public readonly patients = signal<Patient[]>([]);
  public readonly isDemoMode = signal<boolean>(false);
  public readonly isRealtimeMonitoring = signal<boolean>(true);

  // Synthetic demo patients matching clinical specifications exactly
  private readonly fallbackPatients: Patient[] = [
    {
      id: 'P001',
      name: 'Arun Kumar',
      age: 52,
      gender: 'Male',
      condition: 'Hypertension',
      status: 'Active',
      riskLevel: 'Medium',
      riskScore: 62,
      assignedDoctor: 'Dr. Ananya Sharma',
      roomNumber: 'Cardio-402'
    },
    {
      id: 'P002',
      name: 'Priya Sharma',
      age: 44,
      gender: 'Female',
      condition: 'Diabetes',
      status: 'Monitoring',
      riskLevel: 'Low',
      riskScore: 28,
      assignedDoctor: 'Dr. Ananya Sharma',
      roomNumber: 'Endo-205'
    },
    {
      id: 'P003',
      name: 'Rahul Raj',
      age: 61,
      gender: 'Male',
      condition: 'Cardiac Risk',
      status: 'Active',
      riskLevel: 'High',
      riskScore: 84,
      assignedDoctor: 'Dr. Ananya Sharma',
      roomNumber: 'CCU-108'
    },
    {
      id: 'P004',
      name: 'Meena Devi',
      age: 38,
      gender: 'Female',
      condition: 'Healthy',
      status: 'Active',
      riskLevel: 'Low',
      riskScore: 14,
      assignedDoctor: 'Dr. Ananya Sharma',
      roomNumber: 'Wellness-310'
    },
    {
      id: 'P005',
      name: 'Karthik Anand',
      age: 56,
      gender: 'Male',
      condition: 'Type 2 Diabetes',
      status: 'Monitoring',
      riskLevel: 'Medium',
      riskScore: 58,
      assignedDoctor: 'Dr. Ananya Sharma',
      roomNumber: 'Endo-214'
    }
  ];

  constructor() {
    this.loadPatients();
  }

  loadPatients(search?: string, condition?: string, status?: string): void {
    let url = '/patients';
    const params: string[] = [];
    if (search) params.push(`search=${encodeURIComponent(search)}`);
    if (condition) params.push(`condition=${encodeURIComponent(condition)}`);
    if (status) params.push(`status=${encodeURIComponent(status)}`);
    if (params.length > 0) url += `?${params.join('&')}`;

    this.api.get<Patient[]>(url).pipe(
      catchError(() => {
        this.isDemoMode.set(true);
        let list = [...this.fallbackPatients];
        if (search) {
          const q = search.toLowerCase();
          list = list.filter(p => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.condition.toLowerCase().includes(q));
        }
        if (condition) {
          list = list.filter(p => p.condition.toLowerCase() === condition.toLowerCase());
        }
        if (status) {
          list = list.filter(p => p.status.toLowerCase() === status.toLowerCase());
        }
        return of(list);
      })
    ).subscribe(data => {
      this.patients.set(data);
    });
  }

  getPatientById(id: string): Observable<Patient> {
    return this.api.get<Patient>(`/patients/${id}`).pipe(
      catchError(() => {
        this.isDemoMode.set(true);
        const p = this.fallbackPatients.find(item => item.id === id) || this.fallbackPatients[0];
        return of(p);
      })
    );
  }

  getPatient360(id: string): Observable<Patient360Response> {
    return this.api.get<Patient360Response>(`/patients/${id}/360`).pipe(
      catchError(() => {
        this.isDemoMode.set(true);
        return of(this.generateSynthetic360(id));
      })
    );
  }

  addPatient(formData: PatientFormData): Observable<Patient> {
    return this.api.post<Patient>('/patients', formData).pipe(
      catchError(() => {
        // Resilient in-memory fallback for demo mode
        const newId = `P00${this.fallbackPatients.length + 1}`;
        let riskScore = 30;
        let riskLevel = 'Low';
        if (formData.condition.toLowerCase().includes('cardiac')) {
          riskScore = 80;
          riskLevel = 'High';
        } else if (formData.condition.toLowerCase().includes('diabetes') || formData.condition.toLowerCase().includes('hypertension')) {
          riskScore = 58;
          riskLevel = 'Medium';
        }

        const newPatient: Patient = {
          id: newId,
          name: formData.name,
          age: formData.age,
          gender: formData.gender,
          condition: formData.condition,
          status: formData.status || 'Active',
          riskLevel,
          riskScore,
          assignedDoctor: 'Dr. Ananya Sharma'
        };
        this.fallbackPatients.unshift(newPatient);
        this.patients.update(prev => [newPatient, ...prev]);
        return of(newPatient);
      }),
      tap(created => {
        if (!this.fallbackPatients.some(p => p.id === created.id)) {
          this.fallbackPatients.unshift(created);
          this.patients.update(prev => [created, ...prev]);
        }
      })
    );
  }

  private generateSynthetic360(id: string): Patient360Response {
    const patient = this.fallbackPatients.find(p => p.id === id) || {
      id,
      name: 'Arun Kumar',
      age: 52,
      gender: 'Male',
      condition: 'Hypertension',
      status: 'Active',
      riskLevel: 'Medium',
      riskScore: 62,
      assignedDoctor: 'Dr. Ananya Sharma'
    };

    const isHighRisk = patient.riskLevel === 'High';

    return {
      patient,
      currentVitals: {
        patientId: id,
        heartRate: isHighRisk ? 88 : 72,
        systolicBp: isHighRisk ? 154 : 128,
        diastolicBp: isHighRisk ? 94 : 82,
        spo2: isHighRisk ? 96.5 : 98.0,
        temperature: isHighRisk ? 99.1 : 98.4,
        bloodPressureFormatted: isHighRisk ? '154/94 mmHg' : '128/82 mmHg',
        status: isHighRisk ? 'Attention' : 'Normal',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      },
      riskAssessment: {
        patientId: id,
        level: patient.riskLevel as 'LOW' | 'MEDIUM' | 'HIGH',
        score: patient.riskScore,
        message: isHighRisk
          ? 'Elevated cardiovascular risk detected. Focused clinical monitoring advised.'
          : 'Current indicators suggest increased monitoring may be appropriate.',
        contributingFactors: isHighRisk
          ? ['Systolic Blood Pressure', 'Troponin I Marker', 'Age > 60', 'Elevated Lipids']
          : ['Blood Pressure', 'Glucose', 'Age', 'Previous Condition'],
        recommendations: isHighRisk
          ? ['Continuous ECG telemetry', 'Cardiology consult', 'Titrate antihypertensive therapy']
          : ['Home blood pressure telemonitoring', 'Sodium restriction diet', 'Routine metabolic screen in 30 days'],
        insightLabel: 'AI-Assisted Insight',
        disclaimer: 'AI-generated decision-support information based on synthetic healthcare data. This is not a medically validated diagnosis.',
        modelArchitecture: 'TensorFlow Federated Aggregation (FedAvg across synthetic hospital nodes)',
        evaluatedAt: new Date().toISOString()
      },
      labReports: isHighRisk ? [
        { id: 'L005', patientId: id, testName: 'Troponin I', value: '0.05', unit: 'ng/mL', status: 'Attention', referenceRange: '< 0.04 ng/mL', date: '2026-09-10' },
        { id: 'L006', patientId: id, testName: 'Total Cholesterol', value: '242', unit: 'mg/dL', status: 'Elevated', referenceRange: '< 200 mg/dL', date: '2026-09-10' },
        { id: 'L007', patientId: id, testName: 'LDL Cholesterol', value: '162', unit: 'mg/dL', status: 'Elevated', referenceRange: '< 100 mg/dL', date: '2026-09-10' },
        { id: 'L008', patientId: id, testName: 'Blood Glucose', value: '128', unit: 'mg/dL', status: 'Attention', referenceRange: '70 - 99 mg/dL', date: '2026-09-10' }
      ] : [
        { id: 'L001', patientId: id, testName: 'Blood Glucose', value: '112', unit: 'mg/dL', status: 'Attention', referenceRange: '70 - 99 mg/dL', date: '2026-09-08' },
        { id: 'L002', patientId: id, testName: 'Hemoglobin', value: '13.8', unit: 'g/dL', status: 'Normal', referenceRange: '13.2 - 16.6 g/dL', date: '2026-09-08' },
        { id: 'L003', patientId: id, testName: 'Cholesterol', value: '188', unit: 'mg/dL', status: 'Normal', referenceRange: '< 200 mg/dL', date: '2026-09-08' },
        { id: 'L004', patientId: id, testName: 'Serum Creatinine', value: '1.0', unit: 'mg/dL', status: 'Normal', referenceRange: '0.7 - 1.3 mg/dL', date: '2026-09-08' }
      ],
      preventiveCare: isHighRisk ? [
        { id: 'PR005', patientId: id, title: 'Continuous cardiac rhythm evaluation', description: 'Holter ambulatory telemetry monitoring', priority: 'High', status: 'Active', interval: 'Continuous' },
        { id: 'PR006', patientId: id, title: 'Lipid profile reassessment', description: 'Post-statin therapy lipid panel verification', priority: 'High', status: 'Scheduled', interval: 'Monthly' },
        { id: 'PR007', patientId: id, title: 'Cardiology specialist consultation', description: 'Review ventricular wall motion and exercise tolerance', priority: 'High', status: 'Scheduled', interval: 'Bi-weekly' },
        { id: 'PR008', patientId: id, title: 'Cardiac rehabilitation program', description: 'Supervised aerobic exercise and stress reduction protocol', priority: 'Medium', status: 'Active', interval: 'Weekly' }
      ] : [
        { id: 'PR001', patientId: id, title: 'Blood pressure monitoring', description: 'Twice daily home systolic/diastolic recording', priority: 'High', status: 'Active', interval: 'Daily' },
        { id: 'PR002', patientId: id, title: 'Routine glucose screening', description: 'Fasting blood glucose panel follow-up', priority: 'Medium', status: 'Pending', interval: 'Quarterly' },
        { id: 'PR003', patientId: id, title: 'Annual cardiovascular assessment', description: 'Echocardiogram and resting ECG examination', priority: 'Medium', status: 'Scheduled', interval: 'Annual' },
        { id: 'PR004', patientId: id, title: 'Healthy lifestyle review', description: 'Sodium reduction counselling and dietary DASH regimen', priority: 'Routine', status: 'Active', interval: 'Ongoing' }
      ],
      dataSource: 'SYNTHETIC_DEMO'
    };
  }
}
