import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';
import { Payment } from '../../../interfaces/payment';

const httpOptions = (token: string) => ({
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`, // Asegúrate de enviar el token en el formato correcto
  }),
});

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = `${environment.URL_SERVICIOS}/payment`;
  constructor(private http: HttpClient) { }

  getPayment(): Observable<Payment[]> {
    const token = sessionStorage.getItem('token');
    return this.http.get<any>('../../../../assets/data/payment.json').
      pipe(catchError(this.handleError('getPayment', [])));
    //if (token) {
    //  return this.http
    //    .get<Payment[]>(this.apiUrl, httpOptions(token))
    //    .pipe(catchError(this.handleError('getPayment', [])));
    //} else {
    //  return of([]); // Si no hay token, devuelve un array vacío
    //}
  }

  getPaymentById(id: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}/${id}`);
  }

  addAdjustment(Payment: Payment): Observable<Payment> {
    const token = sessionStorage.getItem('token');
    if (token) {
      if (!Payment.estado || !Payment.fechaHora || !Payment.id || !Payment.imagen || !Payment.monto
        || !Payment.url
      ) {
        console.error('Faltan datos necesarios para crear el detalle ajuste');
        return of({} as Payment);
      }

      return this.http
        .post<Payment>(this.apiUrl, Payment, httpOptions(token))
        .pipe(catchError(this.handleError('addPayment', Payment)));
    } else {
      console.error('No hay token disponible');
      return of({} as Payment); // Retorna un objeto vacío si no hay token
    }
  }

  updatePayment(id: number, Payment: Payment): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, Payment);
  }

  deletePayment(id: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) return of({ error: 'No token available' });
    return this.http
      .delete(`${this.apiUrl}/${id}`, httpOptions(token))
      .pipe(catchError(this.handleError<any>('deletePayment', { error: 'Error al eliminar' })));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
