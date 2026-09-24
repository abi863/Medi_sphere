import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vital-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between relative overflow-hidden group">
      <!-- Accent Top Border -->
      <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r" [ngClass]="getAccentGradient()"></div>

      <div class="flex items-start justify-between">
        <div>
          <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">{{ label }}</span>
          <div class="flex items-baseline space-x-1.5 mt-2">
            <span class="text-3xl font-extrabold text-slate-900 tracking-tight font-sans transition-all duration-300">
              {{ value }}
            </span>
            <span class="text-sm font-semibold text-slate-500">{{ unit }}</span>
          </div>
        </div>

        <!-- Icon Container -->
        <div class="w-10 h-10 rounded-lg flex items-center justify-center" [ngClass]="getIconBg()">
          <ng-content select="[icon]"></ng-content>
        </div>
      </div>

      <!-- Footer Metadata -->
      <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span class="inline-flex items-center px-2 py-0.5 rounded-full font-medium" [ngClass]="getStatusBadgeClass()">
          <span class="w-1.5 h-1.5 rounded-full mr-1.5" [ngClass]="getStatusDotClass()"></span>
          {{ status }}
        </span>
        <span class="text-slate-400 font-normal">Updated {{ updatedTime || 'Just now' }}</span>
      </div>
    </div>
  `
})
export class VitalCardComponent {
  @Input() label = '';
  @Input() value: string | number = '';
  @Input() unit = '';
  @Input() status: 'Normal' | 'Attention' | 'Critical' | string = 'Normal';
  @Input() updatedTime = '';
  @Input() type: 'heart' | 'bp' | 'spo2' | 'temp' = 'heart';

  getAccentGradient(): string {
    switch (this.type) {
      case 'heart': return 'from-rose-500 to-pink-500';
      case 'bp': return 'from-blue-600 to-indigo-600';
      case 'spo2': return 'from-cyan-500 to-teal-500';
      case 'temp': return 'from-amber-500 to-orange-500';
      default: return 'from-blue-500 to-cyan-500';
    }
  }

  getIconBg(): string {
    switch (this.type) {
      case 'heart': return 'bg-rose-50 text-rose-600';
      case 'bp': return 'bg-blue-50 text-blue-600';
      case 'spo2': return 'bg-cyan-50 text-cyan-600';
      case 'temp': return 'bg-amber-50 text-amber-600';
      default: return 'bg-slate-50 text-slate-600';
    }
  }

  getStatusBadgeClass(): string {
    switch (this.status?.toLowerCase()) {
      case 'critical': return 'bg-rose-50 text-rose-700 border border-rose-200';
      case 'attention': return 'bg-amber-50 text-amber-700 border border-amber-200';
      default: return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    }
  }

  getStatusDotClass(): string {
    switch (this.status?.toLowerCase()) {
      case 'critical': return 'bg-rose-500';
      case 'attention': return 'bg-amber-500';
      default: return 'bg-emerald-500';
    }
  }
}
