import { Routes } from '@angular/router';
import { DetailAdjustmentComponent } from './detail-adjustment.component';
import { DetailAdjustmentListComponent } from './detail-adjustment-list/detail-adjustment-list.component';
import { DetailAdjustmentAddComponent } from './detail-adjustment-add/detail-adjustment-add.component';

export const detail_adjustment_routes: Routes = [
  {
    path: '',
    component: DetailAdjustmentComponent,
  },
  {
    path: 'list',
    component: DetailAdjustmentListComponent,
  },
  {
    path: 'add',
    component: DetailAdjustmentAddComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
