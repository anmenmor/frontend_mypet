import { Component, OnInit } from "@angular/core";
import { Clinic } from "src/app/models/clinic.model";
import { ClinicsDataService } from "../../../services/clinics-data.service";
import { FormBuilder, FormControl } from "@angular/forms";

@Component({
  selector: "app-clinics-update",
  templateUrl: "./clinics-update.component.html",
  styleUrls: ["./clinics-update.component.css"],
})
export class ClinicsUpdateComponent implements OnInit {
  postBody = new Clinic();
  clinicUpdate;
  clinics: any;
  clinic: any;
  clinicId = 0;
  htmlMsg!: String;

  constructor(
    private formBuilder: FormBuilder,
    private clinicsDataService: ClinicsDataService
  ) {
    this.clinicUpdate = this.formBuilder.group({
      id: -1,
      name: "",
      city: "",
      address: "",
      phone: "",
      email: "",
    });
  }

  ngOnInit() {
    this.clinicsDataService
      .listAllClinics()
      .subscribe((data) => (this.clinics = data));
  }

  onChange(e: number) {
    this.clinicId = e;
    this.clinicsDataService.listSingleClinic(e).subscribe(
      (data) =>
        (this.clinic = {
          name: (data as any).name,
          city: (data as any).city,
          address: (data as any).address,
          phone: (data as any).phone,
          email: (data as any).email,
        })
    );
  }

  onSubmit(data: Clinic) {
    console.log(data);
      this.postBody = data;
      this.clinicsDataService
        .updateClinic(this.clinicId, this.postBody)
        .subscribe(
          (data) =>
            (this.htmlMsg = "Datos de clinica modificados correctamente"),
          (exception) => (this.htmlMsg = exception.error.message)
        );
  }
}
