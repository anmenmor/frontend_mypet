import { Component, Input, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/Employee';

@Component({
  selector: 'app-employees-update',
  templateUrl: './employees-update.component.html',
  styleUrls: ['./employees-update.component.css']
})
export class EmployeesUpdateComponent implements OnInit {
  employeeDetails: Employee | any;
  edit: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  //Recibe un empleado de employees-list
  @Input()
  set employeeSelected(employeeSelected: Employee){
    this.edit = true;
    console.log("update component");
    console.log(employeeSelected);
    try {
      this.employeeDetails = employeeSelected;
    } catch (e){
      console.log(e.status, e.message);
    }
  }

}
