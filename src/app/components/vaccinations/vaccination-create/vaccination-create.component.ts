import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Pet } from "src/app/models/pet";
import { Vaccination } from "src/app/models/vaccination.model";
import { Vaccine } from "src/app/models/vaccine";
import { PetService } from "src/app/services/pet.service";
import { VaccinationsService } from "src/app/services/vaccinations.service";
import { VaccinesService } from "src/app/services/vaccines.service";

@Component({
  selector: "app-vaccination-create",
  templateUrl: "./vaccination-create.component.html",
  styleUrls: ["./vaccination-create.component.css"],
})
export class VaccinationCreateComponent implements OnInit {
  private routeSub: Subscription = Subscription.EMPTY;
  clientId: number = -1;
  addVaccination: any;
  vaccines: Vaccine[] = [];
  pets: Pet[] = [];
  htmlMsg!: String;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private vaccinationService: VaccinationsService,
    private vaccinesService: VaccinesService,
    private petService: PetService
  ) {
    this.addVaccination = this.formBuilder.group({
      date: "",
      done: false,
      pet_id: "",
      vaccine_id: "",
    });
  }

  ngOnInit() {
    //Get Client ID
    this.routeSub = this.route.params.subscribe((params) => {
      this.clientId = params["clientId"];
    });
    //Get vaccines
    this.vaccinesService
      .listAllVaccines()
      .subscribe((data: Vaccine[]) => (this.vaccines = data));
    //Get pets
    this.petService.listAllPets(this.clientId).subscribe((data: Pet[]) => {
      this.pets = Object.values(data);
    });
  }

  onSubmit(formData: Vaccination) {
    this.vaccinationService.addVaccination(formData).subscribe(
      (data) => (this.htmlMsg = "Vacunación añadida correctamente"),
      (exception) => (this.htmlMsg = exception.error.message)
    );
  }
}
