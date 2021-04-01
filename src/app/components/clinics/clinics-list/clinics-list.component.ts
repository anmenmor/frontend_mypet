import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Clinic } from "src/app/models/clinic.model";
import { LogHelper } from "src/app/services/log-helper.service";
import { ClinicsDataService } from "../../../services/clinics-data.service";

@Component({
  selector: "app-clinics-list",
  templateUrl: "./clinics-list.component.html",
  styleUrls: ["./clinics-list.component.css"],
})
export class ClinicsListComponent implements OnInit {
  clinics: Array<Clinic> = [];
  clinic = new Clinic();
  clinicId = 0;
  validSession: boolean = false;
  loggedUser: any;

  constructor(
    private logHelper: LogHelper,
    private router: Router,
    private clinicsDataService: ClinicsDataService
  ) {}

  ngOnInit() {
    //Get logged user
    this.loggedUser = this.logHelper.getLoggedUser();
    if (this.loggedUser) {
      this.validSession = true;
    } else {
      alert("Por favor, registrate o inicia sesión");
      this.router.navigate(["/"]);
    }
    this.clearPreviousValues();
    this.clinicsDataService.listAllClinics().subscribe((data) => {
      for (const d of data as any) {
        this.clinics.push({
          id: d.id,
          name: d.name,
          city: d.city,
          address: d.address,
          phone: d.phone,
          email: d.email,
        });
      }
    });
  }

  listSingleClinic(clinicId: number) {
    this.clearPreviousValues();
    this.clinicsDataService.listSingleClinic(clinicId).subscribe(
      (data) =>
        (this.clinic = {
          id: (data as any).id,
          name: (data as any).name,
          city: (data as any).city,
          address: (data as any).address,
          phone: (data as any).phone,
          email: (data as any).email,
        })
    );
  }

  clearPreviousValues() {
    this.clinic = new Clinic();
    this.clinics = [];
  }
}
