import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AdjustmentListComponent } from './adjustment-list/adjustment-list.component';
import { AdjustmentAddComponent } from './adjustment-add/adjustment-add.component';
import { Adjustment } from '../../interfaces/adjustment';
import { AdjustmentService } from './service/adjustment.service';

@Component({
  selector: 'app-adjustment',
  imports: [
    AdjustmentListComponent,
    AdjustmentAddComponent,
  ],
  templateUrl: './adjustment.component.html',
  styleUrl: './adjustment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdjustmentComponent {
  adjustments: Adjustment[] = [];
  errorMessage: string | null = null;

  constructor(
    private adjustmentService: AdjustmentService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadAdjustment();
  }

  loadAdjustment(): void {
    this.adjustmentService.getAdjustment().subscribe(
      (data) => {
        this.adjustments = data;
        this.errorMessage = null;
        this.cdr.markForCheck();
      },
      (error) => {
        this.errorMessage = 'Hubo un error al cargar los almacenes';
        this.cdr.markForCheck();
      }
    ); 
  }
}
