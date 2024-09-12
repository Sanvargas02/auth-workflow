import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  handleLogout() {
    // Aquí iría la lógica para cerrar sesión
    localStorage.removeItem('authToken'); // Elimina el token de autenticación

    // Redirige al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }

}
