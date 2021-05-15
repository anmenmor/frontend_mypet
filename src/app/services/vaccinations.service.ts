import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Vaccination } from "../models/vaccination.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VaccinationsService {

  private VACCINATION_API_SERVER = "http://localhost:8000/api/vaccinations/";

  constructor(private http: HttpClient) {}

  listAllVaccinations() {
    return this.http.get<Vaccination>(this.VACCINATION_API_SERVER);
  }

  listVaccinationByPetId(petId: number): Observable<Vaccination[]> {
    return this.http.get<Vaccination[]>(this.VACCINATION_API_SERVER + "pet/" + petId);
  }

  listVaccinationByPetIdPaginate(petId: number, numPage: number = 1): Observable<Vaccination[]> {
    return this.http.get<Vaccination[]>(this.VACCINATION_API_SERVER + "pet/" + petId, {params: {page:numPage.toString()}});
  }

  listVaccinationById(id: number) {
    return this.http.get<Vaccination>(this.VACCINATION_API_SERVER + id);
  }

  updateVaccinationStatus(id: number, done: boolean) {
    return this.http.put<Vaccination>(this.VACCINATION_API_SERVER+id, done)
  }

  addVaccination(formData: Vaccination){
    return this.http.post<Vaccination>(this.VACCINATION_API_SERVER, formData);
  }

}
