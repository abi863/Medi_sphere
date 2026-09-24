import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { PatientService } from '../../core/services/patient.service';
import { Patient } from '../../models/patient.model';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HeaderComponent],
  template: `
    <div class="min-h-screen bg-slate-50 flex flex-col">
      <app-header title="Patients" subtitle="Manage and monitor the patient registry"></app-header>

      <main class="flex-1 p-8 max-w-7xl mx-auto w-full space-y-6">
        <!-- Success Alert Toast -->
        @if (successMessage()) {
          <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between shadow-sm animate-fade-in">
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>{{ successMessage() }}</span>
            </div>
            <button (click)="successMessage.set('')" class="text-emerald-600 hover:text-emerald-900 font-bold">&times;</button>
          </div>
        }

        <!-- Top Controls: Search, Filter, Add Patient -->
        <div class="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <!-- Search Input -->
          <div class="relative w-full md:w-96">
            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <input type="text"
                   [value]="searchQuery()"
                   (input)="onSearchChange($event)"
                   placeholder="Search by name, ID (P001), or condition..."
                   class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"/>
          </div>

          <div class="flex items-center space-x-3 w-full md:w-auto justify-end">
            <!-- Filter Dropdown -->
            <select [value]="selectedCondition()"
                    (change)="onConditionFilter($event)"
                    aria-label="Filter patients by condition"
                    class="py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Conditions</option>
              <option value="Hypertension">Hypertension</option>
              <option value="Diabetes">Diabetes</option>
              <option value="Cardiac Risk">Cardiac Risk</option>
              <option value="Type 2 Diabetes">Type 2 Diabetes</option>
              <option value="Healthy">Healthy</option>
            </select>

            <!-- Add Patient Button -->
            <button (click)="openAddModal()"
                    class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition flex items-center space-x-2 flex-shrink-0">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              <span>Add Patient</span>
            </button>
          </div>
        </div>

        <!-- Patients Registry Table -->
        <div class="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-slate-50/80 border-b border-slate-200/70 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <th class="py-3 px-6">Patient</th>
                  <th class="py-3 px-4">ID</th>
                  <th class="py-3 px-4">Age</th>
                  <th class="py-3 px-4">Gender</th>
                  <th class="py-3 px-4">Condition</th>
                  <th class="py-3 px-4">Status</th>
                  <th class="py-3 px-4">Risk</th>
                  <th class="py-3 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-xs">
                @for (patient of patientService.patients(); track patient.id) {
                  <tr class="hover:bg-slate-50/70 transition-colors">
                    <td class="py-3.5 px-6">
                      <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 rounded-full bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center border border-blue-200/60">
                          {{ getInitials(patient.name) }}
                        </div>
                        <span class="font-bold text-slate-900">{{ patient.name }}</span>
                      </div>
                    </td>
                    <td class="py-3.5 px-4 font-mono font-semibold text-slate-600">{{ patient.id }}</td>
                    <td class="py-3.5 px-4 text-slate-600">{{ patient.age }} yrs</td>
                    <td class="py-3.5 px-4 text-slate-600">{{ patient.gender }}</td>
                    <td class="py-3.5 px-4">
                      <span class="font-medium text-slate-800">{{ patient.condition }}</span>
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
                    <td class="py-3.5 px-6 text-right">
                      <a [routerLink]="['/patient', patient.id]"
                         class="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition space-x-1">
                        <span>View 360</span>
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                        </svg>
                      </a>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="8" class="text-center py-10 text-slate-400 text-xs">
                      No matching patient records found in registry.
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <!-- Add Patient Modal with Reactive Forms -->
      @if (showAddModal()) {
        <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-scale-in">
            <div class="flex items-center justify-between pb-4 border-b border-slate-100">
              <div class="flex items-center space-x-2.5">
                <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                  </svg>
                </div>
                <h3 class="text-base font-bold text-slate-900">Add New Patient</h3>
              </div>
              <button (click)="closeAddModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <form [formGroup]="patientForm" (ngSubmit)="onAddPatientSubmit()" class="mt-5 space-y-4">
              <!-- Full Name -->
              <div>
                <label for="fullName" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name <span class="text-rose-500">*</span>
                </label>
                <input id="fullName"
                       type="text"
                       formControlName="name"
                       placeholder="e.g. Ramesh Chandra"
                       class="w-full px-3 py-2 border rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                       [ngClass]="{'border-rose-400 bg-rose-50/20': isFieldInvalid('name'), 'border-slate-300': !isFieldInvalid('name')}"/>
                @if (isFieldInvalid('name')) {
                  <p class="text-[11px] text-rose-500 mt-1">Full name is required</p>
                }
              </div>

              <!-- Age & Gender Grid -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="patientAge" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Age <span class="text-rose-500">*</span>
                  </label>
                  <input id="patientAge"
                         type="number"
                         formControlName="age"
                         placeholder="e.g. 48"
                         class="w-full px-3 py-2 border rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                         [ngClass]="{'border-rose-400 bg-rose-50/20': isFieldInvalid('age'), 'border-slate-300': !isFieldInvalid('age')}"/>
                  @if (isFieldInvalid('age')) {
                    <p class="text-[11px] text-rose-500 mt-1">Valid age (0-130) required</p>
                  }
                </div>

                <div>
                  <label for="patientGender" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Gender <span class="text-rose-500">*</span>
                  </label>
                  <select id="patientGender"
                          formControlName="gender"
                          class="w-full px-3 py-2 border rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          [ngClass]="{'border-rose-400 bg-rose-50/20': isFieldInvalid('gender'), 'border-slate-300': !isFieldInvalid('gender')}">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  @if (isFieldInvalid('gender')) {
                    <p class="text-[11px] text-rose-500 mt-1">Gender selection is required</p>
                  }
                </div>
              </div>

              <!-- Clinical Condition -->
              <div>
                <label for="patientCondition" class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Primary Condition <span class="text-rose-500">*</span>
                </label>
                <select id="patientCondition"
                        formControlName="condition"
                        class="w-full px-3 py-2 border rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        [ngClass]="{'border-rose-400 bg-rose-50/20': isFieldInvalid('condition'), 'border-slate-300': !isFieldInvalid('condition')}">
                  <option value="">Select Condition</option>
                  <option value="Healthy">Healthy</option>
                  <option value="Hypertension">Hypertension</option>
                  <option value="Diabetes">Diabetes</option>
                  <option value="Cardiac Risk">Cardiac Risk</option>
                  <option value="Respiratory Condition">Respiratory Condition</option>
                  <option value="Type 2 Diabetes">Type 2 Diabetes</option>
                </select>
                @if (isFieldInvalid('condition')) {
                  <p class="text-[11px] text-rose-500 mt-1">Condition is required</p>
                }
              </div>

              <!-- Modal Action Buttons -->
              <div class="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
                <button type="button"
                        (click)="closeAddModal()"
                        class="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-lg transition">
                  Cancel
                </button>
                <button type="submit"
                        [disabled]="patientForm.invalid || isSubmitting()"
                        class="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold rounded-lg shadow-sm transition flex items-center space-x-1.5">
                  @if (isSubmitting()) {
                    <span class="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  }
                  <span>Add Patient</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </div>
  `
})
export class PatientsComponent {
  public readonly patientService = inject(PatientService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  searchQuery = signal<string>('');
  selectedCondition = signal<string>('');
  showAddModal = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);
  successMessage = signal<string>('');

  patientForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    age: ['', [Validators.required, Validators.min(0), Validators.max(130)]],
    gender: ['', Validators.required],
    condition: ['', Validators.required]
  });

  onSearchChange(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.searchQuery.set(val);
    this.patientService.loadPatients(val, this.selectedCondition());
  }

  onConditionFilter(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.selectedCondition.set(val);
    this.patientService.loadPatients(this.searchQuery(), val);
  }

  openAddModal(): void {
    this.patientForm.reset({ gender: '', condition: '' });
    this.showAddModal.set(true);
  }

  closeAddModal(): void {
    this.showAddModal.set(false);
  }

  isFieldInvalid(name: string): boolean {
    const ctrl = this.patientForm.get(name);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  onAddPatientSubmit(): void {
    if (this.patientForm.invalid) {
      this.patientForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    const formVal = this.patientForm.value;

    this.patientService.addPatient(formVal).subscribe({
      next: (newPatient) => {
        this.isSubmitting.set(false);
        this.closeAddModal();
        this.successMessage.set(`Successfully added patient ${newPatient.name} (${newPatient.id}) to registry.`);
        // Reload list
        this.patientService.loadPatients();
      },
      error: () => {
        this.isSubmitting.set(false);
        this.closeAddModal();
      }
    });
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
