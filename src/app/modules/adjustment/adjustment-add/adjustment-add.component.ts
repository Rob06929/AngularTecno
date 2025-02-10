import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AdjustmentService } from '../service/adjustment.service';
import { Router } from '@angular/router';
import { Adjustment } from '../../../interfaces/adjustment';
import { TypeAdjustment } from '../../../interfaces/type-adjustment';
import { TypeAdjustmentService } from '../service/type-adjustment.service';
import { PageVisitComponent } from '../../page-visit/page-visit.component';

@Component({
  selector: 'app-adjustment-add',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    PageVisitComponent
  ],
  templateUrl: './adjustment-add.component.html',
  styleUrl: './adjustment-add.component.css'
})
export class AdjustmentAddComponent {
  adjustmentForm!: FormGroup;

  typesAdjustment: TypeAdjustment[] = [];

  constructor(
    private fb: FormBuilder,
    private adjustmentService: AdjustmentService,
    private typeAdjustmentService: TypeAdjustmentService,
    private router: Router
  ) {
    this.loadTypeAdjustment();
  }

  ngOnInit(): void {
    this.adjustmentForm = this.fb.group({
      tipo: ['', [Validators.required, Validators.maxLength(30)]],
      fecha: [new Date().toISOString().substring(0, 10), [Validators.required]],
    });
  }

  createAdjustment(): void {
    if (this.adjustmentForm.valid) {
      const adjustment = this.adjustmentForm.value;
      this.adjustmentService.addAdjustment(adjustment).subscribe(
        {
          next: (response) => {
            Swal.fire({
              icon: 'success',
              title: 'adjustment creado',
              text: 'El adjustment se ha creado exitosamente.',
              confirmButtonText: 'OK'
            }).then(() => {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/dashboard/adjustment']); // Navega a la lista de productos
              });
            });
          },
          error: (err) => {
            console.error(err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un problema al crear el adjustment. Inténtalo de nuevo.',
              confirmButtonText: 'OK'
            });
          }
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }

  loadTypeAdjustment(): void {
    this.typeAdjustmentService.getTypeAdjustment().subscribe(
      (data) => {
        this.typesAdjustment = data;
      }
    );
  }
}
