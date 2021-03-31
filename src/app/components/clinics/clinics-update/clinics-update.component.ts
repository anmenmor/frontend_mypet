import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
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
  clinicUpdate;
  clinics: any;
  clinic: any;
  clinicId = 0;
  htmlMsg!: String;

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
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
        .subscribe((data: any) => {
          this.clinic = data;
          this.clinics = data;
          this.updateForm(data[0]);
        });
    } else {
      this.clinicsDataService.listAllClinics().subscribe((data: any) => {
        this.clinics = data;
        this.updateForm(data[0]);
      });
    }
  }

  onChange(e: number) {
    if (e > 0) {
      this.clinicsDataService.listSingleClinic(e).subscribe((data: any) => {
        this.clinic = data;
        this.cdr.detectChanges();
        this.updateForm(data[0]);
      });
    }
  }

  onSubmit(data: Clinic) {
    this.clinicsDataService.updateClinic(data.id, data).subscribe(
      (data) => (this.htmlMsg = "Datos de clinica modificados correctamente"),
      (exception) => (this.htmlMsg = exception.error.message)
    );
  }

  updateForm(data: Clinic) {
    this.clinicUpdate.patchValue({
      id: data.id,
      name: data.name,
      city: data.city,
      address: data.address,
      phone: data.phone,
      email: data.email,
    });
  }
  return() {
    this._location.back();
  }
}
