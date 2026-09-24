import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface HealthAlert {
  id: string;
  patientId: string;
  patientName: string;
  severity: 'HIGH_RISK' | 'ATTENTION' | 'MONITORING';
  message: string;
  timestamp: string;
}

@Component({
  selector: 'app-alert-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 space-y-3">
      <div class="flex items-center justify-between pb-3 border-b border-slate-100">
        <div class="flex items-center space-x-2">
          <span class="relative flex h-2.5 w-2.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
          </span>
          <h3 class="text-sm font-bold text-slate-900">Clinical Health Alerts</h3>
        </div>
        <span class="text-xs font-semibold text-slate-400">Live Queue</span>
      </div>

      <div class="space-y-2.5">
        @for (alert of alerts; track alert.id) {
          <div class="p-3.5 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all duration-150"
               [ngClass]="getAlertBorderAndBg(alert.severity)">
            <div class="flex items-start space-x-3">
              <!-- Severity Icon -->
              <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                   [ngClass]="getAlertIconClass(alert.severity)">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  @if (alert.severity === 'HIGH_RISK') {
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                  } @else if (alert.severity === 'ATTENTION') {
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  } @else {
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  }
                </svg>
              </div>

              <div>
                <div class="flex items-center space-x-2">
                  <span class="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded tracking-wider"
                        [ngClass]="getBadgeClass(alert.severity)">
                    {{ formatSeverity(alert.severity) }}
                  </span>
                  <span class="text-xs font-bold text-slate-800">{{ alert.patientName }} ({{ alert.patientId }})</span>
                </div>
                <p class="text-xs text-slate-600 mt-1 font-medium">{{ alert.message }}</p>
                <span class="text-[10px] text-slate-400 mt-0.5 block">{{ alert.timestamp }}</span>
              </div>
            </div>

            <!-- Action Button -->
            <a [routerLink]="['/patient', alert.patientId]"
               class="self-end sm:self-center px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-blue-600 shadow-sm transition flex items-center space-x-1">
              <span>View 360</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        }
      </div>
    </div>
  `
})
export class AlertCardComponent {
  @Input() alerts: HealthAlert[] = [
    {
      id: 'ALT01',
      patientId: 'P003',
      patientName: 'Rahul Raj',
      severity: 'HIGH_RISK',
      message: 'Elevated cardiovascular risk detected.',
      timestamp: 'Today, 10:42 AM'
    },
    {
      id: 'ALT02',
      patientId: 'P001',
      patientName: 'Arun Kumar',
      severity: 'ATTENTION',
      message: 'Blood pressure requires monitoring.',
      timestamp: 'Today, 09:15 AM'
    },
    {
      id: 'ALT03',
      patientId: 'P002',
      patientName: 'Priya Sharma',
      severity: 'MONITORING',
      message: 'Glucose trend requires follow-up.',
      timestamp: 'Yesterday, 04:30 PM'
    }
  ];

  formatSeverity(sev: string): string {
    return sev.replace('_', ' ');
  }

  getAlertBorderAndBg(sev: string): string {
    switch (sev) {
      case 'HIGH_RISK': return 'bg-rose-50/50 border-rose-200/80 hover:bg-rose-50';
      case 'ATTENTION': return 'bg-amber-50/50 border-amber-200/80 hover:bg-amber-50';
      default: return 'bg-blue-50/40 border-blue-200/70 hover:bg-blue-50';
    }
  }

  getAlertIconClass(sev: string): string {
    switch (sev) {
      case 'HIGH_RISK': return 'bg-rose-100 text-rose-600';
      case 'ATTENTION': return 'bg-amber-100 text-amber-600';
      default: return 'bg-blue-100 text-blue-600';
    }
  }

  getBadgeClass(sev: string): string {
    switch (sev) {
      case 'HIGH_RISK': return 'bg-rose-600 text-white';
      case 'ATTENTION': return 'bg-amber-500 text-white';
      default: return 'bg-blue-600 text-white';
    }
  }
}
