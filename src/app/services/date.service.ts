import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Dates } from "../models/dates.model";

@Injectable({
  providedIn: "root",
})
export class DateService {
  private DATE_API_SERVER = "http://localhost:8000/api/dates/";

  constructor(private http: HttpClient) {}

  listAllDatesPagination(numPage: number = 1) {
    return this.http.get<Dates>(this.DATE_API_SERVER, {params: {page:numPage.toString()}});
  }
  
  listAllDates() {
    return this.http.get<Dates>(this.DATE_API_SERVER);
  }

  listDatesByClientId(clientId: number) {
    return this.http.get<Dates>(this.DATE_API_SERVER + "clients/" + clientId);
  }

  listDateByPetId(petId: number) {
    return this.http.get<Dates>(this.DATE_API_SERVER + "pets/" + petId);
  }

  listDateByEmployeeId(employeeId: number) {
    return this.http.get<Dates>(
      this.DATE_API_SERVER + "employees/" + employeeId
    );
  }

  listDateByEmployeeIdPaginate(employeeId: number, numPage : number = 1) {
    return this.http.get<Dates>(this.DATE_API_SERVER + "employees/" + employeeId, {params: {page: numPage.toString()}});
  }

  listDateById(id: number) {
    return this.http.get<Dates>(this.DATE_API_SERVER + id);
  }

  addDate(formData: Dates) {
    return this.http.post<Dates>(this.DATE_API_SERVER, formData);
  }

  deleteDate(id: number) {
    return this.http.delete<Dates>(this.DATE_API_SERVER + id);
  }
}
