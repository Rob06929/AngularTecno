import { Adjustment } from "./adjustment";
import { ProductoAlmacen } from "./producto-almacen,interface,";

export interface DetailAdjustment {
    id?: number;
    cantidad?: number;
    precio?: number;
    almacenProductoId?: number;
    almacenProducto?: ProductoAlmacen;
    ajusteId?: number;
    ajuste?: Adjustment;
}
