import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.html'
})
export class Notifications {
  private router = inject(Router);

  notifications = signal([
    { 
      id: 1, 
      title: 'Novo Card Direcionado', 
      message: 'O supervisor direcionou o card CRD-105 a você.', 
      time: '2026-04-24T03:40:00', 
      type: 'CARD', 
      read: false,
      link: '/kanban' 
    },
    { 
      id: 2, 
      title: 'Alerta de Câmera Offline', 
      message: 'A câmera "Entrada Garagem" do cliente Condomínio Solar perdeu conexão.', 
      time: '2026-04-24T03:15:00', 
      type: 'CAMERA', 
      read: true,
      link: '/cameras' 
    },
    { 
      id: 3, 
      title: 'Mensagem do Supervisor', 
      message: 'Nova diretriz postada na caixa de mensagens sobre o plantão noturno.', 
      time: '2026-04-23T22:00:00', 
      type: 'MESSAGE', 
      read: false,
      link: '/messaging' 
    }
  ]);

  unreadCount = computed(() => this.notifications().filter(n => !n.read).length);

  markAsRead(id: number) {
    this.notifications.update(list => 
      list.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }

  markAllAsRead() {
    this.notifications.update(list => list.map(n => ({ ...n, read: true })));
  }

  navigateToEvent(notif: any) {
    this.markAsRead(notif.id);
    this.router.navigate([notif.link]);
  }
}