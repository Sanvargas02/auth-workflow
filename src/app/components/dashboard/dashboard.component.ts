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

    this.authService.logout();

    this.router.navigate(['/login']);
  }

}
