import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employees-register',
  templateUrl: './employees-register.component.html',
  styleUrls: ['./employees-register.component.css']
})
export class EmployeesRegisterComponent {
  name: string;
  surname: string;
  email: string;
  password: string;
  work_shift: string;

  constructor() {}

  register() {
    console.log(this.name);
    console.log(this.surname);
    console.log(this.email);
    console.log(this.password);
    console.log(this.work_shift);
  }
}