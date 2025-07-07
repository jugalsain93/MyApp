// src/app/features/dashboard/dashboard.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { DashboardHome } from './dashboard-home';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard], // ✅ protect all children
    children: [
      { path: '', component: DashboardHome },
     // { path: 'update-user', component: UpdateUser }
    ]
  }
];
