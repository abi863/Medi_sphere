import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { VitalCardComponent } from '../../components/vital-card/vital-card.component';
import { RiskCardComponent } from '../../components/risk-card/risk-card.component';
import { DigitalTwinComponent } from '../../components/digital-twin/digital-twin.component';
import { LabReportCardComponent } from '../../components/lab-report-card/lab-report-card.component';
import { PatientService } from '../../core/services/patient.service';
import { VitalService } from '../../core/services/vital.service';
import { Patient, Patient360Response } from '../../models/patient.model';
import { Vital } from '../../models/vital.model';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-patient-360',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    VitalCardComponent,
    RiskCardComponent,
    DigitalTwinComponent,
    LabReportCardComponent
  ],
  template: `
    <div class="min-h-screen bg-slate-50 flex flex-col">
      <app-header title="Patient 360" subtitle="Unified clinical context & cognitive twin intelligence"></app-header>

      <main class="flex-1 p-8 max-w-7xl mx-auto w-full space-y-6">
        <!-- Top Back Breadcrumb & Controls -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <a routerLink="/patients" class="inline-flex items-center text-xs font-semibold text-slate-600 hover:text-blue-600 transition space-x-1.5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            <span>Back to Patients</span>
          </a>

          <!-- Real-Time Monitoring Telemetry Control -->
          <div class="flex items-center space-x-3 self-start sm:self-auto">
            <div class="flex items-center space-x-2 px-3.5 py-1.5 bg-white border border-slate-200/90 rounded-full shadow-sm text-xs">
              <span class="relative flex h-2.5 w-2.5">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span class="font-bold text-slate-800">Live Telemetry</span>
              <span class="text-slate-400">&bull;</span>
              <span class="font-mono text-slate-500 text-[11px]">{{ lastUpdated() }}</span>
            </div>

            <!-- Manual Simulate Trigger Button -->
            <button (click)="triggerTelemetryUpdate()"
                    title="Simulate Real-time Sensor Packet"
                    class="px-3 py-1.5 bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border border-cyan-200 rounded-full text-xs font-semibold shadow-sm transition flex items-center space-x-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              <span>Push Telemetry</span>
            </button>
          </div>
        </div>

        <!-- Patient Profile Card -->
        @if (data()?.patient; as p) {
          <div class="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div class="flex items-center space-x-4">
              <!-- Avatar -->
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-blue-500/15 ring-4 ring-blue-50">
                {{ getInitials(p.name) }}
              </div>
              <div>
                <div class="flex items-center space-x-3">
                  <h2 class="text-xl font-bold text-slate-900">{{ p.name }}</h2>
                  <span class="px-2.5 py-0.5 rounded-full font-mono text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                    {{ p.id }}
                  </span>
                  <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold" [ngClass]="getStatusBadge(p.status)">
                    <span class="w-1.5 h-1.5 rounded-full mr-1.5" [ngClass]="getStatusDot(p.status)"></span>
                    {{ p.status }}
                  </span>
                </div>
                <div class="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-slate-500">
                  <span><strong class="text-slate-700 font-semibold">{{ p.age }}</strong> years</span>
                  <span>&bull;</span>
                  <span><strong class="text-slate-700 font-semibold">{{ p.gender }}</strong></span>
                  <span>&bull;</span>
                  <span>Condition: <strong class="text-slate-800 font-semibold">{{ p.condition }}</strong></span>
                  <span>&bull;</span>
                  <span>Attending: <strong class="text-slate-700 font-semibold">{{ p.assignedDoctor || 'Dr. Ananya Sharma' }}</strong></span>
                </div>
              </div>
            </div>

            <!-- Profile Badges -->
            <div class="flex items-center space-x-3 self-end md:self-auto">
              <div class="text-right">
                <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Risk Classification</span>
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mt-0.5" [ngClass]="getRiskBadge(p.riskLevel)">
                  {{ p.riskLevel }} (Score: {{ p.riskScore }})
                </span>
              </div>
            </div>
          </div>
        }

        <!-- Current Vitals: 4 Large Tiles -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <!-- Heart Rate -->
          <app-vital-card
            label="Heart Rate"
            [value]="currentVitals()?.heartRate || 72"
            unit="bpm"
            [status]="currentVitals()?.status || 'Normal'"
            [updatedTime]="lastUpdated()"
            type="heart">
            <svg icon class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </app-vital-card>

          <!-- Blood Pressure -->
          <app-vital-card
            label="Blood Pressure"
            [value]="getBpFormatted()"
            unit="mmHg"
            [status]="currentVitals()?.status || 'Normal'"
            [updatedTime]="lastUpdated()"
            type="bp">
            <svg icon class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </app-vital-card>

          <!-- SpO2 -->
          <app-vital-card
            label="SpO2"
            [value]="currentVitals()?.spo2 || 98"
            unit="%"
            [status]="currentVitals()?.status || 'Normal'"
            [updatedTime]="lastUpdated()"
            type="spo2">
            <svg icon class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z"/>
            </svg>
          </app-vital-card>

          <!-- Temperature -->
          <app-vital-card
            label="Temperature"
            [value]="currentVitals()?.temperature || 98.4"
            unit="°F"
            [status]="currentVitals()?.status || 'Normal'"
            [updatedTime]="lastUpdated()"
            type="temp">
            <svg icon class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          </app-vital-card>
        </div>

        <!-- Section: Digital Health Twin Visualization -->
        <div>
          <app-digital-twin [vitals]="currentVitals()" [isLive]="true"></app-digital-twin>
        </div>

        <!-- Dual Column: Risk Assessment + AI Clinical Insights -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Risk Assessment Card -->
          <app-risk-card [risk]="data()?.riskAssessment || null"></app-risk-card>

          <!-- AI Clinical Insights Card -->
          <div class="bg-white rounded-xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between pb-4 border-b border-slate-100">
                <div class="flex items-center space-x-2.5">
                  <div class="w-8 h-8 rounded-lg bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-sm font-bold text-slate-900">AI-Assisted Clinical Insights</h3>
                    <p class="text-[11px] text-slate-500">TensorFlow Federated pattern detection</p>
                  </div>
                </div>
                <span class="text-xs font-semibold text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-200">
                  TFF Inference
                </span>
              </div>

              <!-- Insights List -->
              <div class="mt-5 space-y-3">
                @for (insight of clinicalInsights(); track insight) {
                  <div class="p-3.5 bg-slate-50 rounded-lg border border-slate-200/70 flex items-start space-x-3">
                    <div class="w-2 h-2 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0"></div>
                    <p class="text-xs text-slate-700 font-medium leading-relaxed">
                      {{ insight }}
                    </p>
                  </div>
                }
              </div>
            </div>

            <!-- Mandatory Decision Support Disclaimer -->
            <div class="mt-6 pt-4 border-t border-slate-100 flex items-start space-x-2 text-[11px] text-slate-400">
              <svg class="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
              <span>
                <strong>Decision-Support Notice:</strong> AI-generated decision-support information based on synthetic healthcare data. This is not a medically validated diagnosis.
              </span>
            </div>
          </div>
        </div>

        <!-- Section: Lab Reports & Preventive Care -->
        <app-lab-report-card
          [labs]="data()?.labReports || []"
          [preventiveCare]="data()?.preventiveCare || []">
        </app-lab-report-card>
      </main>
    </div>
  `
})
export class Patient360Component implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly patientService = inject(PatientService);
  private readonly vitalService = inject(VitalService);

  patientId = signal<string>('P001');
  data = signal<Patient360Response | null>(null);
  currentVitals = signal<Vital | null>(null);
  lastUpdated = signal<string>(new Date().toLocaleTimeString());

  clinicalInsights = signal<string[]>([
    'Blood pressure trend has remained elevated over recent observations.',
    'Glucose values show a mild upward trend.',
    'Regular monitoring is recommended based on available synthetic data.'
  ]);

  private simSub: Subscription | null = null;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id') || 'P001';
      this.patientId.set(id);
      this.loadPatientData(id);
    });

    // Auto simulated periodic vital update every 6 seconds in demo mode
    this.simSub = interval(6000).subscribe(() => {
      this.triggerTelemetryUpdate();
    });
  }

  ngOnDestroy(): void {
    if (this.simSub) {
      this.simSub.unsubscribe();
    }
  }

  loadPatientData(id: string): void {
    this.patientService.getPatient360(id).subscribe(res => {
      this.data.set(res);
      this.currentVitals.set(res.currentVitals);
      this.lastUpdated.set(res.currentVitals.timestamp || new Date().toLocaleTimeString());

      if (res.patient.riskLevel === 'High') {
        this.clinicalInsights.set([
          'Telemetry shows acute systolic spike with concurrent marginal troponin elevation.',
          'Cardiovascular risk index exceeds 80th percentile for peer demographic.',
          'Clinical protocol triggers immediate bedside review notification.'
        ]);
      } else {
        this.clinicalInsights.set([
          'Blood pressure trend has remained elevated over recent observations.',
          'Glucose values show a mild upward trend.',
          'Regular monitoring is recommended based on available synthetic data.'
        ]);
      }
    });
  }

  triggerTelemetryUpdate(): void {
    const id = this.patientId();
    this.vitalService.simulateLiveTelemetry(id).subscribe(res => {
      this.currentVitals.set(res.vital);
      this.lastUpdated.set(res.vital.timestamp);
    });
  }

  getBpFormatted(): string {
    const v = this.currentVitals();
    if (!v) return '128/82';
    return `${v.systolicBp}/${v.diastolicBp}`;
  }

  getInitials(name: string): string {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  }

  getStatusBadge(status: string): string {
    return status?.toLowerCase() === 'monitoring'
      ? 'bg-cyan-50 text-cyan-700 border border-cyan-200'
      : 'bg-emerald-50 text-emerald-700 border border-emerald-200';
  }

  getStatusDot(status: string): string {
    return status?.toLowerCase() === 'monitoring' ? 'bg-cyan-500' : 'bg-emerald-500';
  }

  getRiskBadge(risk: string): string {
    switch (risk?.toUpperCase()) {
      case 'HIGH': return 'bg-rose-100 text-rose-800 border border-rose-200';
      case 'LOW': return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
      default: return 'bg-amber-100 text-amber-800 border border-amber-200';
    }
  }
}
