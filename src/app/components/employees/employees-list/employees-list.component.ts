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
  @Output() employeeSelectedEvent = new EventEmitter<Employee>();

  constructor(private employeeService: AuthEmployeeService) { }

  ngOnInit(): void {
    this.listAllEmployees;
  }
  listAllEmployees(): void {
    this.employeeService.listAllEmployees().subscribe(data=>
      this.employees = data);
  }

  sendSelected(employee: Employee): void{
    console.log(employee);
    this.employeeSelectedInList =  employee;
    this.employeeSelectedEvent.emit(employee);

  }
 

}
