import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterComponent {
  showPassword = false;
  // name = '';
  // email = '';
  // password = '';

  constructor(private router: Router) {}

  // # Reactive Forms
  private fb = inject( FormBuilder );

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  register() {
    if (this.myForm.valid) {
      // Aquí puedes integrar la lógica de registro, por ejemplo, llamar a un servicio para el registro
      //console.log( this.myForm.value );
      const { name, email, password } = this.myForm.value
      //console.log('Registering with', name, email, password);
      this.router.navigate(['/confirmation']);
    } else {
      console.log('Form not valid')
    }

  }

 }
