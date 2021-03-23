import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Clients } from '../models/clients';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
    providedIn: 'root'
  })
  
  export class AuthClientsService {
  
    private REGISTER_CLIENTS_API_SERVER="http://127.0.0.1:8000/api/registerClients";
    constructor(private http: HttpClient) { }
  
    // Registro
    register(clients: Clients): Observable<Clients> {
      return this.http.post<Clients>(this.REGISTER_CLIENTS_API_SERVER, clients)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status == 409) {
            // console.error(
            //   `Backend returned code ${error.status}, ` +
            //   `body was: ${error}`);
            
          } else {
            alert("Algo ha ido mal, intentelo de nuevo mas tarde");
          //   console.error(
          //     `Backend returned code ${error.status}, ` +
          //     `body was: ${error.error}`);
          }
          return throwError(error);
        })
      );  
    }
  
    // Login
    signin(clients: Clients): Observable<Clients> {
      return this.http.post<Clients>('http://127.0.0.1:8000/api/loginClients', clients)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status == 400) {
            console.log(error);
            console.error(
              `Backend returned code ${error.status}, ` +
              `body was: ${error}`);
            }else if(error.status == 500){
              console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error}`);
          } else {
            alert("Algo ha ido mal, intentelo de nuevo mas tarde");
            console.error(
              `Backend returned code ${error.status}, ` +
              `body was: ${error.error}`);
          }
          return throwError(error.error);
        })
      );  
    }
  
    // Cliente usuario
    profileClients(): Observable<any> {
      return this.http.get('http://127.0.0.1:8000/api/userClients');
    }
  
  }

export class AuthClientsService {
    
}

