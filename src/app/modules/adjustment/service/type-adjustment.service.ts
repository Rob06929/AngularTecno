import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TypeAdjustment } from '../../../interfaces/type-adjustment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { catchError } from 'rxjs/operators';

const httpOptions = (token: string) => ({
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`, // Asegúrate de enviar el token en el formato correcto
  }),
});

@Injectable({
  providedIn: 'root'
})
export class TypeAdjustmentService {

  private apiUrl = `${environment.URL_SERVICIOS}/typeAdjustment`;
  constructor(private http: HttpClient) { }

  getTypeAdjustment(): Observable<TypeAdjustment[]> {
    const token = sessionStorage.getItem('token'); // Obtener el token del localStorage
    return this.http.get<any>('../../../../assets/data/tipoAjuste.json').
      pipe(catchError(this.handleError('getTypeAdjustment', [])));
    //if (token) {
    //  return this.http
    //    .get<TypeAdjustment[]>(this.apiUrl, httpOptions(token))
    //    .pipe(catchError(this.handleError('getTypeAdjustment', [])));
    //} else {
    //  return of([]); // Si no hay token, devuelve un array vacío
    //}
  }

  private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error); // Loguea el error para depuración
        return of(result as T); // Retorna el resultado predeterminado
      };
    }
}
