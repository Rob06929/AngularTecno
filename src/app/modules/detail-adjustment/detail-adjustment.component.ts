import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { DetailAdjustmentListComponent } from './detail-adjustment-list/detail-adjustment-list.component';
import { DetailAdjustmentAddComponent } from './detail-adjustment-add/detail-adjustment-add.component';
import { DetailAdjustmentService } from './service/detail-adjustment.service';
import { DetailAdjustment } from '../../interfaces/detail-adjustment';
import { AdjustmentService } from '../adjustment/service/adjustment.service';
import { ProductoAlmacenService } from '../product/service/productoAlmacen.service';
import { ProductoAlmacen } from '../../interfaces/producto-almacen,interface,';
import { Adjustment } from '../../interfaces/adjustment';

@Component({
  selector: 'app-detail-adjustment',
  imports: [
    DetailAdjustmentListComponent,
    DetailAdjustmentAddComponent,
  ],
  templateUrl: './detail-adjustment.component.html',
  styleUrl: './detail-adjustment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailAdjustmentComponent {

  detailAdjustments: DetailAdjustment[] = [];
  almacenProductos: ProductoAlmacen[] = [];
  adjustments: Adjustment[] = [];
  errorMessage: string | null = null;

  constructor(
    private detailAdjustmentService: DetailAdjustmentService,
    private cdr: ChangeDetectorRef,
    private adjustmentService: AdjustmentService,
    private almacenProductosService: ProductoAlmacenService,
  ) { 
    
    //this.loadAlmacenProductos();
    //this.loadAdjustments();
  }

  ngOnInit(): void {
    this.loadDetailAdjustment();
  }

  loadDetailAdjustment(): void {
    this.detailAdjustmentService.getDetailAdjustment().subscribe(
      (data) => {
        this.detailAdjustments = data;
        this.errorMessage = null;
        this.cdr.markForCheck();
      },
      (error) => {
        this.errorMessage = 'Hubo un error al cargar los detalles de los ajustes';
        this.cdr.markForCheck();
      }
    );
  }

  loadAlmacenProductos(): void {
    this.almacenProductosService.getProductoAlmacenAll().subscribe(
      (data) => {
        this.almacenProductos = data;
      }
    );
  }

  loadAdjustments(): void {
    this.adjustmentService.getAdjustment().subscribe(
      (data) => {
        this.adjustments = data;
      }
    );
  }
}
