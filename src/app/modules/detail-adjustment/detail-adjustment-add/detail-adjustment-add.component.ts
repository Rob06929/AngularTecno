import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Adjustment } from '../../../interfaces/adjustment';
import { ProductoAlmacen } from '../../../interfaces/producto-almacen,interface,';
import { ProductoAlmacenService } from '../../product/service/productoAlmacen.service';
import { DetailAdjustmentService } from '../service/detail-adjustment.service';
import { AdjustmentService } from '../../adjustment/service/adjustment.service';
import { PageVisitComponent } from '../../page-visit/page-visit.component';

@Component({
  selector: 'app-detail-adjustment-add',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    PageVisitComponent
  ],
  templateUrl: './detail-adjustment-add.component.html',
  styleUrl: './detail-adjustment-add.component.css'
})
export class DetailAdjustmentAddComponent {

  @Input() public almacenProductos: ProductoAlmacen[] = [];
  @Input() public adjustments: Adjustment[] = [];

  adjustmentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private detailAdjustmentService: DetailAdjustmentService,
    private router: Router,
    private adjustmentService: AdjustmentService,
    private almacenProductosService: ProductoAlmacenService,
  ) {
    this.loadAlmacenProductos();
    this.loadAdjustments();
  }

  ngOnInit(): void {
    this.adjustmentForm = this.fb.group({
      precio: [0, [Validators.required]],
      cantidad: [0, [Validators.required]],
      almacenProductoId: [null, [Validators.required]],
      ajusteId: [null, [Validators.required]],
    });
  }

  createDetailAdjustment(): void {
    if (this.adjustmentForm.valid) {
      const adjustment = this.adjustmentForm.value;
      console.log(adjustment);
      this.detailAdjustmentService.addAdjustment(adjustment).subscribe(
        {
          next: (response) => {
            Swal.fire({
              icon: 'success',
              title: 'detail adjustment creado',
              text: 'El detail adjustment se ha creado exitosamente.',
              confirmButtonText: 'OK'
            }).then(() => {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/dashboard/detailAdjustment']); // Navega a la lista de productos
              });
            });
          },
          error: (err) => {
            console.error(err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un problema al crear el detail adjustment. Inténtalo de nuevo.',
              confirmButtonText: 'OK'
            });
          }
        }
      );
    } else {
      console.log('Formulario inválido');
    }
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
