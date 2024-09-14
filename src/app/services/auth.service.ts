import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { AuthStatus, CheckTokenResponse, LoginResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.BASE_URL; // URL to the Back
  private http = inject(HttpClient);

  // # We are going to work with signals
  // # We will manage the states via signals
  private _currentUser = signal<User | null>(null); //The null is because there are a few situations when there aren't any user, like when the app reload or the user enters for the first time
  private _authStatus = signal<AuthStatus>( AuthStatus.checking ); //Checking because we are verifying the status of the auth

  //! To the external world - All outage of the service
  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authStatus() );

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
          // console.log({user, token});
          // console.log(this._currentUser());
          // console.log(this._authStatus());
        } ),

        map( () => true ),

        // TODO: handle errors
        catchError( err => {
          //console.log(err);
          return throwError( () => err.error.message );
          //return of(false);
        })
      );

    //return of(true)
  }

  checkAuthStatus(): Observable<boolean> {

    const url = `${ this.baseUrl }/auth/check-token`;
    const token = localStorage.getItem('token');

    if ( !token ) return of(false); //First verification

    const headers = new HttpHeaders() //Second Verification
      .set('Authorization', `Bearer ${token}`)

    return this.http.get<CheckTokenResponse>(url, { headers })
      .pipe(
        map(( {token, user} ) => {
          this._currentUser.set( user );
          this._authStatus.set( AuthStatus.authenticated );
          localStorage.setItem('token', token);

          return true;
        }),
        // Error
        catchError(() => {
          this._authStatus.set( AuthStatus.notAuthenticated );
          return of(false)
        }) //The error here is not relevant for the nature of the method
      );

  }


}
