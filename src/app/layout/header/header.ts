import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  authService = inject(AuthService);

  user = computed(() => this.authService.currentUser());
  isSearchOpen = signal(false);
  isProfileOpen = signal(false);
  isNotificationsOpen = signal(false);
  currentTime = signal(new Date());
  notifications = signal([
    { id: 1, title: 'Novo Card Aberto', desc: 'Cliente Alpha solicitou suporte', time: '5 min' },
    { id: 2, title: 'Alerta de Câmera', desc: 'Câmera 04 - Condomínio Solar offline', time: '12 min' }
  ]);
  private timerInterval: any;

  // Lógica do Timer de Turno
  shiftStatus = computed(() => {
    const now = this.currentTime();
    const user = this.authService.currentUser();

    if (!user || user.role !== 'OPERATOR') return { label: 'Admin', color: 'text-white' };

    // Define o fim do turno baseado no tipo (Ex: 18:00 ou 06:00 do dia seguinte)
    let endHour = user.shift === 'DAY' ? 18 : 6;
    let limit = new Date(now);
    limit.setHours(endHour, 0, 0, 0);

    // Ajuste para turno noturno que vira o dia
    if (user.shift === 'NIGHT' && now.getHours() >= 18) {
      limit.setDate(limit.getDate() + 1);
    }

    const diffInMs = limit.getTime() - now.getTime();
    const diffInMin = Math.floor(diffInMs / 60000);

    if (diffInMin < 0) return { label: 'Extra', color: 'text-red-500' };
    if (diffInMin <= 30) return { label: 'Fim de Turno', color: 'text-brand-primary' }; // Amarelo
    return { label: 'Em Plantão', color: 'text-green-500' };
  });

  remainingTime = computed(() => {
    // Aqui você pode formatar o HH:mm:ss restante
    const now = this.currentTime();
    return now.toLocaleTimeString('pt-BR');
  });

  ngOnInit() {
    this.timerInterval = setInterval(() => {
      this.currentTime.set(new Date());
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timerInterval) clearInterval(this.timerInterval);
  }

  toggleSearch(enable: boolean) {
    this.isSearchOpen.update(v => enable);
    if (this.isSearchOpen()) {
      document.getElementById('client-search')?.focus();
    }
  }

  toggleProfile() {
    this.isProfileOpen.update(v => !v);
    if (this.isProfileOpen()) this.isNotificationsOpen.set(false);
  }

  toggleNotifications() {
    this.isNotificationsOpen.update(v => !v);
    if (this.isNotificationsOpen()) this.isProfileOpen.set(false);
  }

  logout() {
    this.authService.logout();
  }
}