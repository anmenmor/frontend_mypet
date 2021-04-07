import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';


@Component({
  selector: 'app-side-navbar-clinics',
  templateUrl: './side-navbar-clinics.component.html',
  styleUrls: ['./side-navbar-clinics.component.css']
})
export class SideNavbarClinicsComponent implements OnInit {
  employees: any = false;
  clients: any = false;
  vaccination: any = false;
  dates: any = false;
  clinic: any = false;

  constructor() { }

 
  ngOnInit() {}

  employeesShow(){
    this.employees = true;
    this.clients = false;
    this.vaccination = false;
    this.dates = false;
    this.clinic = false;
  }

  clientsShow(){
    this.clients = true;
    this.vaccination = false;
    this.employees = false;
    this.dates = false;
    this.clinic = false;
  }

  vaccinationsShow(){
    this.vaccination = true;
    this.employees = false;
    this.clients = false;
    this.dates = false;
    this.clinic = false;
  }

  datesShow(){
    this.dates = true;
    this.employees = false;
    this.clients = false;
    this.vaccination = false;
    this.clinic = false;
  }

  clinicShow(){
    this.clinic = true;
    this.dates = false;
    this.employees = false;
    this.clients = false;
    this.vaccination = false;
  }
}
