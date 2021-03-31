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
  private LIST_EMPLOYEE_API_SERVER ="http://localhost:8000/api/employees";
  private LOGIN_EMPLOYEE_API_SERVER = "http://127.0.0.1:8000/api/loginEmployee";
  private UPDATE_EMPLOYEE_API_SERVER = "http://127.0.0.1:8000/api/employees/"
  private DELETE_EMPLOYEE_API_SERVER = "http://127.0.0.1:8000/api/employees/"

  constructor(private http: HttpClient) { }

  // Employee registration
  register(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.REGISTER_EMPLOYEE_API_SERVER, employee)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 409) {
          console.log("Error del servicio");
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
    return this.http.post<Employee>(this.LOGIN_EMPLOYEE_API_SERVER, employee)
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

  // Get employee authenticated
  getAuthenticateUser(): Observable<Employee> {
    return this.http.get<Employee>('http://127.0.0.1:8000/api/employee');
  }

  //list Employees
  listAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.LIST_EMPLOYEE_API_SERVER);
  }

  //Update employee
  updateEmployee(employee: Employee): Observable<Employee> {
    console.log("Actualizando empleado:" + employee.id);
    console.log(employee);
    return this.http.put<Employee>(this.UPDATE_EMPLOYEE_API_SERVER+employee.id, employee)
    .pipe(
      catchError((error: HttpErrorResponse) => { 
        return throwError(error);
      })
    )
     
  }

  deleteEmployee(id: number): Observable<any>{
    console.log("Eliminando empleado "+ id);
    return this.http.delete<Employee>(this.DELETE_EMPLOYEE_API_SERVER+id)
    .pipe(
      catchError((error: HttpErrorResponse)=>
      {return throwError('Something bad happend, please try again later');}
      )
    )
  }

}