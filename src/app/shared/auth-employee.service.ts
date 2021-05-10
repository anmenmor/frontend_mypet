import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Employee } from '../models/Employee';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { stringify } from '@angular/compiler/src/util';


@Injectable({
  providedIn: 'root'
})

export class AuthEmployeeService {

  private REGISTER_EMPLOYEE_API_SERVER = "http://127.0.0.1:8000/api/registerEmployee";
  private LIST_EMPLOYEE_API_SERVER = "http://localhost:8000/api/employees";
  private LOGIN_EMPLOYEE_API_SERVER = "http://127.0.0.1:8000/api/loginEmployee";
  private UPDATE_EMPLOYEE_API_SERVER = "http://127.0.0.1:8000/api/employees/"
  private DELETE_EMPLOYEE_API_SERVER = "http://127.0.0.1:8000/api/employees/"
  public currentEmployee: BehaviorSubject<Employee | null> = new BehaviorSubject<Employee | null>(null);

  constructor(private http: HttpClient) { }

  getCurrentEmployeeValue(): Observable<Employee | null> {
    return this.currentEmployee.asObservable();
  }
  setCurrentEmployeeValue(newValue: Employee | null): void {
    this.currentEmployee.next(newValue);
  }

  // Employee registration
  register(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.REGISTER_EMPLOYEE_API_SERVER, employee);
  }

  // Login
  signin(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.LOGIN_EMPLOYEE_API_SERVER, employee)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status == 0) {
            return throwError(error);
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
  listAllEmployeesPagination(numPage: number = 1): Observable<any> {
    return this.http.get<any>(this.LIST_EMPLOYEE_API_SERVER, { params: { page: numPage.toString() } });
  }

  //list Employees
  listAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.LIST_EMPLOYEE_API_SERVER);
  }


  //Update employee
  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.UPDATE_EMPLOYEE_API_SERVER + employee.id, employee)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      )

  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete<Employee>(this.DELETE_EMPLOYEE_API_SERVER + id)
      .pipe(
        catchError((error: HttpErrorResponse) => { return throwError(error); }
        )
      )
  }

}