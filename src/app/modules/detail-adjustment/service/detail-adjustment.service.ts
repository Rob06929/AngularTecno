import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';
import { DetailAdjustment } from '../../../interfaces/detail-adjustment';

const httpOptions = (token: string) => ({
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`, // Asegúrate de enviar el token en el formato correcto
  }),
});

@Injectable({
  providedIn: 'root'
})
export class DetailAdjustmentService {
  private apiUrl = `${environment.URL_SERVICIOS}/detailAdjustment`;
  constructor(private http: HttpClient) { }

  // Obtener todas las categorías
  getDetailAdjustment(): Observable<DetailAdjustment[]> {
    const token = sessionStorage.getItem('token');
    return this.http.get<any>('../../../../assets/data/detail-adjustment.json').
      pipe(catchError(this.handleError('getDetailAdjustment', [])));
    //if (token) {
    //  return this.http
    //    .get<DetailAdjustment[]>(this.apiUrl, httpOptions(token))
    //    .pipe(catchError(this.handleError('getDetailAdjustment', [])));
    //} else {
    //  return of([]); // Si no hay token, devuelve un array vacío
    //}
  }

  getDetailAdjustmentById(id: number): Observable<DetailAdjustment> {
    return this.http.get<DetailAdjustment>(`${this.apiUrl}/${id}`);
  }

  addAdjustment(detailAdjustment: DetailAdjustment): Observable<DetailAdjustment> {
    const token = sessionStorage.getItem('token');
    if (token) {
      if (!detailAdjustment.cantidad || !detailAdjustment.precio) {
        console.error('Faltan datos necesarios para crear el detalle ajuste');
        return of({} as DetailAdjustment);
      }

      return this.http
        .post<DetailAdjustment>(this.apiUrl, detailAdjustment, httpOptions(token))
        .pipe(catchError(this.handleError('addDetailAdjustment', detailAdjustment)));
    } else {
      console.error('No hay token disponible');
      return of({} as DetailAdjustment); // Retorna un objeto vacío si no hay token
    }
  }

  updateDetailAdjustment(id: number, detailAdjustment: DetailAdjustment): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, detailAdjustment);
  }

  deleteDetailAdjustment(id: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) return of({ error: 'No token available' });
      return this.http
        .delete(`${this.apiUrl}/${id}`, httpOptions(token))
        .pipe(catchError(this.handleError<any>('deleteDetailAdjustment', { error: 'Error al eliminar' })));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
