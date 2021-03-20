import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Employee } from '../models/Employee';
import { Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class EmployeesListService {
  private EMPLOYEE_API_SERVER ="http://localhost:8000/api/employees";
  constructor(private http: HttpClient) {}

  listAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.EMPLOYEE_API_SERVER);
  }


}
