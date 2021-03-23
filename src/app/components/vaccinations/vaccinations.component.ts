import { Component } from "@angular/core";
import { Vaccination } from "src/app/models/vaccination.model";
import { VaccinationsService } from "src/app/services/vaccinations.service";

@Component({
  selector: "app-vaccinations",
  templateUrl: "./vaccinations.component.html",
  styleUrls: ["./vaccinations.component.css"],
})
export class VaccinationsComponent {
  vaccinations: Array<Vaccination> = [];
  vaccination = new Vaccination;
  petId = 0;

  constructor(private vaccinationService: VaccinationsService) {}

  listAllVaccinations() {
    this.clearPreviousValues();
    this.vaccinationService.listAllVaccinations().subscribe((data) => {
      for (const d of data as any) {
        this.vaccinations.push({
          date: d.date,
          done: d.done,
          pet_id: d.pet_id,
          vaccine_id: d.vaccine_id
        });
      }
    });
  }

  listVaccinationByPetId(petId: number) {
    this.clearPreviousValues();
    this.vaccinationService.listVaccinationByPetId(petId).subscribe(
      (data) => {
        for (const d of data as any) {
          this.vaccinations.push({
            date: d.date,
            done: d.done,
            pet_id: d.pet_id,
            vaccine_id: d.vaccine_id
          });
        }
      });
  }

  clearPreviousValues(){
    this.vaccination = new Vaccination;
    this.vaccinations = [];
  }
}
