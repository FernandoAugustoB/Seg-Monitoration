import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html'
})
export class SidebarComponent {
  authService = inject(AuthService);

  navItems = [
    { label: 'Dashboard', icon: 'pi-home', route: '/dashboard' },
    { label: 'Clientes', icon: 'pi-users', route: '/clients' },
    { label: 'Câmeras', icon: 'pi-video', route: '/cameras' },
    { label: 'Kanban Cards', icon: 'pi-th-large', route: '/kanban' },
    { label: 'Notificações', icon: 'pi-bell', route: '/notifications' },
    { label: 'Mensagens', icon: 'pi-envelope', route: '/messaging' },
  ];
}