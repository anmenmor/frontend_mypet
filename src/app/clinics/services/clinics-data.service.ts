import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Clinic } from "src/app/models/clinic.model";

@Injectable()
export class ClinicsDataService {
  private CLINIC_API_SERVER = "http://localhost:8000/api/clinics/";

  constructor(private http: HttpClient) {}

  listAllClinics() {
    return this.http.get<Clinic>(this.CLINIC_API_SERVER);
  }

  listSingleClinic(id: number) {
    return this.http.get<Clinic>(this.CLINIC_API_SERVER + id);
  }

  updateClinic(id: number, data: Clinic) {
    return this.http.put<Clinic>(this.CLINIC_API_SERVER + id, data);
  }
}
