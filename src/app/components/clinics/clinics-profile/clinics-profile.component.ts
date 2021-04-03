import { Component, OnInit } from "@angular/core";
import { Clinic } from "src/app/models/clinic.model";
import { ClinicsDataService } from "src/app/services/clinics-data.service";

@Component({
  selector: "app-clinics-profile",
  templateUrl: "./clinics-profile.component.html",
  styleUrls: ["./clinics-profile.component.css"],
})
export class ClinicsProfileComponent implements OnInit {
  clinic = new Clinic();

  constructor(private clinicsDataService: ClinicsDataService) {}

  ngOnInit(): void {
    //Get Clinic
    this.clinicsDataService.listAllClinics().subscribe((data: any) => {
      this.clinic.id = data[0].id;
      this.clinic.name = data[0].name;
      this.clinic.address = data[0].address;
      this.clinic.city = data[0].city;
      this.clinic.phone = data[0].phone;
      this.clinic.email = data[0].email;
      console.log(this.clinic);
    });
  }
}
