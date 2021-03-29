import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Employee } from 'src/app/models/Employee';
import { Specialities } from 'src/app/models/Specialities';
import { SpecialitiesService } from 'src/app/services/specialities.service';
import { AuthEmployeeService } from '../../../shared/auth-employee.service';


@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  employees: Employee[] | any;
  employeeSelectedInList: Employee | any;
  submitted = false;
  specialities: Specialities[] | any;
  @Output() employeeSelectedEvent = new EventEmitter<Employee>();

  constructor(private employeeService: AuthEmployeeService, private specialitiesService: SpecialitiesService) { }

  ngOnInit(): void {
    this.employees = [];
    this.listAllEmployees;
    this.getSpecility();
  }
  listAllEmployees(): void {
    this.submitted = true;
    this.employeeService.listAllEmployees().subscribe(data=>
      {
        this.employees = Object.values(data)
        .map(employeeDB => new Employee(employeeDB));
      });
  }

  sendSelected(employee: Employee): void{
    console.log(employee);
  
    this.employeeSelectedInList =  employee;
    this.employeeSelectedEvent.emit(employee);

  }

  getSpecility(): void {
      this.specialitiesService.specialities().subscribe(
        data=>{
          console.log(data);
          this.specialities = Object.values(data)
          .map(specialitiesDB => new Specialities(specialitiesDB));
          console.log(this.specialities);
        });
    }   

    //this.specialities tiene cargado el listado de especialidades al llamarse en el OnInit
    getSpecialitybyId(id: string): any{
      return this.specialities.filter( (specialty: Specialities) => specialty.id == id)[0].name;    
    } 

}
