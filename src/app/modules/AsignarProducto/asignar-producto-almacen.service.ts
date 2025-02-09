import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { catchError, Observable, of } from 'rxjs';

function httpOptions(token: string | null): { headers: HttpHeaders } {
  return {
    headers: new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json', // Asegurar tipo de contenido
    }),
  };
}
@Injectable({
  providedIn: 'root',
})
export class AsignarProductoAlmacenService {
  private apiUrl = `${environment.URL_SERVICIOS}/productoalmacen`;

  constructor(private http: HttpClient) {}

  createProductoAlamacen(productoAlamacen: any): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) return of({ error: 'No token available' });

    return this.http
      .post<any>(this.apiUrl, productoAlamacen, httpOptions(token))
      .pipe(
        catchError(
          this.handleError<any>('createProductoAlamacen', {
            error: 'Error al crear ProductoAlamacen',
          })
        )
      );
  }

   /** 🔹 Manejo de errores */
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(`${operation} failed:`, error); // Loguear el error
        return of(result as T);
      };
    }

}
