import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

  {
    path: 'login',
    loadComponent: () => import('./components/auth/login/login.component'),
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
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component'),
    canActivate: [authGuard]
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
