import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {

  // console.log('isAuthenticatedGuard');
  // console.log({ route, state });

  const authService = inject( AuthService );
  const router = inject(Router);

  // console.log( { status: authService.authStatus() } );
  if ( authService.authStatus() === AuthStatus.authenticated ) {
    router.navigateByUrl('/dashboard');
    return false
  }

  return true;
};
