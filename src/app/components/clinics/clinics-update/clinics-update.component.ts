import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Subscription } from "rxjs";
import { Clinic } from "src/app/models/clinic.model";
import { ClinicsDataService } from "../../../services/clinics-data.service";
import { FormBuilder, FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-clinics-update",
  templateUrl: "./clinics-update.component.html",
  styleUrls: ["./clinics-update.component.css"],
})
export class ClinicsUpdateComponent implements OnInit {
  private routeSub: Subscription = Subscription.EMPTY;
  postBody = new Clinic();
  clinicUpdate;
  clinics:any;
  clinic: any;
  clinicId = 0;
  htmlMsg!: String;

  constructor(
    private route: ActivatedRoute,
    private _location: Location,
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
    this.routeSub = this.route.params.subscribe((params) => {
      this.clinicId = params["id"];
    });
    if (this.clinicId) {
      this.clinicsDataService
        .listSingleClinic(this.clinicId)
        .subscribe((data) => (this.clinic, this.clinics = data));
    } else {
      this.clinicsDataService
        .listAllClinics()
        .subscribe((data) => (this.clinics = data));
    }
  }

  onChange(e: number) {
    this.clinicId = e;    
    this.clinicsDataService
    .listSingleClinic(e)
    .subscribe((data) => (this.clinic = data));
  }

  onSubmit(data: Clinic) {
    this.postBody = data;
    this.clinicsDataService
      .updateClinic(this.clinicId, this.postBody)
      .subscribe(
        (data) => (this.htmlMsg = "Datos de clinica modificados correctamente"),
        (exception) => (this.htmlMsg = exception.error.message)
      );
  }
  return() {
    this._location.back();
  }
}
