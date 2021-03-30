import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Date } from "../models/date.model";

@Injectable({
  providedIn: 'root'
})
export class DateService {

  private DATE_API_SERVER = "http://localhost:8000/api/dates/";

  constructor(private http: HttpClient) {}

  listAllDates() {
    return this.http.get<Date>(this.DATE_API_SERVER);
  }

  listDateByPetId(petId: number) {
    return this.http.get<Date>(this.DATE_API_SERVER + "pets/" + petId);
  }

  listDateByEmployeeId(employeeId: number) {
    return this.http.get<Date>(this.DATE_API_SERVER + "employees/" + employeeId);
  }

  listDateById(id: number) {
    return this.http.get<Date>(this.DATE_API_SERVER + id);
  }

  addDate(formData: Date){
    return this.http.post<Date>(this.DATE_API_SERVER, formData);
  }

  deleteDate(id:number){
    return this.http.delete<Date>(this.DATE_API_SERVER + id);
  }

}
