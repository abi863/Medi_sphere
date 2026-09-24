import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vital } from '../../models/vital.model';

@Component({
  selector: 'app-digital-twin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-6 text-white shadow-xl relative overflow-hidden">
      <!-- Background Ambient Glow & Subtle Grid -->
      <div class="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-25"></div>
      <div class="absolute -top-24 -left-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-24 -right-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <!-- Header Section -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-slate-800/80 relative z-10">
        <div>
          <div class="flex items-center space-x-2.5">
            <span class="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/50"></span>
            <h3 class="text-base font-bold text-white tracking-wide">Live Physiological Overview</h3>
            <span class="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-blue-900/40 text-blue-300 border border-blue-700/50">
              Cognitive Twin
            </span>
          </div>
          <p class="text-xs text-slate-400 mt-1">Data synchronized from available patient sources and simulated sensor feeds.</p>
        </div>

        <div class="flex items-center space-x-2 self-start sm:self-auto px-3 py-1 bg-slate-800/80 rounded-full border border-slate-700/60 text-xs text-emerald-400 font-medium">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Monitoring active</span>
        </div>
      </div>

      <!-- Central Visual Representation Area -->
      <div class="relative py-8 flex flex-col md:flex-row items-center justify-center min-h-[380px] z-10">

        <!-- Metric Left Callouts (Heart Rate & Blood Pressure) -->
        <div class="w-full md:w-56 space-y-5 mb-6 md:mb-0">
          <!-- Heart Rate Callout -->
          <div class="bg-slate-800/80 backdrop-blur border border-slate-700/80 rounded-xl p-3.5 hover:border-rose-500/50 transition-all group">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <span class="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                <span class="text-xs font-semibold text-slate-300 uppercase tracking-wider">Heart Rate</span>
              </div>
              <span class="text-xs text-emerald-400 font-medium">{{ vitals?.status || 'Normal' }}</span>
            </div>
            <div class="mt-1.5 flex items-baseline space-x-1.5">
              <span class="text-2xl font-extrabold text-white tracking-tight font-sans">{{ vitals?.heartRate || 72 }}</span>
              <span class="text-xs text-slate-400">bpm</span>
            </div>
            <div class="mt-2 text-[10px] text-slate-400 flex items-center justify-between">
              <span>Sensor: Cardiac Lead II</span>
              <span class="text-rose-400 font-semibold group-hover:translate-x-1 transition-transform">Cardiac &rarr;</span>
            </div>
          </div>

          <!-- Blood Pressure Callout -->
          <div class="bg-slate-800/80 backdrop-blur border border-slate-700/80 rounded-xl p-3.5 hover:border-blue-500/50 transition-all group">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <span class="w-2 h-2 rounded-full bg-blue-500"></span>
                <span class="text-xs font-semibold text-slate-300 uppercase tracking-wider">Blood Pressure</span>
              </div>
              <span class="text-xs text-emerald-400 font-medium">Hemodynamic</span>
            </div>
            <div class="mt-1.5 flex items-baseline space-x-1.5">
              <span class="text-2xl font-extrabold text-white tracking-tight font-sans">
                {{ vitals?.systolicBp || 128 }}/{{ vitals?.diastolicBp || 82 }}
              </span>
              <span class="text-xs text-slate-400">mmHg</span>
            </div>
            <div class="mt-2 text-[10px] text-slate-400 flex items-center justify-between">
              <span>Arterial Vascular</span>
              <span class="text-blue-400 font-semibold group-hover:translate-x-1 transition-transform">Brachial &rarr;</span>
            </div>
          </div>
        </div>

        <!-- Central Silhouette SVG with Glowing Target Nodes -->
        <div class="relative w-64 h-80 flex items-center justify-center mx-4 select-none">
          <!-- Abstract Human Silhouette SVG -->
          <svg class="w-56 h-80 text-slate-700 drop-shadow-[0_0_15px_rgba(59,130,246,0.15)]" viewBox="0 0 200 300" fill="currentColor">
            <!-- Head -->
            <ellipse cx="100" cy="35" rx="20" ry="24" class="text-slate-800 fill-current opacity-90"/>
            <!-- Neck -->
            <path d="M93 58 h14 v12 h-14 z" class="text-slate-800 fill-current"/>
            <!-- Torso & Shoulders -->
            <path d="M60 70 C70 65, 130 65, 140 70 C148 74, 150 90, 145 120 L138 175 C136 182, 128 185, 120 185 L80 185 C72 185, 64 182, 62 175 L55 120 C50 90, 52 74, 60 70 Z" class="text-slate-800 fill-current opacity-80"/>
            <!-- Left Arm (anatomical right) -->
            <path d="M56 75 L38 135 C36 142, 32 155, 30 170 C28 180, 24 185, 20 178 C17 170, 20 150, 25 130 L45 72 Z" class="text-slate-800/80 fill-current"/>
            <!-- Right Arm (anatomical left) -->
            <path d="M144 75 L162 135 C164 142, 168 155, 170 170 C172 180, 176 185, 180 178 C183 170, 180 150, 175 130 L155 72 Z" class="text-slate-800/80 fill-current"/>
            <!-- Left Leg -->
            <path d="M78 185 L74 245 C72 260, 70 280, 68 290 C67 296, 60 297, 60 290 L65 240 L70 185 Z" class="text-slate-800/70 fill-current"/>
            <!-- Right Leg -->
            <path d="M122 185 L126 245 C128 260, 130 280, 132 290 C133 296, 140 297, 140 290 L135 240 L130 185 Z" class="text-slate-800/70 fill-current"/>
          </svg>

          <!-- Interactive Glowing Target Nodes & Connector Overlay -->
          <svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 300">
            <!-- Connector Line: Cardiac node to left -->
            <line x1="108" y1="105" x2="30" y2="70" stroke="#f43f5e" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.8"/>
            <!-- Connector Line: Brachial BP to left -->
            <line x1="62" y1="125" x2="30" y2="150" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.8"/>
            <!-- Connector Line: SpO2 to right -->
            <line x1="172" y1="165" x2="175" y2="70" stroke="#06b6d4" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.8"/>
            <!-- Connector Line: Core Temp to right -->
            <line x1="100" y1="135" x2="175" y2="150" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.8"/>

            <!-- Node 1: Heart (Cardiac) -->
            <circle cx="108" cy="105" r="4" fill="#f43f5e" class="animate-ping" opacity="0.7"/>
            <circle cx="108" cy="105" r="5" fill="#f43f5e"/>

            <!-- Node 2: Brachial Artery -->
            <circle cx="62" cy="125" r="4" fill="#3b82f6"/>

            <!-- Node 3: Peripheral SpO2 (Hand) -->
            <circle cx="172" cy="165" r="4" fill="#06b6d4"/>

            <!-- Node 4: Core Temperature -->
            <circle cx="100" cy="135" r="4" fill="#f59e0b"/>
          </svg>
        </div>

        <!-- Metric Right Callouts (SpO2 & Temperature) -->
        <div class="w-full md:w-56 space-y-5 mt-6 md:mt-0">
          <!-- SpO2 Callout -->
          <div class="bg-slate-800/80 backdrop-blur border border-slate-700/80 rounded-xl p-3.5 hover:border-cyan-500/50 transition-all group">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span class="text-xs font-semibold text-slate-300 uppercase tracking-wider">SpO2 Saturation</span>
              </div>
              <span class="text-xs text-emerald-400 font-medium">Oxygenation</span>
            </div>
            <div class="mt-1.5 flex items-baseline space-x-1.5">
              <span class="text-2xl font-extrabold text-white tracking-tight font-sans">{{ vitals?.spo2 || 98 }}</span>
              <span class="text-xs text-slate-400">%</span>
            </div>
            <div class="mt-2 text-[10px] text-slate-400 flex items-center justify-between">
              <span class="text-cyan-400 font-semibold group-hover:-translate-x-1 transition-transform">&larr; Peripheral</span>
              <span>Pulse Oximetry</span>
            </div>
          </div>

          <!-- Temperature Callout -->
          <div class="bg-slate-800/80 backdrop-blur border border-slate-700/80 rounded-xl p-3.5 hover:border-amber-500/50 transition-all group">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <span class="w-2 h-2 rounded-full bg-amber-400"></span>
                <span class="text-xs font-semibold text-slate-300 uppercase tracking-wider">Temperature</span>
              </div>
              <span class="text-xs text-emerald-400 font-medium">Homeostasis</span>
            </div>
            <div class="mt-1.5 flex items-baseline space-x-1.5">
              <span class="text-2xl font-extrabold text-white tracking-tight font-sans">{{ vitals?.temperature || 98.4 }}</span>
              <span class="text-xs text-slate-400">°F</span>
            </div>
            <div class="mt-2 text-[10px] text-slate-400 flex items-center justify-between">
              <span class="text-amber-400 font-semibold group-hover:-translate-x-1 transition-transform">&larr; Thermal Core</span>
              <span>Continuous Telemetry</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Demonstration Disclaimer Footer -->
      <div class="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 relative z-10">
        <span class="flex items-center space-x-1.5">
          <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span>Demonstration visualization model for software project. Not a clinically validated digital twin.</span>
        </span>
        <span class="text-slate-400">Kafka Stream: {{ isLive ? 'Simulated Active' : 'Idle' }}</span>
      </div>
    </div>
  `
})
export class DigitalTwinComponent {
  @Input() vitals: Vital | null = null;
  @Input() isLive = true;
}
