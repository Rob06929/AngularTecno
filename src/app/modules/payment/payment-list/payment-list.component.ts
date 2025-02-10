import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Payment } from '../../../interfaces/payment';
import { PaymentService } from '../service/payment.service';
import { PageVisitComponent } from '../../page-visit/page-visit.component';

@Component({
  selector: 'app-payment-list',
  imports: [CommonModule, PageVisitComponent],
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.css'
})
export class PaymentListComponent {
  @Input() public payments: Payment[] = [];

  constructor(
    private paymentService: PaymentService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) { }

  deletePayment(payment_id: number): void {
    this.paymentService.deletePayment(payment_id).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Eliminado!',
          text: 'El pago ha sido eliminado exitosamente.',
          confirmButtonText: 'OK',
        }).then(() => {
          // Recargar la lista de productos
          this.reloadPayments();
        });
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al eliminar el pago. Inténtalo de nuevo.',
          confirmButtonText: 'Entendido',
        });
        this.cdr.markForCheck();
      },
    });
  }



  reloadPayments(): void {
    this.paymentService.getPayment().subscribe({
      next: (payments) => {
        this.payments = payments; // Actualiza la lista de productos
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.cdr.markForCheck();
      },
    });
  }
}
