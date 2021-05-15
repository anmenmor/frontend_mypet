import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { Subscription } from "rxjs";
import { Clients } from "src/app/models/clients";
import { Pet } from "src/app/models/pet";
import { ClientsListService } from "src/app/services/clients-list.service";
import { PetService } from "src/app/services/pet.service";
import { DateService } from "src/app/services/date.service";
import { Dates } from "src/app/models/dates.model";
import { AuthEmployeeService } from "src/app/shared/auth-employee.service";
import { Employee } from "src/app/models/Employee";

@Component({
  selector: "app-create-date",
  templateUrl: "./create-date.component.html",
  styleUrls: ["./create-date.component.css"],
})
export class CreateDateComponent implements OnInit {
  private routeSub: Subscription = Subscription.EMPTY;
  pet_id!: number;
  valid: boolean = false;
  addDate: any;
  clients: Clients[] = [];
  employees: Employee[] = [];
  employee_id!: number;
  client_id!: number;
  dates: Dates[] = [];
  pets: Pet[] = [];
  loggedUser: any;
  htmlMsg!: String;

  constructor(
    private route: ActivatedRoute,
    private _location: Location,
    private router: Router,
    private formBuilder: FormBuilder,
    private dateService: DateService,
    private clientsListService: ClientsListService,
    private petService: PetService,
    private employeeService: AuthEmployeeService
  ) {
    this.addDate = this.formBuilder.group({
      date_time: "",
      pet_id: "",
      employee_id: "",
    });
  }

  ngOnInit(): void {
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
          this.addDate.controls["pet_id"].setValue(this.pet_id);
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
    //Get dates
    this.dateService.listAllDates().subscribe((data) => {
      this.dates = Object.values(data);
    });
    //Get employees
    this.employeeService.listAllEmployees().subscribe((data) => {
      this.employees = Object.values(data).map(
        (employeeDB) => new Employee(employeeDB)
      );
    });
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
        this.htmlMsg =
          "El cliente seleccionado no dispone de mascotas dadas de alta ";
        this.valid = false;
      }
    });
  }

  onSubmit(formData: Dates) {
    this.dateService.addDate(formData).subscribe(
      (data) => (this.htmlMsg = "Cita añadida correctamente"),
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
