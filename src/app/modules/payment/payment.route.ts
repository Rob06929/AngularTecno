import { Routes } from '@angular/router';
import { PaymentComponent } from './payment.component';
import { PaymentListComponent } from './payment-list/payment-list.component';

export const payment_routes: Routes = [
  {
    path: '',
    component: PaymentComponent,
  },
  {
    path: 'list',
    component: PaymentListComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
