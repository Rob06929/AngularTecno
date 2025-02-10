import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';
import { Adjustment } from '../../../interfaces/adjustment';

const httpOptions = (token: string) => ({
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`, // Asegúrate de enviar el token en el formato correcto
  }),
});

@Injectable({
  providedIn: 'root'
})
export class AdjustmentService {
  private apiUrl = `${environment.URL_SERVICIOS}/adjustment`;
  constructor(private http: HttpClient) { }

  // Obtener todas las categorías
  getAdjustment(): Observable<Adjustment[]> {
    const token = sessionStorage.getItem('token');
    return this.http.get<any>('../../../../assets/data/adjustment.json').
      pipe(catchError(this.handleError('getAdjustment', [])));
    //if (token) {
    //  return this.http
    //    .get<Adjustment[]>(this.apiUrl, httpOptions(token))
    //    .pipe(catchError(this.handleError('getAdjustment', [])));
    //} else {
    //  return of([]); // Si no hay token, devuelve un array vacío
    //}
  }

  getAdjustmentById(id: number): Observable<Adjustment> {
    return this.http.get<Adjustment>(`${this.apiUrl}/${id}`);
  }

  addAdjustment(adjustment: Adjustment): Observable<Adjustment> {
    const token = sessionStorage.getItem('token');
    if (token) {
      if (!adjustment.tipo || !adjustment.fecha) {
        console.error('Faltan datos necesarios para crear el ajuste');
        return of({} as Adjustment);
      }

      return this.http
        .post<Adjustment>(this.apiUrl, adjustment, httpOptions(token))
        .pipe(catchError(this.handleError('addAdjustment', adjustment)));
    } else {
      console.error('No hay token disponible');
      return of({} as Adjustment); // Retorna un objeto vacío si no hay token
    }
  }

  updateAdjustment(id: number, adjustment: Adjustment): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, adjustment);
  }

  deleteAdjustment(id: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (token) {
      return this.http
        .delete(`${this.apiUrl}/${id}`, httpOptions(token))
        .pipe(catchError(this.handleError('deleteAdjustment')));
    } else {
      return of(null);
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
