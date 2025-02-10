import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { Adjustment } from '../../../interfaces/adjustment';
import { AdjustmentService } from '../service/adjustment.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { PageVisitComponent } from '../../page-visit/page-visit.component';

@Component({
  selector: 'app-adjustment-list',
  imports: [
    CommonModule,
    PageVisitComponent
  ],
  templateUrl: './adjustment-list.component.html',
  styleUrl: './adjustment-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdjustmentListComponent {

  @Input() public adjustments: Adjustment[] = [];

  constructor(
    private adjustmentService: AdjustmentService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) { }

  deleteAdjustment(adjustment_id: number): void {
    this.adjustmentService.deleteAdjustment(adjustment_id).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Eliminado!',
          text: 'El almacen ha sido eliminado exitosamente.',
          confirmButtonText: 'OK',
        }).then(() => {
          // Recargar la lista de productos
          this.reloadAdjustments();
        });
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al eliminar el almacen. Inténtalo de nuevo.',
          confirmButtonText: 'Entendido',
        });
        this.cdr.markForCheck();
      },
    });
  }



  reloadAdjustments(): void {
    this.adjustmentService.getAdjustment().subscribe({
      next: (adjustments) => {
        this.adjustments = adjustments; // Actualiza la lista de productos
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.cdr.markForCheck();
      },
    });
  }
}
 