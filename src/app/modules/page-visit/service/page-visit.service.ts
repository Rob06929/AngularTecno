import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';
import { Category } from '../../../interfaces/category.interface';
import { PageVisit } from '../../../interfaces/page-visit';


const httpOptions = (token: string) => ({
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`  // Asegúrate de enviar el token en el formato correcto
  })
});

@Injectable({
  providedIn: 'root'
})
export class PageVisitService {

  private url: string = `${environment.URL_SERVICIOS}/page-visit`;
  constructor(private http: HttpClient) { }

  incrementsPageVisits(page: string): Observable<PageVisit> {
    const token = sessionStorage.getItem('token'); // Obtén el token desde sessionStorage
    
    return this.http.get<PageVisit>('../../../../assets/data/page-visit.json');
    //if (token) {
    //  return this.http.post<PageVisit>(this.url, page, httpOptions(token)).pipe(
    //    catchError(this.handleError<PageVisit>('incrementsPageVisits'))
    //  );
    //} else {
    //  console.error('No token found');
    //  return of(); // Si no hay token, retorna un observable vacío
    //}
  }

  getPageVisits(page: string): Observable<PageVisit> {
    const token = sessionStorage.getItem('token'); // Obtén el token desde sessionStorage
    return this.http.get<PageVisit>('../../../../assets/data/page-visit.json');
    //return this.http.get<PageVisit>(`${this.apiUrl}/${page}`);
    //if (token) {
    //  return this.http.get<PageVisit>(this.url, page, httpOptions(token)).pipe(
    //    catchError(this.handleError<PageVisit>('getPageVisits'))
    //  );
    //} else {
    //  console.error('No token found');
    //  return of(); // Si no hay token, retorna un observable vacío
    //}
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // Loguea el error para depuración
      return of(result as T); // Retorna el resultado predeterminado
    };
  }
}
