import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabReport, PreventiveCare } from '../../models/lab-report.model';

@Component({
  selector: 'app-lab-report-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-xl border border-slate-200/80 shadow-sm p-6 space-y-6">
      <!-- Section: Recent Lab Reports -->
      <div>
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-2.5">
            <div class="w-8 h-8 rounded-lg bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-sm font-bold text-slate-900">Recent Lab Reports</h3>
              <p class="text-[11px] text-slate-500">Diagnostic panels and serum biomarkers</p>
            </div>
          </div>
          <span class="text-xs text-slate-400 font-medium">Standard Reference Range</span>
        </div>

        <!-- Table of Labs -->
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th class="py-2.5 pr-4">Test Name</th>
                <th class="py-2.5 px-4">Result</th>
                <th class="py-2.5 px-4">Reference Range</th>
                <th class="py-2.5 px-4">Status</th>
                <th class="py-2.5 pl-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-xs">
              @for (lab of labs; track lab.id) {
                <tr class="hover:bg-slate-50/70 transition-colors">
                  <td class="py-3 pr-4 font-semibold text-slate-800">{{ lab.testName }}</td>
                  <td class="py-3 px-4">
                    <span class="font-bold text-slate-900">{{ lab.value }}</span>
                    <span class="text-slate-500 ml-1">{{ lab.unit }}</span>
                  </td>
                  <td class="py-3 px-4 text-slate-500 font-mono text-[11px]">{{ lab.referenceRange }}</td>
                  <td class="py-3 px-4">
                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium" [ngClass]="getLabStatusClass(lab.status)">
                      {{ lab.status }}
                    </span>
                  </td>
                  <td class="py-3 pl-4 text-right text-slate-400 font-mono text-[11px]">{{ lab.date }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      <!-- Section: Preventive Care -->
      <div class="pt-6 border-t border-slate-100">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-2.5">
            <div class="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
              </svg>
            </div>
            <div>
              <h3 class="text-sm font-bold text-slate-900">Preventive Care</h3>
              <p class="text-[11px] text-slate-500">Proactive clinical recommendations and surveillance</p>
            </div>
          </div>
          <span class="text-xs text-blue-600 font-semibold cursor-pointer hover:underline">Guidelines Active</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          @for (item of preventiveCare; track item.id) {
            <div class="p-3.5 rounded-lg border border-slate-200/70 bg-slate-50/60 hover:bg-slate-50 transition flex flex-col justify-between">
              <div>
                <div class="flex items-start justify-between">
                  <h4 class="text-xs font-bold text-slate-800">{{ item.title }}</h4>
                  <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full" [ngClass]="getPriorityClass(item.priority)">
                    {{ item.priority }}
                  </span>
                </div>
                <p class="text-xs text-slate-600 mt-1 leading-relaxed">{{ item.description }}</p>
              </div>
              <div class="mt-3 pt-2 border-t border-slate-200/50 flex items-center justify-between text-[11px]">
                <span class="text-slate-500 font-medium">Cadence: {{ item.interval }}</span>
                <span class="inline-flex items-center text-emerald-700 font-semibold">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                  {{ item.status }}
                </span>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class LabReportCardComponent {
  @Input() labs: LabReport[] = [];
  @Input() preventiveCare: PreventiveCare[] = [];

  getLabStatusClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'critical': return 'bg-rose-50 text-rose-700 border border-rose-200';
      case 'attention':
      case 'elevated': return 'bg-amber-50 text-amber-700 border border-amber-200';
      default: return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    }
  }

  getPriorityClass(priority: string): string {
    switch (priority?.toLowerCase()) {
      case 'high': return 'bg-rose-100 text-rose-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      default: return 'bg-slate-200 text-slate-700';
    }
  }
}
