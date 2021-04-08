import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Pet } from "src/app/models/pet";
import { PetService } from "src/app/services/pet.service";
import { Vaccination } from "src/app/models/vaccination.model";
import { Vaccine } from "src/app/models/vaccine";
import { VaccinesService } from "src/app/services/vaccines.service";
import { VaccinationsService } from "src/app/services/vaccinations.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthClientsService } from "src/app/shared/auth-clients.service";
import { Subscription } from "rxjs";
import { AuthEmployeeService } from "src/app/shared/auth-employee.service";
import { Employee } from "src/app/models/Employee";

@Component({
  selector: "app-vaccinations",
  templateUrl: "./vaccinations.component.html",
  styleUrls: ["./vaccinations.component.css"],
})
export class VaccinationsComponent implements OnInit {
  private routeSub: Subscription = Subscription.EMPTY;
  vaccinations: Array<Vaccination> = [];
  currentEmployee: Employee | null = null;
  petId = 0;
  clientId = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vaccinationService: VaccinationsService,
    private authEmployeeService: AuthEmployeeService
  ) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.petId = params["petId"];
      this.clientId = params["clientId"];
      this.getVaccinationsByPetId(this.petId);
    });
    this.authEmployeeService
      .getCurrentEmployeeValue()
      .subscribe((employee: Employee | null) => {
        this.currentEmployee = employee;
      });
  }

  getVaccinationsByPetId(petId: number) {
    this.vaccinationService.listVaccinationByPetId(petId).subscribe((data) => {
      this.vaccinations = data;
    });
  }

  addVaccination() {
    if (this.petId > 0){
      this.router.navigate(['vaccinations/addVaccination/pets/', this.petId]);
    } else if (this.clientId > 0){
      this.router.navigate(['vaccinations/addVaccination/clients/', this.clientId]);
  }
  }
}
