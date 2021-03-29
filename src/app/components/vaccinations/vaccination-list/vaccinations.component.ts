import { Component, OnInit } from "@angular/core";
import { Pet } from "src/app/models/pet";
import { PetService } from "src/app/services/pet.service";
import { Vaccination } from "src/app/models/vaccination.model";
import { Vaccine } from "src/app/models/vaccine";
import { VaccinesService } from "src/app/services/vaccines.service";
import { VaccinationsService } from "src/app/services/vaccinations.service";

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

  constructor(
    private vaccinationService: VaccinationsService,
    private petService: PetService,
    private vaccinesService: VaccinesService
  ) {}

  ngOnInit() {
    //Get pets
    this.petService.getCompletePetList().subscribe((data: Pet) => {
      this.pets = Object.values(data);
    });
    //Get vaccines
    this.vaccinesService
      .listAllVaccines()
      .subscribe((data: Vaccine[]) => (this.vaccines = data));
    //Get vaccinations
    this.vaccinationService.listAllVaccinations().subscribe((data) => {
      for (const d of data as any) {
        this.vaccinations.push({
          id: d.id,
          date: d.date,
          done: !!d.done,
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
