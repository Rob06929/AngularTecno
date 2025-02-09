import { Category } from "./category.interface";

// Modelo de Producto
export interface Product {
  idProducto?: number;
  id?: number; //si
  descripcion?: string;
  nombre?: string;//si
  precio: number;//si
  stock?: number;
  idCategoria?: number;
  id_Categoria?: number;//si
  id_categoria?: number;//si
  categoria?: Category;//si
}
