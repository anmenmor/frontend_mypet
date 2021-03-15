import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employees-login',
  templateUrl: './employees-login.component.html',
  styleUrls: ['./employees-login.component.css']
})
export class EmployeesLoginComponent{
  email: string;
  password: string;

  constructor() {}

  login() {
    console.log(this.email);
    console.log(this.password);
  }
}