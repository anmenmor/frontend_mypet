import { Component, OnInit } from "@angular/core";
import { Vaccination } from "src/app/models/vaccination.model";
import { VaccinationsService } from "src/app/services/vaccinations.service";

@Component({
  selector: "app-vaccinations",
  templateUrl: "./vaccinations.component.html",
  styleUrls: ["./vaccinations.component.css"],
})
export class VaccinationsComponent implements OnInit{
  vaccinations: Array<Vaccination> = [];
  vaccination = new Vaccination;
  vaccineId = 0;
  petId = 0;

  constructor(private vaccinationService: VaccinationsService) {}

  ngOnInit() {
    this.clearPreviousValues();
    this.vaccinationService.listAllVaccinations().subscribe((data) => {
      for (const d of data as any) {
        this.vaccinations.push({
          id: d.id,
          date: d.date,
          done: !!d.done,
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
            id: d.id,
            date: d.date,
            done: !!d.done,
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
