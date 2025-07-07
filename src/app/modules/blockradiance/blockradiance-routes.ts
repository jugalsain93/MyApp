// src/app/features/dashboard/dashboard.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { BlockRadianceComponent } from './blockradiance/blockradiance';

export const BLOCKRADIANCE_ROUTES: Routes = [
  {
    
    path: '',
    canActivateChild: [AuthGuard], // ✅ protect all children
    children: [
      { path: 'BlockRadianceMembershipList', component: BlockRadianceComponent }   ]
  }
];
