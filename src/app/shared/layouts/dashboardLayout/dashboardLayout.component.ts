import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, HostBinding, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { Rol } from '../../../interfaces/rol.interface';
import { Router } from '@angular/router';
import { Permiso } from '../../../interfaces/permiso.interface';
import { User } from '../../../interfaces/user.interface';
import { PageVisitComponent } from '../../../modules/page-visit/page-visit.component';
// import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard-layout',
  imports: [
    CommonModule,
    RouterModule,
    SidebarComponent,
    PageVisitComponent,
  ],
  templateUrl: './dashboardLayout.component.html',
  styleUrl: './dashboardLayout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutComponent implements OnInit {


  darkMode = signal<boolean>(
    JSON.parse(window.localStorage.getItem('darkMode') ?? 'false')
  );

  @HostBinding('class.dark') get mode() {
    return this.darkMode();
  }

  public userPermissions: Permiso[] = [];
  user: User | undefined;

  constructor(public router: Router) { 
    effect(() => {
      window.localStorage.setItem('darkMode', JSON.stringify(this.darkMode()));
    });
   }

  ngOnInit(): void {
    // Recuperar permisos desde sessionStorage
    const permissions = JSON.parse(sessionStorage.getItem('roles') || '[]');
    const user = JSON.parse(sessionStorage.getItem('user') || '[]');
    this.user = user;
    this.userPermissions = permissions.flatMap((rol: Rol) => rol.permisos);
    console.log('Permisos del usuario:', this.userPermissions);
  }
  public routes = routes[1].children?.filter((route) => route.data);

  hasPermission(permissionName: string): boolean {
    // Verificamos si el usuario tiene el permiso adecuado en cualquiera de sus roles
    return this.userPermissions.some(perm => perm.nombre_Permiso === permissionName);
  }
  // Método para cerrar sesión
  logout() {
    // Eliminar el usuario y el token (o cualquier dato relacionado con la autenticación)
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('roles');
    sessionStorage.removeItem('token');
    // Redirigir al usuario a la página de login
    this.router.navigate(['/']);
  }

}
