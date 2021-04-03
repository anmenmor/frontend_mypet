import { Router} from '@angular/router';
import { Component, EventEmitter,Input, OnInit, Output } from '@angular/core';



@Component({
  selector: 'app-side-navbar-clients',
  templateUrl: './side-navbar-clients.component.html',
  styleUrls: ['./side-navbar-clients.component.css']
})
export class SideNavbarClientsComponent implements OnInit {
  clients: any = false;
  pets: any = false;
  dates: any = false;
  
  constructor() { }

 
  ngOnInit() {}
  clientsUserShow(){
    this.clients = true;
    this.pets = false;
    this.dates = false;
    
  }

  clientsPetShow(){
   
    this.pets = true;
    this.clients = false;
    this.dates = false;
  }

  clientsDatesShow(){
    this.dates = true;
    this.clients = false;
    this.pets = false;
  }
}
