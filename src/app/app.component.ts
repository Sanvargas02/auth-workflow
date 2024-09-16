import { Component, computed, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AuthStatus } from './interfaces';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private authService = inject( AuthService );
  private router = inject(Router);

  public finishedAuthCheck = computed<boolean>( () => {
    if( this.authService.authStatus() === AuthStatus.checking) {
      return false;
    }
    return true;
  });

  //The effect will triggered every time the signal change
  public authStatusChangeEffect = effect(() => {

    switch(this.authService.authStatus()) {
      case AuthStatus.checking:
        return;

      case AuthStatus.authenticated:
        this.router.navigateByUrl('/dashboard');
        return;

      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/login');
        return;

    }

  });

}
