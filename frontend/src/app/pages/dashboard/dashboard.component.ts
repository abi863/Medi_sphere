import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PatientService } from '../../core/services/patient.service';
import { HeaderComponent } from '../../components/header/header.component';
import { AlertCardComponent } from '../../components/alert-card/alert-card.component';
import { Patient } from '../../models/patient.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, AlertCardComponent],
  template: `
    <div class="min-h-screen bg-slate-50 flex flex-col">
      <app-header title="Dashboard" subtitle="Unified patient intelligence and clinical insights"></app-header>

      <main class="flex-1 p-8 max-w-7xl mx-auto w-full space-y-8">
        <!-- Hero Section -->
        <div class="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6 border border-slate-700/80">
          <div class="relative z-10 max-w-2xl">
            <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/50 text-xs font-semibold text-cyan-300 mb-3">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Live monitoring active</span>
            </div>
            <h1 class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl font-sans">
              One patient context, assembled.
            </h1>
            <p class="mt-3 text-sm text-slate-300 leading-relaxed">
              Monitor patient health, identify emerging risks, and support preventive clinical decisions from one unified workspace.
            </p>
            <div class="mt-5 flex items-center space-x-4">
              <a routerLink="/patients" class="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold rounded-lg shadow-sm transition flex items-center space-x-2">
                <span>View Patient Registry</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </a>
              <a [routerLink]="['/patient', 'P001']" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700 transition">
                Open Arun Kumar (P001) 360
              </a>
            </div>
          </div>

          <!-- Subtle Abstract Patient-Data Visualization -->
          <div class="relative w-full lg:w-72 h-44 flex items-center justify-center select-none">
            <svg class="w-full h-full text-cyan-400/20" viewBox="0 0 280 140">
              <defs>
                <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.2"/>
                  <stop offset="50%" stop-color="#3b82f6" stop-opacity="0.8"/>
                  <stop offset="100%" stop-color="#6366f1" stop-opacity="0.3"/>
                </linearGradient>
              </defs>
              <!-- ECG Grid lines -->
              <line x1="0" y1="70" x2="280" y2="70" stroke="#334155" stroke-width="0.75" stroke-dasharray="2,2"/>
              <line x1="0" y1="35" x2="280" y2="35" stroke="#334155" stroke-width="0.5" stroke-dasharray="2,2"/>
              <line x1="0" y1="105" x2="280" y2="105" stroke="#334155" stroke-width="0.5" stroke-dasharray="2,2"/>
              <!-- ECG Pulse Wave -->
              <path d="M 0,70 L 40,70 L 48,64 L 54,70 L 65,70 L 72,25 L 80,115 L 88,60 L 95,74 L 102,70 L 140,70 L 148,64 L 154,70 L 165,70 L 172,25 L 180,115 L 188,60 L 195,74 L 202,70 L 280,70"
                    fill="none" stroke="url(#waveGrad)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="172" cy="25" r="4" fill="#06b6d4" class="animate-ping" opacity="0.8"/>
              <circle cx="172" cy="25" r="4" fill="#06b6d4"/>
            </svg>
            <span class="absolute bottom-2 text-[10px] text-slate-400 font-mono tracking-wider">
              HEMODYNAMIC TELEMETRY &bull; 72 BPM
            </span>
          </div>
        </div>

        <!-- Dashboard Stat Cards (4 Cards) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <!-- CARD 1: Total Patients -->
          <div class="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Patients</span>
              <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
            </div>
            <div class="mt-3 flex items-baseline justify-between">
              <span class="text-3xl font-extrabold text-slate-900 tracking-tight">128</span>
              <span class="inline-flex items-center text-xs font-bold text-emerald-600">
                +8.2% this month
              </span>
            </div>
            <p class="text-xs text-slate-400 mt-2 font-medium">Registered clinical profiles</p>
          </div>

          <!-- CARD 2: Active Patients -->
          <div class="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Patients</span>
              <div class="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
            <div class="mt-3 flex items-baseline justify-between">
              <span class="text-3xl font-extrabold text-slate-900 tracking-tight">96</span>
              <span class="inline-flex items-center text-xs font-bold text-emerald-600">
                +5.4%
              </span>
            </div>
            <p class="text-xs text-slate-400 mt-2 font-medium">Under active clinical care</p>
          </div>

          <!-- CARD 3: Monitoring -->
          <div class="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Monitoring</span>
              <div class="w-9 h-9 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
            </div>
            <div class="mt-3 flex items-baseline justify-between">
              <span class="text-3xl font-extrabold text-slate-900 tracking-tight">24</span>
              <span class="inline-flex items-center text-xs font-bold text-cyan-600">
                Live monitoring
              </span>
            </div>
            <p class="text-xs text-slate-400 mt-2 font-medium">Real-time telemetry stream</p>
          </div>

          <!-- CARD 4: Average Age -->
          <div class="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Average Age</span>
              <div class="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
            </div>
            <div class="mt-3 flex items-baseline justify-between">
              <span class="text-3xl font-extrabold text-slate-900 tracking-tight">47</span>
              <span class="inline-flex items-center text-xs font-bold text-slate-500">
                Across registry
              </span>
            </div>
            <p class="text-xs text-slate-400 mt-2 font-medium">Patient cohort demographics</p>
          </div>
        </div>

        <!-- Dual Column Section: Health Alerts + Quick Access -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2">
            <app-alert-card></app-alert-card>
          </div>

          <!-- Quick Patient Access (4-5 Patients) -->
          <div class="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 class="text-sm font-bold text-slate-900">Quick Patient Access</h3>
              <a routerLink="/patients" class="text-xs text-blue-600 font-semibold hover:underline">View All</a>
            </div>

            <div class="mt-3 space-y-2.5">
              @for (patient of patientService.patients().slice(0, 5); track patient.id) {
                <div class="p-2.5 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50/80 transition flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                      {{ getInitials(patient.name) }}
                    </div>
                    <div>
                      <div class="text-xs font-bold text-slate-900">{{ patient.name }}</div>
                      <div class="text-[11px] text-slate-400">{{ patient.id }} &bull; {{ patient.condition }}</div>
                    </div>
                  </div>
                  <a [routerLink]="['/patient', patient.id]" class="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 text-xs font-semibold rounded transition">
                    Open
                  </a>
                </div>
              }
            </div>
          </div>
        </div>

        <!-- Section: Patient Registry (Recently monitored patients) -->
        <div class="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div class="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 class="text-base font-bold text-slate-900">Patient Registry</h3>
              <p class="text-xs text-slate-500 mt-0.5">Recently monitored patients with clinical risk status</p>
            </div>
            <a routerLink="/patients" class="px-3.5 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold rounded-lg transition self-start sm:self-auto">
              Manage Registry &rarr;
            </a>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-slate-50/70 border-b border-slate-200/70 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <th class="py-3 px-5">Patient</th>
                  <th class="py-3 px-4">ID</th>
                  <th class="py-3 px-4">Age</th>
                  <th class="py-3 px-4">Gender</th>
                  <th class="py-3 px-4">Condition</th>
                  <th class="py-3 px-4">Status</th>
                  <th class="py-3 px-4">Risk</th>
                  <th class="py-3 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-xs font-normal">
                @for (patient of patientService.patients(); track patient.id) {
                  <tr class="hover:bg-slate-50/60 transition-colors">
                    <td class="py-3.5 px-5">
                      <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center border border-slate-200">
                          {{ getInitials(patient.name) }}
                        </div>
                        <span class="font-bold text-slate-900">{{ patient.name }}</span>
                      </div>
                    </td>
                    <td class="py-3.5 px-4 font-mono font-semibold text-slate-600">{{ patient.id }}</td>
                    <td class="py-3.5 px-4 text-slate-600">{{ patient.age }}</td>
                    <td class="py-3.5 px-4 text-slate-600">{{ patient.gender }}</td>
                    <td class="py-3.5 px-4">
                      <span class="font-medium text-slate-700">{{ patient.condition }}</span>
                    </td>
                    <td class="py-3.5 px-4">
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium" [ngClass]="getStatusBadge(patient.status)">
                        <span class="w-1.5 h-1.5 rounded-full mr-1.5" [ngClass]="getStatusDot(patient.status)"></span>
                        {{ patient.status }}
                      </span>
                    </td>
                    <td class="py-3.5 px-4">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider" [ngClass]="getRiskBadge(patient.riskLevel)">
                        {{ patient.riskLevel }}
                      </span>
                    </td>
                    <td class="py-3.5 px-5 text-right">
                      <a [routerLink]="['/patient', patient.id]"
                         class="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition space-x-1">
                        <span>View 360</span>
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                        </svg>
                      </a>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  `
})
export class DashboardComponent {
  public readonly patientService = inject(PatientService);

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
