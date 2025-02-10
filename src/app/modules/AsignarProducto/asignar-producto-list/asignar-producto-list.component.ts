import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ProductoAlmacen } from '../../../interfaces/producto-almacen,interface,';
import { ProductoAlmacenService } from '../../product/service/productoAlmacen.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { PageVisitComponent } from '../../page-visit/page-visit.component';

@Component({
  selector: 'app-asignar-producto-list',
  imports: [CommonModule, PageVisitComponent],
  templateUrl: './asignar-producto-list.component.html',
  styleUrl: './asignar-producto-list.component.css'
})
export class AsignarProductoListComponent {
  @Input() public productosAlmacenes: ProductoAlmacen[] = [];
  
    constructor(
      private productoAlmacenService: ProductoAlmacenService,
      private cdr: ChangeDetectorRef,
      private http: HttpClient
    ) {}

    ngOnInit(): void {
      this.reloadProductoAlmacenes();
    }

  
    deleteProductoAlmacen(producto_almacen_id: number): void {
      this.productoAlmacenService.deleteProductoAlmacen(producto_almacen_id).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: '¡Eliminado!',
            text: 'El almacen ha sido eliminado exitosamente.',
            confirmButtonText: 'OK',
          }).then(() => {
            // Recargar la lista de productos
            this.reloadProductoAlmacenes();
          });
          this.cdr.markForCheck();
        },
        error: (error: any) => {
          console.error(error);
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
  
    reloadProductoAlmacenes(): void {
      this.productoAlmacenService.getProductoAlmacenAll().subscribe({
        next: (almacenes) => {
          this.productosAlmacenes = almacenes; // Actualiza la lista de productos
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error(err);
          this.cdr.markForCheck();
        },
      });
    }
}
