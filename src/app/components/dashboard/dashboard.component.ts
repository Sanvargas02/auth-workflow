import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent {

  private authService = inject( AuthService );

  public user = this.authService.currentUser; // We have the user update

  constructor(private router: Router) {}

  // get user() {
  //   return this.authService.currentUser();
  // }

  handleLogout() {
    // Aquí iría la lógica para cerrar sesión
    localStorage.removeItem('authToken'); // Elimina el token de autenticación

    // Redirige al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }

}
