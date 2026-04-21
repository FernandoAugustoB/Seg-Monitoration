import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientManagementComponent } from './components/client-management/client-management.component';
import { CameraMonitoringComponent } from './components/camera-monitoring/camera-monitoring.component';
import { KanbanCardsComponent } from './components/kanban-cards/kanban-cards.component';
import { NotificationCenterComponent } from './components/notification-center/notification-center.component';
import { MessagingComponent } from './components/messaging/messaging.component';
import { AuthGuard } from './services/auth-guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'client-management', component: ClientManagementComponent, canActivate: [AuthGuard] },
  { path: 'camera-monitoring', component: CameraMonitoringComponent, canActivate: [AuthGuard] },
  { path: 'kanban-cards', component: KanbanCardsComponent, canActivate: [AuthGuard] },
  { path: 'notification-center', component: NotificationCenterComponent, canActivate: [AuthGuard] },
  { path: 'messaging', component: MessagingComponent, canActivate: [AuthGuard] },
];