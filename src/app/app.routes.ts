import { Routes } from '@angular/router';
import LoginComponent from './modules/auth/login/login.component';
import { DashboardLayoutComponent } from './shared/layouts/dashboardLayout/dashboardLayout.component';

// BrowserModule
// import { DashboardLayoutComponent } from './shared/layouts/dashboardLayout/dashboardLayout.component';

export const routes: Routes = [
  {
    path: 'auth',
    // component: LoginComponent
    loadChildren:()=>
       import('./modules/auth/auth.route').then( m => m.auth_routes),

  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    // canActivate: [authGuard], // Protección por guard
    children: [
      {
        path: 'customer',
         loadChildren: () =>
           import(
             './modules/customer/customer.route').then( m => m.customer_routes)
           ,
        data: {
          icon: 'pi pi-users',
          // icon: PrimeIcons.ANDROID,
          title: 'Cliente',
          description: 'Gestion de Clientes',
          permission: 'Cliente'
        },
      },
      {
        path: 'roles',
         loadChildren: () =>
           import(
             './modules/rol/rol.route').then( m => m.rol_routes)
           ,
        data: {
          icon: 'pi pi-users',
          // icon: PrimeIcons.ANDROID,
          title: 'Roles ',
          description: 'Gestion de Roles ',
          permission: 'Rol'
        },
      },
      {
        path: 'roles-permisos',
         loadChildren: () =>
           import(
             './modules/roles-permisos/roles-permisos.route').then( m => m.roles_permisos_routes)
           ,
        data: {
          icon: 'pi pi-users',
          // icon: PrimeIcons.ANDROID,
          title: 'Asignacion de Permisos a los Roles',
          description: 'Gestion de Asignacion de Permisos a los Roles',
          permission: 'Rol Permiso'
        },
      },
      {
        path: 'user',
         loadChildren: () =>
           import(
             './modules/usuario/usuario.route').then( m => m.usuario_routes)
           ,
        data: {
          icon: 'pi pi-users',
          // icon: PrimeIcons.ANDROID,
          title: 'Usuario',
          description: 'Gestion de Usuarios',
          permission: 'Usuario'
        },
      },
      {
        path: 'roles-permisos-usuario',
         loadChildren: () =>
           import(
             './modules/roles-permisos-usuario/roles-permisos-usuario.route').then( m => m.roles_permisos_usuario_routes)
           ,
        data: {
          icon: 'pi pi-users',
          // icon: PrimeIcons.ANDROID,
          title: 'Asignacion de Roles a Usuarios',
          description: 'Gestion de Asignacion de Roles a los Usuario',
          permission: 'Asignacion Roles y Permisos'
        },
      },
      {
        path: 'sale',
         loadChildren: () =>
           import(
             './modules/sale/sale.route').then( m => m.sale_routes)
           ,
        data: {
          icon: 'pi pi-cart-plus',
          // icon: PrimeIcons.ANDROID,
          title: 'Venta',
          description: 'Gestion de Ventas',
          permission: 'Venta'
        },
      },
      {
        path: 'product',
         loadChildren: () =>
           import(
             './modules/product/product.route').then( m => m.product_routes)
           ,
        data: {
          icon: 'pi pi-cart-plus',
          // icon: PrimeIcons.ANDROID,
          title: 'Producto',
          description: 'Gestion de Producto',
          permission: 'Producto'
        },
      },
      {
        path: 'category',
         loadChildren: () =>
           import(
             './modules/category/category.route').then( m => m.category_routes)
           ,
        data: {
          icon: 'pi pi-cart-plus',
          // icon: PrimeIcons.ANDROID,
          title: 'Categoria',
          description: 'Gestion de Categoria',
          permission: 'Categoria'
        },
      },
      {
        path: 'asignar-producto',
        loadChildren: () =>
          import(
            './modules/AsignarProducto/asignar-producto.route').then( m => m.asignar_producto_routes)
          ,
        data: {
          icon: 'pi pi-file-pdf',
          // icon: PrimeIcons.ANDROID,
          title: 'Asignar Producto a Almacen',
          description: 'Gestion de Asignar Producto a Almacen',
          permission: 'Producto Almacen'
        },
      },
      // {
      //   path: 'product',
      //    loadChildren: () =>
      //      import(
      //        './modules/customer/customer.route').then( m => m.customer_routes)
      //      ,
      //   data: {
      //     icon: 'pi pi-list-check',
      //     // icon: PrimeIcons.ANDROID,
      //     title: 'Product',
      //     description: 'Gestion de Products',
      //   },
      // },
      // {
      //   path: 'category',
      //    loadChildren: () =>
      //      import(
      //        './modules/customer/customer.route').then( m => m.customer_routes)
      //      ,
      //   data: {
      //     icon: 'pi pi-table',
      //     // icon: PrimeIcons.ANDROID,
      //     title: 'Category',
      //     description: 'Gestion de Categories',
      //   },
      // },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];
