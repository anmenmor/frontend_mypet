import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
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


  createVaccine(newVaccineName: string): Observable<Vaccine>{
    const body = {'name': newVaccineName};
    
      return this.http.post<Vaccine>(this.VACCINES_API_SERVER, body)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status == 409) {
            alert("La vacuna ya existe");
          } else {
            alert("Algo ha ido mal, intentelo de nuevo mas tarde");
            console.error(
              `Backend returned code ${error.status}, ` +
              `body was: ${error.error}`);
          }
          return throwError('Something bad happened; please try again later.');
        })
      );  
  }

  changeAvailableOption(vaccine: Vaccine): Observable<Vaccine> {
    const body = {'available': vaccine.available};
    return this.http.put<Vaccine>(this.VACCINES_API_SERVER+"/"+vaccine.id, body)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        alert("Algo ha ido mal, intentelo de nuevo mas tarde");
        return throwError('Something bad happened; please try again later.');
      }))
}}