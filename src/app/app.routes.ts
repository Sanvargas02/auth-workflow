import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from './guards/is-authenticated.guard';
import { isNotAuthenticatedGuard } from './guards';

export const routes: Routes = [

  {
    path: 'login',
    loadComponent: () => import('./components/auth/login/login.component'),
    canActivate: [ isNotAuthenticatedGuard ],
    // children: [
    //   {
    //     path: 'el-path',
    //     title: 'A name',
    //     loadComponent: () => import('')
    //   },
    //   {
    //    path: '',
    //    redirectTo: '/el-path',
    //    pathMatch: 'full'
    //   }
    // ]
  },
  {
    path: 'register',
    loadComponent: () => import('./components/auth/register/register.component'),
  },
  {
    path: 'confirmation',
    loadComponent: () => import('./components/auth/confirmation/confirmation.component'),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component'),
    canActivate: [isAuthenticatedGuard],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login'
  }

];
