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
  dates: any = false;
  clinic: any = true;
  vaccines: any = false;

  constructor() { }

 
  ngOnInit() {}

  employeesShow(){
    this.employees = true;
    this.clients = false;
    this.dates = false;
    this.clinic = false;
    this.vaccines = false;
  }

  clientsShow(){
    this.clients = true;
    this.employees = false;
    this.dates = false;
    this.clinic = false;
    this.vaccines = false;
  }

  vaccinationsShow(){
    this.employees = false;
    this.clients = false;
    this.dates = false;
    this.clinic = false;
    this.vaccines = false;
  }

  vaccinesShow(){
    this.vaccines = true;
    this.employees = false;
    this.clients = false;
    this.dates = false;
    this.clinic = false;
  }

  datesShow(){
    this.dates = true;
    this.employees = false;
    this.clients = false;
    this.clinic = false;
    this.vaccines = false;
  }

  clinicShow(){
    this.clinic = true;
    this.dates = false;
    this.employees = false;
    this.clients = false;
    this.vaccines = false;
  }
}
