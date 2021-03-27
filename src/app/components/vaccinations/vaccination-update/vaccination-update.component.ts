import { Component, OnInit } from "@angular/core";
import { Location } from '@angular/common';
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Vaccination } from "src/app/models/vaccination.model";
import { VaccinationsService } from "src/app/services/vaccinations.service";

@Component({
  selector: "app-vaccination-update",
  templateUrl: "./vaccination-update.component.html",
  styleUrls: ["./vaccination-update.component.css"],
})
export class VaccinationUpdateComponent implements OnInit {
  private routeSub: Subscription = Subscription.EMPTY;
  petId!: number;
  id!: number;
  updateVaccination: any;
  vaccinations: any;
  htmlMsg!: String;

  constructor(
    private route: ActivatedRoute,
    private _location: Location,
    private formBuilder: FormBuilder,
    private vaccinationService: VaccinationsService
  ) {
    this.updateVaccination = this.formBuilder.group({
      done: false,
    });
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.id = params["id"];
      this.petId = params["petId"];
    });
    if (this.petId) {
      this.vaccinationService
        .listVaccinationByPetId(this.petId)
        .subscribe((data) => (this.vaccinations = data));
    }
    if (this.id) {
      this.vaccinationService
        .listVaccinationById(this.id)
        .subscribe((data) => (this.vaccinations = data));
    }
  }

  onChange(id: number) {
    this.id = id;
  }

  onSubmit(done: boolean) {
    this.vaccinationService.updateVaccinationStatus(this.id, done).subscribe(
      (data) =>
        (this.htmlMsg = "Estado de la vacunación modificado correctamente"),
      (exception) => (this.htmlMsg = exception.error.message)
    );
  }

  return(){
    this._location.back();
  }
}
