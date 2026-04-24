import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/services/notification.service';
import { AuthService } from '../../core/services/auth.service';
import { Notification } from '../../core/models/notification.model';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  loading = false;
  currentUserId = '';

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.authService.getCurrentUser()?.id || '';
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.loading = true;
    this.notificationService.getNotifications(this.currentUserId).subscribe({
      next: (data) => {
        this.notifications = data.sort((a, b) => b.dataEnvio.getTime() - a.dataEnvio.getTime());
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  markAsRead(notificationId: string): void {
    this.notificationService.markAsRead(notificationId).subscribe({
      next: () => {
        this.loadNotifications();
      }
    });
  }

  markAllAsRead(): void {
    this.notificationService.markAllAsRead(this.currentUserId).subscribe({
      next: () => {
        this.loadNotifications();
      }
    });
  }

  deleteNotification(notificationId: string): void {
    this.notificationService.deleteNotification(notificationId).subscribe({
      next: () => {
        this.loadNotifications();
      }
    });
  }

  getUnreadCount(): number {
    return this.notifications.filter(n => !n.visualizado).length;
  }

  getNotificationIcon(tipo: string): string {
    const icons: { [key: string]: string } = {
      card: '📋',
      message: '💬',
      alert: '🚨',
      info: 'ℹ️'
    };
    return icons[tipo] || '📢';
  }

  getNotificationColor(tipo: string): string {
    const colors: { [key: string]: string } = {
      card: 'border-blue-600 bg-blue-900/30',
      message: 'border-purple-600 bg-purple-900/30',
      alert: 'border-red-600 bg-red-900/30',
      info: 'border-green-600 bg-green-900/30'
    };
    return colors[tipo] || 'border-slate-600 bg-slate-800';
  }
}
