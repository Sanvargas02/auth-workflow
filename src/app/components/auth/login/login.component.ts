import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
//import { HttpClientModule } from '@angular/common/http'; Its Deprecated
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    //HttpClientModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {

  public showPassword = false;

  // # Reactive Forms
  private fb = inject( FormBuilder );

  // # AuthService
  private authService = inject(AuthService);


  constructor(private router: Router) {}


  public myForm: FormGroup = this.fb.group({
    email: ['santiago@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  })

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (this.myForm.valid) {
      const { email, password } = this.myForm.value

      this.authService.login( email, password )
        .subscribe( {
          next: () => this.router.navigateByUrl('/dashboard'),
          error: (message) => {
            Swal.fire('Error', message, 'error'); //Alert
          },

        } )

      //this.router.navigate(['/dashboard']);
    } else {
      console.log('Form not valid')
    }
  }

}
