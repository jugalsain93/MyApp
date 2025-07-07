import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { MainLayout } from './shared/layout/main-layout';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadChildren: () =>
      import('./modules/auth/auth-routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'dashboard',
    component: MainLayout,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/dashboard/dashboard-routes').then(m => m.DASHBOARD_ROUTES)
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'user-profile',
        loadComponent: () =>
          import('./modules/profile/user-profile/user-profile').then(m => m.UserProfileComponent)
      }
    ]
  },
  {
    path: 'BlockRadiance',
    component: MainLayout,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/blockradiance/blockradiance-routes').then(m => m.BLOCKRADIANCE_ROUTES)
  },
  
  {
  path: '',
  component: MainLayout,
  canActivate: [AuthGuard], // optional, use only if NotFound needs auth
  children: [
    {
      path: '**',
      loadComponent: () =>
        import('./shared/component/not-found').then(m => m.NotFound)
    }
  ]
}

];
