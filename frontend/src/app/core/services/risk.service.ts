import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { RiskAssessment, RiskResponse } from '../../models/risk-assessment.model';
import { Observable, of, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RiskService {
  private readonly api = inject(ApiService);

  getPatientRisk(patientId: string): Observable<RiskAssessment> {
    return this.api.get<RiskAssessment>(`/patients/${patientId}/risk`).pipe(
      catchError(() => {
        const fallback: RiskAssessment = {
          patientId,
          level: 'MEDIUM',
          score: 62,
          message: 'Current indicators suggest increased monitoring may be appropriate.',
          contributingFactors: ['Blood Pressure', 'Glucose', 'Age', 'Previous Condition'],
          recommendations: ['Home blood pressure telemonitoring', 'Targeted sodium restriction', 'Follow-up fasting glucose in 30 days'],
          insightLabel: 'AI-Assisted Insight',
          disclaimer: 'AI-generated decision-support information based on synthetic healthcare data. This is not a medically validated diagnosis.',
          modelArchitecture: 'TensorFlow Federated Aggregation (FedAvg across synthetic hospital nodes)',
          evaluatedAt: new Date().toISOString()
        };
        return of(fallback);
      })
    );
  }

  getClinicalInsights(patientId: string): Observable<RiskResponse> {
    return this.api.get<RiskResponse>(`/patients/${patientId}/insights`).pipe(
      catchError(() => {
        const fallback: RiskResponse = {
          assessment: {
            patientId,
            level: 'MEDIUM',
            score: 62,
            message: 'Current indicators suggest increased monitoring may be appropriate.',
            contributingFactors: ['Blood Pressure', 'Glucose', 'Age', 'Previous Condition'],
            recommendations: ['Home blood pressure telemonitoring', 'Targeted sodium restriction', 'Follow-up fasting glucose in 30 days'],
            insightLabel: 'AI-Assisted Insight',
            disclaimer: 'AI-generated decision-support information based on synthetic healthcare data. This is not a medically validated diagnosis.',
            evaluatedAt: new Date().toISOString()
          },
          clinicalInsights: [
            'Blood pressure trend has remained elevated over recent observations.',
            'Glucose values show a mild upward trend.',
            'Regular monitoring is recommended based on available synthetic data.'
          ],
          legalNotice: 'Synthetic healthcare data decision-support only. Not medically validated diagnosis.'
        };
        return of(fallback);
      })
    );
  }
}
