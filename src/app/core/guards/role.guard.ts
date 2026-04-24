import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const requiredRole = route.data['role'] as string;
    const currentUser = this.authService.getCurrentUser();

    if (!currentUser) {
      this.router.navigate(['/login']);
      return false;
    }

    if (requiredRole && !this.hasRole(currentUser.role, requiredRole)) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }

  private hasRole(userRole: string, requiredRole: string): boolean {
    if (!requiredRole) {
      return true;
    }

    const roles = requiredRole.split(',');
    return roles.includes(userRole);
  }
}
