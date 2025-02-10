import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Adjustment } from '../../interfaces/adjustment';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { PaymentService } from './service/payment.service';
import { Payment } from '../../interfaces/payment';

@Component({
  selector: 'app-payment',
  imports: [
    PaymentListComponent,
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentComponent {

  payments: Payment[] = [];
  errorMessage: string | null = null;

  constructor(
    private paymentService: PaymentService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadAdjustment();
  }

  loadAdjustment(): void {
    this.paymentService.getPayment().subscribe(
      (data) => {
        this.payments = data;
        this.errorMessage = null;
        this.cdr.markForCheck();
      },
      (error) => {
        this.errorMessage = 'Hubo un error al cargar los Pagos';
        this.cdr.markForCheck();
      }
    );
  }
}
