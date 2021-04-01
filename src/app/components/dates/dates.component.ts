import { Component, OnInit } from "@angular/core";
import { Date } from "src/app/models/date.model";
import { Pet } from "src/app/models/pet";
import { PetService } from "src/app/services/pet.service";
import { Employee } from "src/app/models/Employee";
import { DateService } from "src/app/services/date.service";
import { AuthEmployeeService } from "src/app/shared/auth-employee.service";
import { Router } from "@angular/router";
import { LogHelper } from "src/app/services/log-helper.service";

@Component({
  selector: "app-dates",
  templateUrl: "./dates.component.html",
  styleUrls: ["./dates.component.css"],
})
export class DatesComponent implements OnInit {
  dates: Array<Date> = [];
  date = new Date();
  pets: Pet[] = [];
  employees: Employee[] = [];
  employeeId = 0;
  petId = 0;
  validSession: boolean = false;
  loggedUser: any;
  htmlMsg!: String;

  constructor(
    private logHelper: LogHelper,
    private router: Router,
    private dateService: DateService,
    private petService: PetService,
    private employeeService: AuthEmployeeService
  ) {}

  ngOnInit(): void {
    //Get logged user
    this.loggedUser = this.logHelper.getLoggedUser();
    if (this.loggedUser){
      this.validSession = true;
    } else {
      alert("Por favor, registrate o inicia sesión");
      this.router.navigate(["/"]);
    }
    //Get pets
    this.petService.getCompletePetList().subscribe((data: Pet) => {
      this.pets = Object.values(data);
    });
    //Get employees
    this.employeeService.listAllEmployees().subscribe((data) => {
      this.employees = Object.values(data).map(
        (employeeDB) => new Employee(employeeDB)
      );
    });
    //Get dates
    this.dateService.listAllDates().subscribe((data) => {
      for (const d of data as any) {
        this.dates.push({
          id: d.id,
          date_time: d.date_time,
          pet_id: d.pet_id,
          employee_id: d.employee_id,
        });
      }
    });
  }

  getPetById(id: number) {
    return this.pets.filter((pet: Pet) => pet.id == id)[0].name;
  }

  getEmployeeById(id: any) {
    let employeeFiltered = this.employees.filter((employee: Employee) => employee.id == id);
    if (employeeFiltered.length > 0){
      return employeeFiltered[0].name;
    }
    return 'No disponible';
  }

  deleteDate(dateId: number) {
    let index: number = this.dates.findIndex(({ id }) => id === dateId);
    if (index !== -1) {
      console.log(this.dates);
      this.dates.splice(index, 1);
      console.log(this.dates);
    }

    this.dateService.deleteDate(dateId).subscribe(
      (data) => (this.htmlMsg = "Cita eliminada correctamente"),
      (exception) => (this.htmlMsg = exception.error.message)
    );
  }

  tracker(item: any, index: any) {
    return `${item.id}-${index}`;
  }
}
