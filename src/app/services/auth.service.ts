import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { Observable, of } from 'rxjs';
import { AuthStatus, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.BASE_URL;
  private http = inject(HttpClient);

  // # We are going to work with signals
  private _currentUser = signal<User|null>(null); //The null is because there are a few situations when there aren't any user, like when the app reload or the user enters for the first time
  private _authStatus = signal<AuthStatus>( AuthStatus.checking ); //Checking because we are verifying the status of the auth

  constructor() { }

  login( email: string, password: string ): Observable<boolean> {


    return of(true)
  }

}
