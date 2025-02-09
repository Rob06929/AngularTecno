import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { Almacen } from '../../../interfaces/almacen.interface';
import { AlmacenService } from '../service/almacen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-almacen-list',
  imports: [
    CommonModule
  ],
  templateUrl: './almacen-list.component.html',
  styleUrl: './almacen-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlmacenListComponent {
  @Input() public almacenes: Almacen[] = [];

  constructor(
    private almacenService: AlmacenService,
    private cdr: ChangeDetectorRef
  ) {}

  deleteAlmacen(almacen_id: number): void {
    this.almacenService.deleteAlmacen(almacen_id).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Eliminado!',
          text: 'El almacen ha sido eliminado exitosamente.',
          confirmButtonText: 'OK',
        }).then(() => {
          // Recargar la lista de productos
          this.reloadAlmacenes();
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

  reloadAlmacenes(): void {
    this.almacenService.getAlmacenes().subscribe({
      next: (almacenes) => {
        this.almacenes = almacenes; // Actualiza la lista de productos
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.cdr.markForCheck();
      },
    });
  }
}
