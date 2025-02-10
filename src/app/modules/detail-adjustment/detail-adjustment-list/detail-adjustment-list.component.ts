import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { DetailAdjustment } from '../../../interfaces/detail-adjustment';
import { DetailAdjustmentService } from '../service/detail-adjustment.service';
import { PageVisitComponent } from '../../page-visit/page-visit.component';

@Component({
  selector: 'app-detail-adjustment-list',
  imports: [
    CommonModule,
    PageVisitComponent
  ],
  templateUrl: './detail-adjustment-list.component.html',
  styleUrl: './detail-adjustment-list.component.css'
})
export class DetailAdjustmentListComponent {

  @Input() public detailAdjustments: DetailAdjustment[] = [];

  constructor(
    private detailAdjustmentService: DetailAdjustmentService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) { }

  deleteDetailAdjustment(detail_adjustment_id: number): void {
    this.detailAdjustmentService.deleteDetailAdjustment(detail_adjustment_id).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Eliminado!',
          text: 'El Detalle de Almacen ha sido eliminado exitosamente.',
          confirmButtonText: 'OK',
        }).then(() => {
          // Recargar la lista de productos
          this.reloadDetailAdjustments();
        });
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al eliminar el detalle del ajuste. Inténtalo de nuevo.',
          confirmButtonText: 'Entendido',
        });
        this.cdr.markForCheck();
      },
    });
  }



  reloadDetailAdjustments(): void {
    this.detailAdjustmentService.getDetailAdjustment().subscribe({
      next: (detailAdjustments) => {
        this.detailAdjustments = detailAdjustments; // Actualiza la lista de productos
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.cdr.markForCheck();
      },
    });
  }
}
