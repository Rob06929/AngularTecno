import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../interfaces/user.interface';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { PageVisitComponent } from '../../page-visit/page-visit.component';

@Component({
  selector: 'app-usuario-add',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    PageVisitComponent
  ],
  templateUrl: './usuario-add.component.html',
  styleUrl: './usuario-add.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsuarioAddComponent {
  @Input() user: User[] = [];
  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.userForm = this.fb.group({ 
      fullname: ['', [Validators.required, Validators.maxLength(30)]],
      username: ['', [Validators.required, Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(8),
      Validators.pattern(/[A-Z]/),         // Al menos una letra mayúscula
      Validators.pattern(/[a-z]/),         // Al menos una letra minúscula
      Validators.pattern(/[0-9]/),         // Al menos un número
      Validators.pattern(/[@$!%*?&]/)      // Al menos un carácter especial]
      ]],
    });

    // throw new Error('Method not implemented.');
  }

  // Método para enviar los datos del formulario
  createUser(): void {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      console.log('data para crear un user:', user);

      this.usuarioService.createUsuario(user).subscribe(
        {
          next: (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Usuario creado',
              text: 'El usuario se ha creado exitosamente.',
              confirmButtonText: 'OK'
            }).then(() => {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/dashboard/user']); // Navega a la lista de productos
              });
            });
          },
          error: (err) => {
            console.error(err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un problema al crear el usario. Inténtalo de nuevo.',
              confirmButtonText: 'OK'
            });
          }
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }


  goBack() {
    this.router.navigate(['/dashboard/user']);

  }

  // usuario-add.component.ts

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
