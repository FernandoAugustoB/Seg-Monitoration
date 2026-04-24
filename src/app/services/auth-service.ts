import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isAuthenticated = signal<boolean>(sessionStorage.getItem('isLogged') === 'true');
  currentUser = signal<any>(JSON.parse(sessionStorage.getItem('user') || '{}'));

  constructor(private router: Router) {}

  login(username: string, role: 'OPERATOR' | 'SUPERVISOR') {
    const userData = { 
      name: username, 
      role: role, 
      shiftEnd: role === 'OPERATOR' ? '2026-04-24T06:00:00' : null 
    };
    
    sessionStorage.setItem('isLogged', 'true');
    sessionStorage.setItem('user', JSON.stringify(userData));
    
    this.isAuthenticated.set(true);
    this.currentUser.set(userData);
    this.router.navigate(['/dashboard']);
  }

  logout() {
    sessionStorage.clear();
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }
}