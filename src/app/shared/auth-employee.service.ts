import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../models/Employee';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';


@Injectable({
  providedIn: 'root'
})

export class AuthEmployeeService {

  private REGISTER_EMPLOYEE_API_SERVER="http://127.0.0.1:8000/api/registerEmployee";
  constructor(private http: HttpClient) { }

  // User registration
  register(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.REGISTER_EMPLOYEE_API_SERVER, employee)
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
  signin(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>('http://127.0.0.1:8000/api/loginEmployee', employee)
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

  // Access user profile
  profileEmployee(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/employee');
  }

}