import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Vaccination } from "../models/vaccination.model";

@Injectable({
  providedIn: 'root'
})
export class VaccinationsService {

  private VACCINATION_API_SERVER = "http://localhost:8000/api/vaccinations/";

  constructor(private http: HttpClient) {}

  listAllVaccinations() {
    return this.http.get<Vaccination>(this.VACCINATION_API_SERVER);
  }

  listVaccinationByPetId(petId: number) {
    return this.http.get<Vaccination>(this.VACCINATION_API_SERVER + petId);
  }

}
