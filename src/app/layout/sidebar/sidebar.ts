import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth-service';

interface NavItem {
  label: string;
  icon: string;
  route?: string;       // Opcional se for um "folder"
  children?: NavItem[]; // Itens internos
  isOpen?: boolean;     // Estado do dropdown
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html'
})
export class Sidebar {
  authService = inject(AuthService);

  menuItems = signal<NavItem[]>([
    { label: 'Dashboard', icon: 'pi-home', route: '/dashboard' },
    { label: 'Clientes', icon: 'pi-users', route: '/clients' },
    { label: 'Câmeras', icon: 'pi-video', route: '/cameras' },
    { label: 'Cards', icon: 'pi-th-large', route: '/cards' },
    {
      label: 'Relatórios',
      icon: 'pi-folder',
      isOpen: false,
      children: [
        { label: 'Início de Plantão', icon: 'pi-file-edit', route: '/reports/start-shift' },
        { label: 'Final de Plantão', icon: 'pi-file-edit', route: '/reports/end-shift' },
        { label: 'Contagem de Câmeras', icon: 'pi-chart-bar', route: '/reports/count-cameras' },
        { label: 'Verificação de Câmeras', icon: 'pi-list', route: '/reports/verification-cameras' },
      ]
    },
    { label: 'Notificações', icon: 'pi-bell', route: '/notifications' },
    { label: 'Mensagens', icon: 'pi-envelope', route: '/inbox' },
  ]);

  toggleFolder(item: NavItem) {
    if (item.children) {
      item.isOpen = !item.isOpen;
    }
  }
}