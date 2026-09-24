import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiskAssessment } from '../../models/risk-assessment.model';

@Component({
  selector: 'app-risk-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-all duration-200">
      <div class="flex items-center justify-between pb-4 border-b border-slate-100">
        <div class="flex items-center space-x-2.5">
          <div class="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
          </div>
          <div>
            <h3 class="text-sm font-bold text-slate-900">Health Risk Assessment</h3>
            <span class="inline-flex items-center text-[11px] font-semibold text-indigo-600">
              {{ risk?.insightLabel || 'AI-Assisted Insight' }}
            </span>
          </div>
        </div>

        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase" [ngClass]="getRiskBadgeClass()">
          Overall Risk: {{ risk?.level || 'MEDIUM' }}
        </span>
      </div>

      <!-- Score & Gauge Section -->
      <div class="mt-5">
        <div class="flex items-baseline justify-between mb-2">
          <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Composite Risk Index</span>
          <div class="flex items-baseline space-x-1">
            <span class="text-2xl font-extrabold text-slate-900">{{ risk?.score || 62 }}</span>
            <span class="text-xs font-medium text-slate-400">/ 100</span>
          </div>
        </div>

        <!-- Score Bar -->
        <div class="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200/60">
          <div class="h-full rounded-full transition-all duration-700 ease-out"
               [ngClass]="getProgressBarColor()"
               [style.width.%]="risk?.score || 62"></div>
        </div>

        <div class="flex justify-between text-[10px] text-slate-400 font-medium mt-1">
          <span>0 (Low Risk)</span>
          <span>50 (Moderate)</span>
          <span>100 (Critical)</span>
        </div>
      </div>

      <!-- Recommendation Message -->
      <div class="mt-5 p-3.5 bg-slate-50 rounded-lg border border-slate-200/70">
        <p class="text-xs font-medium text-slate-700 leading-relaxed">
          {{ risk?.message || 'Current indicators suggest increased monitoring may be appropriate.' }}
        </p>
      </div>

      <!-- Contributing Factors -->
      <div class="mt-5">
        <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2.5">
          Key Contributing Factors
        </span>
        <div class="flex flex-wrap gap-2">
          @for (factor of risk?.contributingFactors || defaultFactors; track factor) {
            <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/80">
              <span class="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5"></span>
              {{ factor }}
            </span>
          }
        </div>
      </div>

      <!-- Clinical Disclaimer Callout -->
      <div class="mt-6 pt-4 border-t border-slate-100 flex items-start space-x-2 text-[11px] text-slate-400">
        <svg class="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span>{{ risk?.disclaimer || 'AI-generated decision-support information based on synthetic healthcare data. Not a medically validated diagnosis.' }}</span>
      </div>
    </div>
  `
})
export class RiskCardComponent {
  @Input() risk: RiskAssessment | null = null;

  defaultFactors = ['Blood Pressure', 'Glucose', 'Age', 'Previous Condition'];

  getRiskBadgeClass(): string {
    const level = this.risk?.level?.toUpperCase();
    if (level === 'HIGH') return 'bg-rose-100 text-rose-800 border border-rose-200';
    if (level === 'LOW') return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
    return 'bg-amber-100 text-amber-800 border border-amber-200';
  }

  getProgressBarColor(): string {
    const score = this.risk?.score || 62;
    if (score >= 70) return 'bg-gradient-to-r from-orange-500 to-rose-500';
    if (score <= 35) return 'bg-gradient-to-r from-emerald-400 to-teal-500';
    return 'bg-gradient-to-r from-amber-400 to-orange-400';
  }
}
