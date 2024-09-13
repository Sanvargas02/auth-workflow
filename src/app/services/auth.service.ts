import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { map, Observable, of, tap } from 'rxjs';
import { AuthStatus, LoginResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.BASE_URL; // URL to the Back
  private http = inject(HttpClient);

  // # We are going to work with signals
  // # We will manage the states via signals
  private _currentUser = signal<User|null>(null); //The null is because there are a few situations when there aren't any user, like when the app reload or the user enters for the first time
  private _authStatus = signal<AuthStatus>( AuthStatus.checking ); //Checking because we are verifying the status of the auth

  //! To the external world - All outage of the service
  public currentUser = computed( () => this._currentUser );
  public authStatus = computed( () => this._authStatus );

  constructor() { }

  login( email: string, password: string ): Observable<boolean> {

    const url = `${ this.baseUrl }/auth/login`; //EndPoint.
    const body = { email, password }; // The fields that the EndPoint is waiting for.

    return this.http.post<LoginResponse>( url, body )
      .pipe(
        tap( ( {user, token} ) => {
          this._currentUser.set( user );
          this._authStatus.set( AuthStatus.authenticated );
          localStorage.setItem('token', token);
        } ),

        map( () => true )

        // TODO: handle errors
      )

    //return of(true)
  }

}
