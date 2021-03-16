import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ClinicsDataService {
  private CLINIC_API_SERVER = "http://localhost:8000/api/clinics/";

  constructor(private http: HttpClient) {}

  listAllClinics() {
    return this.http.get(this.CLINIC_API_SERVER);
  }

  listSingleClinic(id: number) {
    return this.http.get(this.CLINIC_API_SERVER + id);
  }
}
