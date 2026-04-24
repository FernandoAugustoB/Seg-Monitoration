import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthUser, User } from '../models/user.model';
import { MOCK_USERS } from '../../../constants/mock-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = signal<AuthUser | null>(null);
  private authStatus = new BehaviorSubject<boolean>(false);

  currentUser$ = this.authStatus.asObservable();

  constructor(private router: Router) {
    this.checkStoredAuth();
  }

  private checkStoredAuth(): void {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      this.currentUser.set(JSON.parse(stored));
      this.authStatus.next(true);
    }
  }

  login(username: string, password: string): Observable<AuthUser | null> {
    return new Observable(observer => {
      setTimeout(() => {
        const user = MOCK_USERS.find(
          (u: typeof MOCK_USERS[0]) => u.username === username && u.password === password
        );

        if (user) {
          const authUser: AuthUser = {
            ...user,
            token: this.generateToken(),
            loginTime: new Date()
          };

          this.currentUser.set(authUser);
          this.authStatus.next(true);
          localStorage.setItem('currentUser', JSON.stringify(authUser));
          localStorage.setItem('token', authUser.token!);

          observer.next(authUser);
          observer.complete();
        } else {
          observer.error('Credenciais inválidas');
        }
      }, 500);
    });
  }

  logout(): void {
    this.currentUser.set(null);
    this.authStatus.next(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.authStatus.value;
  }

  getCurrentUser(): AuthUser | null {
    return this.currentUser();
  }

  getCurrentUserSignal() {
    return this.currentUser;
  }

  hasRole(role: string): boolean {
    return this.currentUser()?.role === role;
  }

  private generateToken(): string {
    return `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
