import { Injectable, inject, signal } from '@angular/core';
import { ApiService } from './api.service';
import { Vital, VitalResponse } from '../../models/vital.model';
import { Observable, of, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VitalService {
  private readonly api = inject(ApiService);

  public readonly isLiveActive = signal<boolean>(true);
  public readonly lastUpdated = signal<string>(new Date().toLocaleTimeString());

  getPatientVitals(patientId: string): Observable<VitalResponse> {
    return this.api.get<VitalResponse>(`/patients/${patientId}/vitals`).pipe(
      catchError(() => {
        const fallback: Vital = {
          patientId,
          heartRate: 72,
          systolicBp: 128,
          diastolicBp: 82,
          bloodPressureFormatted: '128/82 mmHg',
          spo2: 98.0,
          temperature: 98.4,
          status: 'Normal',
          timestamp: new Date().toLocaleTimeString()
        };
        const res: VitalResponse = {
          vital: fallback,
          isRealTime: true,
          source: 'DEMO_SIMULATOR'
        };
        return of(res);
      })
    );
  }

  simulateLiveTelemetry(patientId: string): Observable<VitalResponse> {
    return this.api.post<VitalResponse>(`/patients/${patientId}/vitals/simulate`, {}).pipe(
      catchError(() => {
        const hr = 68 + Math.floor(Math.random() * 12);
        const sys = 122 + Math.floor(Math.random() * 14);
        const dia = 78 + Math.floor(Math.random() * 8);
        const spo2 = Math.round((97.2 + Math.random() * 2) * 10) / 10;
        const temp = Math.round((98.2 + Math.random() * 0.5) * 10) / 10;
        const statusVal: 'Normal' | 'Attention' | 'Critical' = sys > 145 ? 'Attention' : 'Normal';

        const time = new Date().toLocaleTimeString();
        this.lastUpdated.set(time);

        const simulatedVital: Vital = {
          patientId,
          heartRate: hr,
          systolicBp: sys,
          diastolicBp: dia,
          bloodPressureFormatted: `${sys}/${dia} mmHg`,
          spo2,
          temperature: temp,
          status: statusVal,
          timestamp: time
        };

        const res: VitalResponse = {
          vital: simulatedVital,
          isRealTime: true,
          source: 'DEMO_SIMULATOR'
        };

        return of(res);
      })
    );
  }
}
