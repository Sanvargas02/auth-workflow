import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  // console.log('isAuthenticatedGuard');
  // console.log({ route, state });

  const authService = inject( AuthService );
  const router = inject(Router);

  // console.log( { status: authService.authStatus() } );
  if ( authService.authStatus() === AuthStatus.authenticated ) {
    return true
  }

  //this is if we do not know if we are authenticated or not, is our first enters to the app
  //And solve the problem of the load the screen
  // if ( authService.authStatus() === AuthStatus.checking ) {
  //   return false
  // }

  // const url = state.url;
  // localStorage.setItem('url', url);
  router.navigateByUrl('/login');

  return false;
};
