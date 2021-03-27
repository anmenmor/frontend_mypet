import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';


@Component({
  selector: 'app-side-navbar-clinics',
  templateUrl: './side-navbar-clinics.component.html',
  styleUrls: ['./side-navbar-clinics.component.css']
})
export class SideNavbarClinicsComponent implements OnInit {
  employees: any = false;
  constructor() { }

 
  ngOnInit() {}

  employeesShow(){
    this.employees = true;
  }
}
