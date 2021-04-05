import { Component, EventEmitter,Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { Clients } from 'src/app/models/clients';
import { AuthClientsService } from '../../shared/auth-clients.service';
import { Location } from '@angular/common';
import { getMaxListeners } from 'node:process';
import { Pet } from '../../models/pet';
import { Consultation } from '../../models/consultation';
import { PetService } from 'src/app/services/pet.service';




@Component({
  selector: 'app-side-navbar-clients',
  templateUrl: './side-navbar-clients.component.html',
  styleUrls: ['./side-navbar-clients.component.css']
})
export class SideNavbarClientsComponent implements OnInit {
  clients: any = false ;
  pets: any = false;
  dates: any = false;
  clientUser : Clients | any;
  edit: boolean = false;
  updateForm!: FormGroup;
  htmlMsg!: String;
  

  @Output() clientsSelectedEvent = new EventEmitter<Clients>();

  constructor(public router: Router,
    public fb: FormBuilder,
    private _location: Location,
    private clientsService: AuthClientsService,
    private petService: PetService,) { }

 
  ngOnInit() {
   
    this.clients = false;
    
  }

  clientsUserShow(){
   
    this.getAuthenticateUser();
    this.edit = false;
    this.pets = false;
    this.dates = false;
    this.clients = true;
  }

  clientsPetShow(){
   this.listAllPets();
    this.pets = true;
    this.clients = false;
    this.dates = false;
  }

  clientsDatesShow(){
    this.dates = true;
    this.clients = false;
    this.pets = false;
  }

  

  getAuthenticateUser():void{
    
    this.clientsService. getAuthenticateUser().subscribe(data=>
     {   
      this.clientUser = Object.values(data).map(clientsDB => new Clients(clientsDB));
      this.clients =true;
      //this.clientUser = Object.values(data).map(clientsDB => new Clients(clientsDB));
      /*this.currentUser[0].name = this.clientUser[0].name;
      this.currentUser[0].surname = this.clientUser[0].surname;
      this.currentUser[0].email = this.clientUser[0].email;
      this.currentUser[0].phone = this.clientUser[0].phone;*/
     
    
       
      });
      
}

  
  

 

  


 update():void{
  
    this.clientUser[0].name = this.updateForm.value.name;
    this.clientUser[0].surname = this.updateForm.value.surname;
    this.clientUser[0].email = this.updateForm.value.email;
    this.clientUser[0].phone  = this.updateForm.value.phone;
 
    if(!this.updateForm.invalid){
      this.clientsService.updateClients(this.clientUser[0]).subscribe(
        data => {this.clientUser[0] = new Clients(data);
                 this.htmlMsg = "Datos de clinica modificados correctamente";
        }
                
         );
  
    }
    
  }

  return(){
    this._location.back();
  }
  

  listAllPets():void {
    this.petService.listAllPets(this.clientUser.id).subscribe((data: Pet[]) => {
      this.pets = Object.values(data);
    })
    
  }










}
