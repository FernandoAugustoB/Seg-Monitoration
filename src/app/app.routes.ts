import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './modules/login/login';
// import { DashboardComponent } from './modules/dashboard/dashboard';
// import { ClientManagementComponent } from './modules/client-management/client-management';
// import { CameraMonitoringComponent } from './modules/camera-monitoring/camera-monitoring';
// import { KanbanCardsComponent } from './modules/kanban-cards/kanban-cards';
// import { NotificationCenterComponent } from './modules/notification-center/notification-center';
// import { MessagingComponent } from './modules/messaging/messaging';
import { AuthGuard } from './services/auth-guard';
import { LoginComponent } from './modules/login/login';
import { MainLayoutComponent } from './layout/main-layout/main-layout';
import { Dashboard } from './modules/dashboard/dashboard';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: MainLayoutComponent, // Este componente contém o Header e Sidebar
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
            //   { path: 'client-management', component: ClientManagementComponent, canActivate: [AuthGuard] },
            //   { path: 'camera-monitoring', component: CameraMonitoringComponent, canActivate: [AuthGuard] },
            //   { path: 'kanban-cards', component: KanbanCardsComponent, canActivate: [AuthGuard] },
            //   { path: 'notifications', component: NotificationCenterComponent, canActivate: [AuthGuard] },
            //   { path: 'messaging', component: MessagingComponent, canActivate: [AuthGuard] },
        ]
    },
    { path: '**', redirectTo: 'login' }
];

export { routes };