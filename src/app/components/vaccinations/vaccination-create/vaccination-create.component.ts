import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { Subscription } from "rxjs";
import { Clients } from "src/app/models/clients";
import { Pet } from "src/app/models/pet";
import { Vaccination } from "src/app/models/vaccination.model";
import { Vaccine } from "src/app/models/vaccine";
import { ClientsListService } from "src/app/services/clients-list.service";
import { PetService } from "src/app/services/pet.service";
import { VaccinationsService } from "src/app/services/vaccinations.service";
import { VaccinesService } from "src/app/services/vaccines.service";
import { Employee } from "src/app/models/Employee";
import { LogHelper } from "src/app/services/log-helper.service";

@Component({
  selector: "app-vaccination-create",
  templateUrl: "./vaccination-create.component.html",
  styleUrls: ["./vaccination-create.component.css"],
})
export class VaccinationCreateComponent implements OnInit {
  // Valid: The form will show up if the component is called without any url params, but if it's called with a client ID, it'll only show if it's a valid id (has pets)

  private routeSub: Subscription = Subscription.EMPTY;
  client_id!: number;
  vaccine_id!: number;
  pet_id!: number;
  valid: boolean = false;
  addVaccination: any;
  clients: Clients[] = [];
  vaccines: Vaccine[] = [];
  pets: Pet[] = [];
  validSession: boolean = false;
  loggedUser: any;
  htmlMsg!: String;

  constructor(
    private route: ActivatedRoute,
    private _location: Location,
    private logHelper: LogHelper,
    private router: Router,
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
    //Get logged user
    this.loggedUser = this.logHelper.getLoggedUser();
    if (this.loggedUser) {
      this.validSession = true;
    } else {
      alert("Por favor, registrate o inicia sesión");
      this.router.navigate(["/"]);
    }
    //Get url params
    this.routeSub = this.route.params.subscribe((params) => {
      this.client_id = params["clientId"];
      this.pet_id = params["petId"];
    });
    //Pet ID sent already via button?
    if (this.pet_id != null) {
      this.petService.getPetDetail(this.pet_id).subscribe(
        (data) => {
          this.valid = true;
          this.addVaccination.controls["pet_id"].setValue(this.pet_id);
        },
        (exception) => {
          this.htmlMsg = "No existe ninguna mascota con el ID proporcionado";
          this.valid = false;
        }
      );
    }
    //Client ID sent already via button?
    if (this.client_id == null) {
      this.valid = true;
      this.clientsListService.listClients().subscribe((data: Clients[]) => {
        this.clients = Object.values(data);
      });
    } else {
      this.updateId(this.client_id);
    }
    //Get vaccines
    this.vaccinesService
      .listAllVaccines()
      .subscribe((data: Vaccine[]) => (this.vaccines = data));
  }

  updateId(client_id: number) {
    //Get pets
    this.client_id = client_id;
    this.petService.listAllPets(this.client_id).subscribe((data: Pet[]) => {
      this.pets = Object.values(data);
      if (this.pets.length > 0) {
        this.valid = true;
        this.htmlMsg = "";
      } else {
        this.valid = false;
        this.htmlMsg =
          "El cliente seleccionado no dispone de mascotas dadas de alta";
      }
    });
  }

  onSubmit(formData: Vaccination) {
    this.vaccinationService.addVaccination(formData).subscribe(
      (data) => (this.htmlMsg = "Vacunación añadida correctamente"),
      (exception) =>
        (this.htmlMsg =
          "Se ha producido el siguiente error: <br><br>" +
          exception.error.message)
    );
  }
  return() {
    this._location.back();
  }
}
