import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
//import { HttpClientModule } from '@angular/common/http'; Its Deprecated

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

  private showPassword = false;
  // email = '';
  // password = '';


  constructor(private router: Router) {}

  // # Reactive Forms
  private fb = inject( FormBuilder );

  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (this.myForm.valid) {
      // Aquí se integraría la lógica de autenticación, como llamar al servicio de login
      //console.log( this.myForm.value );
      const { email, password } = this.myForm.value
      //console.log('Logging in with', email, password);
      this.router.navigate(['/dashboard']);
    } else {
      console.log('Form not valid')
    }
  }

}
