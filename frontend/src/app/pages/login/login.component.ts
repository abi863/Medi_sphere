import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <!-- Background Ambient Glow -->
      <div class="absolute -top-40 -left-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <!-- Logo and Brand -->
        <div class="flex items-center justify-center space-x-3 mb-4">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div class="text-left">
            <h1 class="text-2xl font-black text-white tracking-wider font-sans">MEDISPHERE</h1>
            <p class="text-xs text-cyan-400 font-semibold uppercase tracking-widest">Cognitive Twin</p>
          </div>
        </div>

        <h2 class="mt-2 text-center text-xl font-bold tracking-tight text-slate-100">
          Clinical intelligence, unified.
        </h2>
        <p class="mt-1 text-center text-xs text-slate-400">
          Provider authentication & clinical decision-support portal
        </p>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div class="bg-slate-900 border border-slate-800 py-8 px-6 shadow-2xl rounded-2xl sm:px-10">
          <!-- Error banner -->
          @if (errorMessage()) {
            <div class="mb-5 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2">
              <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>{{ errorMessage() }}</span>
            </div>
          }

          <form (ngSubmit)="onSubmit()" class="space-y-5">
            <div>
              <label for="email" class="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Email Address
              </label>
              <div class="relative">
                <input id="email"
                       name="email"
                       type="email"
                       autocomplete="email"
                       required
                       [(ngModel)]="email"
                       class="block w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                       placeholder="doctor@medisphere.demo"/>
              </div>
            </div>

            <div>
              <label for="password" class="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Password
              </label>
              <div class="relative">
                <input id="password"
                       name="password"
                       type="password"
                       autocomplete="current-password"
                       required
                       [(ngModel)]="password"
                       class="block w-full px-3.5 py-2.5 bg-slate-950/80 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                       placeholder="••••••••"/>
              </div>
            </div>

            <!-- Demo Credentials Helper Pill -->
            <div class="p-3 bg-slate-800/60 rounded-lg border border-slate-700/60 flex items-start space-x-2.5 text-xs text-slate-300">
              <svg class="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div>
                <span class="font-semibold text-white">Demonstration Credentials:</span>
                <div class="mt-0.5 text-slate-400 font-mono text-[11px]">
                  Email: <span class="text-cyan-300">doctor&#64;medisphere.demo</span><br>
                  Password: <span class="text-cyan-300">demo123</span>
                </div>
              </div>
            </div>

            <div>
              <button type="submit"
                      class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-md shadow-cyan-500/10 text-sm font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 transition duration-150">
                Sign In
              </button>
            </div>
          </form>

          <div class="mt-6 pt-4 border-t border-slate-800 text-center">
            <p class="text-[11px] text-slate-500">
              HIPAA-aligned security architecture &bull; Synthetic clinical data demonstration
            </p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  email = 'doctor@medisphere.demo';
  password = 'demo123';
  errorMessage = signal<string>('');

  onSubmit(): void {
    if (this.auth.login(this.email, this.password)) {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage.set('Invalid credentials. Please use doctor@medisphere.demo / demo123');
    }
  }
}
