import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from '../../../interfaces/user.interface';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent implements OnInit {
  user!: User;
  errorMessage: string | null = null;

  userForm!: FormGroup;

  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(8),
      Validators.pattern(/[A-Z]/),         // Al menos una letra mayúscula
      Validators.pattern(/[a-z]/),         // Al menos una letra minúscula
      Validators.pattern(/[0-9]/),         // Al menos un número
      Validators.pattern(/[@$!%*?&]/)      // Al menos un carácter especial]
      ]],
    });
  }

  public login(): void {
    this.authService.getToken(this.userForm.value).subscribe(
      (response: User) => {
        console.log('response:', response);
        sessionStorage.setItem("token", response.token || '');
        sessionStorage.setItem('user', JSON.stringify(response)); // Guardar los datos del usuario en sessionStorage
        sessionStorage.setItem('roles', JSON.stringify(response.roles)); // Guardar roles
        this.redirectToDashboard();
      },
      (error) => {
        this.errorMessage = error.message;
        console.error("Error en login", this.errorMessage);
        this.router.navigate(['/auth/login']);
      }
    );
  }

  private redirectToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  isUpperCaseMissing(): boolean {
    const password = this.userForm.get('password')?.value || '';
    return !/[A-Z]/.test(password);
  }

  isLowerCaseMissing(): boolean {
    const password = this.userForm.get('password')?.value || '';
    return !/[a-z]/.test(password);
  }

  isNumberMissing(): boolean {
    const password = this.userForm.get('password')?.value || '';
    return !/[0-9]/.test(password);
  }

  isSpecialCharMissing(): boolean {
    const password = this.userForm.get('password')?.value || '';
    return !/[@$!%*?&]/.test(password);
  }

}
