import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { Cameras } from './modules/cameras/cameras';
import { Cards } from './modules/cards/cards';
import { Clients } from './modules/clients/clients';
import { Dashboard } from './modules/dashboard/dashboard';
import { Inbox } from './modules/inbox/inbox';
import { LoginComponent } from './modules/login/login';
import { Notifications } from './modules/notifications/notifications';
import { Profile } from './modules/profile/profile';
import { AuthGuard } from './services/auth-guard';
import { StartShift } from './modules/reports/start-shift/start-shift';
import { EndShift } from './modules/reports/end-shift/end-shift';
import { CountCameras } from './modules/reports/count-cameras/count-cameras';
import { VerificationCameras } from './modules/reports/verification-cameras/verification-cameras';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: MainLayout,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
            { path: 'clients', component: Clients, canActivate: [AuthGuard] },
            { path: 'cameras', component: Cameras, canActivate: [AuthGuard] },
            { path: 'cards', component: Cards, canActivate: [AuthGuard] },
            { path: 'notifications', component: Notifications, canActivate: [AuthGuard] },
            { path: 'inbox', component: Inbox, canActivate: [AuthGuard] },
            { path: 'profile', component: Profile, canActivate: [AuthGuard] },
            {
                path: 'reports',
                canActivate: [AuthGuard],
                children: [
                    { path: 'start-shift', component: StartShift },
                    { path: 'end-shift', component: EndShift },
                    { path: 'count-cameras', component: CountCameras },
                    { path: 'verification-cameras', component: VerificationCameras },
                ]
            }
        ]
    },
    { path: '**', redirectTo: 'login' }
];

export { routes };
