import { Component } from "@angular/core";
import { Vaccination } from "src/app/models/vaccination.model";
import { VaccinationsService } from "src/app/services/vaccinations.service";

@Component({
  selector: "app-vaccination-update",
  templateUrl: "./vaccination-update.component.html",
  styleUrls: ["./vaccination-update.component.css"],
})
export class VaccinationUpdateComponent {
  constructor(private vaccinationService: VaccinationsService) {}

  id!: number;
  done!: boolean;
  htmlMsg!: String;

  changeVaccinationStatus(done: boolean) {
    console.log(done);
    this.vaccinationService
      .updateVaccinationStatus(this.id, done)
      .subscribe(
        (data) => (this.htmlMsg = "Estado de la vacunación modificado correctamente"),
        (exception) => (this.htmlMsg = exception.error.message)
      );
  }
}
