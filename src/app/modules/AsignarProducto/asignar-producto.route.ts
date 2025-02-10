import { Routes } from '@angular/router';
import { AsignarProductoComponent } from './AsignarProducto.component';
import { AsignarProductoListComponent } from './asignar-producto-list/asignar-producto-list.component';

export const asignar_producto_routes: Routes = [
  {
    path: '',
    component: AsignarProductoListComponent,
  },
  {
    path: 'list',
    component: AsignarProductoListComponent,
  },
  {
    path: 'add',
    component: AsignarProductoComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
