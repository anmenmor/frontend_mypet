import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/Employee';
import { EmployeesListService } from 'src/app/services/employees-list.service';


@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  employees: Employee[] | any;

  constructor(private employeesListService: EmployeesListService) { }

  ngOnInit(): void {
    this.listAllEmployees;
  }
  listAllEmployees():void {
    this.employeesListService.listAllEmployees().subscribe(data=>
      this.employees = data);
  }
 

}
