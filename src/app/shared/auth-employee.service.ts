import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/Employee';


@Injectable({
  providedIn: 'root'
})

export class AuthEmployeeService {

  constructor(private http: HttpClient) { }

  // User registration
  register(employee: Employee): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/auth/registerEmployees', employee);
  }

  // Login
  signin(employee: Employee): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/auth/loginEmployees', employee);
  }

  // Access user profile
  profileEmployee(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/auth/employee-profile');
  }

}