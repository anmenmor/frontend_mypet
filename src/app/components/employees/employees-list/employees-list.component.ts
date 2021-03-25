import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Employee } from 'src/app/models/Employee';
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
  @Output() employeeSelectedEvent = new EventEmitter<Employee>();

  constructor(private employeeService: AuthEmployeeService) { }

  ngOnInit(): void {
    this.employees = [];
    this.listAllEmployees;
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
 

}
