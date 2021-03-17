import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployeesListService {
  private EMPLOYEE_API_SERVER ="http://localhost:8000/api/employees";
  constructor(private http: HttpClient) {}

  listAllEmployees() {
    return this.http.get(this.EMPLOYEE_API_SERVER);
  }


}
