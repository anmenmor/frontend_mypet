import { Component, OnInit } from "@angular/core";
import { Clinic } from "src/app/models/clinic.model";
import { AdminServiceService } from "src/app/services/admin-service.service";
import { ClinicsDataService } from "src/app/services/clinics-data.service";

@Component({
  selector: "app-clinics-profile",
  templateUrl: "./clinics-profile.component.html",
  styleUrls: ["./clinics-profile.component.css"],
})
export class ClinicsProfileComponent implements OnInit {
  clinic = new Clinic();
  isAdmin: boolean = false;

  constructor(
    private clinicsDataService: ClinicsDataService,
    private adminService: AdminServiceService
  ) {}

  ngOnInit(): void {
    //Get Clinic
    this.clinicsDataService.listAllClinics().subscribe((data: any) => {
      this.clinic.id = data[0].id;
      this.clinic.name = data[0].name;
      this.clinic.address = data[0].address;
      this.clinic.city = data[0].city;
      this.clinic.phone = data[0].phone;
      this.clinic.email = data[0].email;
      this.adminService.checkIsAdmin().then((isAdmin) => {
        this.isAdmin = isAdmin;
      });
    });
  }
}
