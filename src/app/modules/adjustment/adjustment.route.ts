import { Routes } from '@angular/router';
import { AdjustmentComponent } from './adjustment.component';
import { AdjustmentListComponent } from './adjustment-list/adjustment-list.component';
import { AdjustmentAddComponent } from './adjustment-add/adjustment-add.component';

export const adjustment_routes: Routes = [
  {
    path: '',
    component: AdjustmentComponent,
  },
  {
    path: 'list',
    component: AdjustmentListComponent,
  },
  {
    path: 'add',
    component: AdjustmentAddComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
