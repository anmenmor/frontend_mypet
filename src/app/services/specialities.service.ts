import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Specialities } from '../models/Specialities';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class SpecialitiesService {
  private SPECIALITIES_API_SERVER="http://127.0.0.1:8000/api/specialities";
  
  constructor(private http: HttpClient) { }

  specialities(): Observable<Specialities[]>{
    return this.http.get<Specialities[]>(this.SPECIALITIES_API_SERVER);
  }
}
