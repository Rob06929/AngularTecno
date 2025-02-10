import { Sale } from "./sale.interface";

export interface Payment {
    id?: number;
    monto?: number;
    estado?: number;
    fechaHora: string;
    imagen?: string;
    url?: string;
    saleId?: number;
    sale?: Sale;
} 
