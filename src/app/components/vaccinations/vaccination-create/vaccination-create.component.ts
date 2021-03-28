import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Clients } from "src/app/models/clients";
import { Pet } from "src/app/models/pet";
import { Vaccination } from "src/app/models/vaccination.model";
import { Vaccine } from "src/app/models/vaccine";
import { ClientsListService } from "src/app/services/clients-list.service";
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
  client_id: number = -1;
  vaccine_id: number = -1;
  pet_id: number = -1;
  addVaccination: any;
  clients: Clients[] = [];
  vaccines: Vaccine[] = [];
  pets: Pet[] = [];
  htmlMsg!: String;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private vaccinationService: VaccinationsService,
    private clientsListService: ClientsListService,
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
    //Get clients
    this.clientsListService.listClients().subscribe((data: Clients[]) => {
      this.clients = Object.values(data);
    });
    //Get vaccines
    this.vaccinesService
      .listAllVaccines()
      .subscribe((data: Vaccine[]) => (this.vaccines = data));
  }

  onChange(client_id: number) {
    this.client_id = client_id;
    //Get pets
    this.petService.listAllPets(this.client_id).subscribe((data: Pet[]) => {
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
