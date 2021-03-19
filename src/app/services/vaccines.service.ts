import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Vaccine } from 'src/app/models/vaccine';
import { Observable} from 'rxjs/internal/Observable';
import {catchError} from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';


@Injectable({
  providedIn: 'root'
})
export class VaccinesService {
  private VACCINES_API_SERVER ="http://localhost:8000/api/vaccines";
  constructor(private http: HttpClient) {}

  listAllVaccines() : Observable<Vaccine[]> {
    return this.http.get<Vaccine[]>(this.VACCINES_API_SERVER);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      alert("Ha ocurrido un error inesperado. Intentelo de nuevo")
    } else {
      if (error.status == 409) {
        alert("La vacuna ya existe");
      } else {
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      } 
    }

    return throwError(
      'Something bad happened; please try again later.');
  }

  createVaccine(newVaccineName: string): Observable<Vaccine>{
    const body = {'name': newVaccineName};
    
      return this.http.post<Vaccine>(this.VACCINES_API_SERVER, body)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status == 409) {
            alert("La vacuna ya existe");
          } else {
            console.error(
              `Backend returned code ${error.status}, ` +
              `body was: ${error.error}`);
          }
          return throwError('Something bad happened; please try again later.');
        })
      );  
  }

}
