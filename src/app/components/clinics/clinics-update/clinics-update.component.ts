import { Component } from "@angular/core";
import { Clinic } from "src/app/models/clinic.model";
import { ClinicsDataService } from "../../../services/clinics-data.service";

@Component({
  selector: "app-clinics-update",
  templateUrl: "./clinics-update.component.html",
  styleUrls: ["./clinics-update.component.css"],
})
export class ClinicsUpdateComponent {
  postBody = new Clinic();
  clinicId = 0;
  htmlMsg!: String;

  constructor(private clinicsDataService: ClinicsDataService) {}

  onSubmit(data: any) {
    if (this.clinicId > 0) {
      this.postBody = data;
      this.clinicsDataService
        .updateClinic(this.clinicId, this.postBody)
        .subscribe(
          (data) =>
            (this.htmlMsg = "Datos de clinica modificados correctamente"),
          (exception) => (this.htmlMsg = exception.error.message)
        );
    } else {
      this.htmlMsg = "Introduce un ID";
    }
  }
}
