import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

export interface UserSession {
  email: string;
  name: string;
  role: string;
  title: string;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly defaultUser: UserSession = {
    email: 'doctor@medisphere.demo',
    name: 'Dr. Ananya Sharma',
    role: 'Clinical Administrator',
    title: 'Chief Medical Intelligence Officer',
    token: 'medisphere-session-demo-token-jwt'
  };

  public readonly currentUser = signal<UserSession | null>(null);
  public readonly isAuthenticated = signal<boolean>(false);

  constructor(private router: Router) {
    this.checkStoredAuth();
  }

  private checkStoredAuth(): void {
    const saved = localStorage.getItem('medisphere_user');
    if (saved) {
      try {
        const user = JSON.parse(saved);
        this.currentUser.set(user);
        this.isAuthenticated.set(true);
      } catch {
        this.logout();
      }
    } else {
      const wasLoggedIn = localStorage.getItem('medisphere_logged_in') === 'true';
      if (wasLoggedIn) {
        this.login('doctor@medisphere.demo', 'demo123');
      }
    }
  }

  login(email: string, password: string): boolean {
    if (email === 'doctor@medisphere.demo' && password === 'demo123') {
      const user: UserSession = { ...this.defaultUser, email };
      localStorage.setItem('medisphere_user', JSON.stringify(user));
      localStorage.setItem('medisphere_token', user.token || 'medisphere-jwt-token');
      localStorage.setItem('medisphere_logged_in', 'true');
      this.currentUser.set(user);
      this.isAuthenticated.set(true);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('medisphere_user');
    localStorage.removeItem('medisphere_token');
    localStorage.removeItem('medisphere_logged_in');
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }
}
