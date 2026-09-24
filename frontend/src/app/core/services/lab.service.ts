import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { LabReport, PreventiveCare } from '../../models/lab-report.model';
import { Observable, of, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabService {
  private readonly api = inject(ApiService);

  getPatientLabs(patientId: string): Observable<LabReport[]> {
    return this.api.get<LabReport[]>(`/patients/${patientId}/labs`).pipe(
      catchError(() => {
        const fallback: LabReport[] = [
          { id: 'L001', patientId, testName: 'Blood Glucose', value: '112', unit: 'mg/dL', status: 'Attention', referenceRange: '70 - 99 mg/dL', date: '2026-09-08' },
          { id: 'L002', patientId, testName: 'Hemoglobin', value: '13.8', unit: 'g/dL', status: 'Normal', referenceRange: '13.2 - 16.6 g/dL', date: '2026-09-08' },
          { id: 'L003', patientId, testName: 'Cholesterol', value: '188', unit: 'mg/dL', status: 'Normal', referenceRange: '< 200 mg/dL', date: '2026-09-08' },
          { id: 'L004', patientId, testName: 'Serum Creatinine', value: '1.0', unit: 'mg/dL', status: 'Normal', referenceRange: '0.7 - 1.3 mg/dL', date: '2026-09-08' }
        ];
        return of(fallback);
      })
    );
  }

  getPreventiveCare(patientId: string): Observable<PreventiveCare[]> {
    return this.api.get<PreventiveCare[]>(`/patients/${patientId}/preventive-care`).pipe(
      catchError(() => {
        const fallback: PreventiveCare[] = [
          { id: 'PR001', patientId, title: 'Blood pressure monitoring', description: 'Twice daily home systolic/diastolic recording', priority: 'High', status: 'Active', interval: 'Daily' },
          { id: 'PR002', patientId, title: 'Routine glucose screening', description: 'Fasting blood glucose panel follow-up', priority: 'Medium', status: 'Pending', interval: 'Quarterly' },
          { id: 'PR003', patientId, title: 'Annual cardiovascular assessment', description: 'Echocardiogram and resting ECG examination', priority: 'Medium', status: 'Scheduled', interval: 'Annual' },
          { id: 'PR004', patientId, title: 'Healthy lifestyle review', description: 'Sodium reduction counselling and dietary DASH regimen', priority: 'Routine', status: 'Active', interval: 'Ongoing' }
        ];
        return of(fallback);
      })
    );
  }
}
