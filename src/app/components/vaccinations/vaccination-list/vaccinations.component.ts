import { Component, OnInit } from "@angular/core";
import { Pet } from "src/app/models/pet";
import { PetService } from "src/app/services/pet.service";
import { Vaccination } from "src/app/models/vaccination.model";
import { Vaccine } from "src/app/models/vaccine";
import { VaccinesService } from "src/app/services/vaccines.service";
import { VaccinationsService } from "src/app/services/vaccinations.service";
import { LogHelper } from "src/app/services/log-helper.service";
import { Router } from "@angular/router";
import { AuthClientsService } from "src/app/shared/auth-clients.service";

@Component({
  selector: "app-vaccinations",
  templateUrl: "./vaccinations.component.html",
  styleUrls: ["./vaccinations.component.css"],
})
export class VaccinationsComponent implements OnInit {
  vaccinations: Array<Vaccination> = [];
  vaccination = new Vaccination();
  pets: Pet[] = [];
  vaccines: Vaccine[] = [];
  vaccineId = 0;
  petId = 0;
  validSession: boolean = false;
  loggedUser: any;

  constructor(
    private logHelper: LogHelper,
    private router: Router,
    private vaccinationService: VaccinationsService,
    private petService: PetService,
    private vaccinesService: VaccinesService,
    private clientsService: AuthClientsService
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
    //If client, get his vaccinations. If employee, get everyone's
    this.clientsService.getAuthenticateUser().subscribe(
      (data: any) => {
        this.displayByPets(data.user.id);
      },
      (exception) => {
        this.vaccinationService.listAllVaccinations().subscribe((data: any) => {
          this.vaccinations = data;
        });
      }
    );
    //Get vaccines
    this.vaccinesService
      .listAllVaccines()
      .subscribe((data: Vaccine[]) => (this.vaccines = data));
    //Get pets
    this.petService.getCompletePetList().subscribe((data: Pet) => {
      this.pets = Object.values(data);
    });
  }

  displayByPets(id: number) {
    this.petService.listAllPets(id).subscribe((data: Pet[]) => {
      for (const d of Object.entries(data)) {
        for (const i of d as any) {
          if (i.id) {
            this.pets.push(i);
            console.log(i.id);
            this.getVaccinationsByPetId(i.id);
          }
        }
      }
    });
  }

  getVaccinationsByPetId(petId: number) {
    this.vaccinationService.listVaccinationByPetId(petId).subscribe((data) => {
      for (const d of data as any) {
        this.vaccinations.push({
          id: d.id,
          date: d.date,
          done: d.done,
          pet_id: d.pet_id,
          vaccine_id: d.vaccine_id,
        });
      }
    });
  }

  getPetById(id: number) {
    return this.pets.filter((pet: Pet) => pet.id == id)[0].name;
  }

  getVaccineById(id: number) {
    return this.vaccines.filter((vaccine: Vaccine) => vaccine.id == id)[0].name;
  }
}
