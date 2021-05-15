import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import * as $ from 'jquery';


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

  constructor(private route: ActivatedRoute,) { }
 
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const view = params['view'];
      switch(view) {
        case "employees": this.employeesShow();
          break;
        case "clients": this.clientsShow();
          break;
        case "vaccines": this.vaccinesShow();
          break;
        case "dates": this.datesShow();
          break;
        default: this.clinicShow();
          break;
      }
  });
  $("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });
  }

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
