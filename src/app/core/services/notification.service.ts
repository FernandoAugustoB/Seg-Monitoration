import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';
import { Notification } from '../models/notification.model';
import { MOCK_NOTIFICATIONS } from '../../../constants/mock-data';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications = new BehaviorSubject<Notification[]>(MOCK_NOTIFICATIONS);

  notifications$ = this.notifications.asObservable();

  constructor() {}

  getNotifications(usuarioId: string): Observable<Notification[]> {
    const resultado = this.notifications.value.filter(n => n.usuarioId === usuarioId);
    return of(resultado).pipe(delay(200));
  }

  getUnreadNotifications(usuarioId: string): Observable<Notification[]> {
    const resultado = this.notifications.value.filter(
      n => n.usuarioId === usuarioId && !n.visualizado
    );
    return of(resultado).pipe(delay(200));
  }

  markAsRead(notificationId: string): Observable<void> {
    const notificationsAtualizadas = this.notifications.value.map(n =>
      n.id === notificationId
        ? {
            ...n,
            visualizado: true,
            dataVisualizacao: new Date()
          }
        : n
    );

    this.notifications.next(notificationsAtualizadas);
    return of(void 0).pipe(delay(150));
  }

  markAllAsRead(usuarioId: string): Observable<void> {
    const notificationsAtualizadas = this.notifications.value.map(n =>
      n.usuarioId === usuarioId && !n.visualizado
        ? {
            ...n,
            visualizado: true,
            dataVisualizacao: new Date()
          }
        : n
    );

    this.notifications.next(notificationsAtualizadas);
    return of(void 0).pipe(delay(150));
  }

  addNotification(notification: Omit<Notification, 'id' | 'dataEnvio'>): Observable<Notification> {
    const novaNotificacao: Notification = {
      ...notification,
      id: this.generateId(),
      dataEnvio: new Date()
    };

    const notificationsAtualizadas = [...this.notifications.value, novaNotificacao];
    this.notifications.next(notificationsAtualizadas);

    return of(novaNotificacao).pipe(delay(150));
  }

  deleteNotification(id: string): Observable<void> {
    const notificationsAtualizadas = this.notifications.value.filter(n => n.id !== id);
    this.notifications.next(notificationsAtualizadas);
    return of(void 0).pipe(delay(150));
  }

  private generateId(): string {
    return `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
