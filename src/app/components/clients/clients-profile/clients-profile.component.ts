import { Component, EventEmitter,Input, OnInit, Output } from '@angular/core';
import {Clients } from 'src/app/models/clients';
import { AuthClientsService } from 'src/app/shared/auth-clients.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs';

@Component({
  selector: 'app-clients-profile',
  templateUrl: './clients-profile.component.html',
  styleUrls: ['./clients-profile.component.css']
})
export class ClientsProfileComponent implements OnInit {
  clients: any;
  updateForm!: FormGroup;
  clientUser: Clients | any;
  edit: boolean = false;
  htmlMsg!: String;

  @Output() buttonUpdateClick = new EventEmitter<void>();

  constructor( public router: Router,
    public fb: FormBuilder,
    private _location: Location,
    private clientsService: AuthClientsService)  { }

  ngOnInit(): void {
    this.getAuthenticateUser();
    this.edit = false;
  }

  getAuthenticateUser():void{
    
    this.clientsService. getAuthenticateUser().subscribe(data=>
     {   
      this.clientUser = Object.values(data).map(clientsDB => new Clients(clientsDB));
      this.clients =true;
      console.log(this.clientUser);
      
  });
     
  }


  @Input()
  set clientsSelected(clientsSelected: Clients){
    if(clientsSelected){
      this.edit = true;
      this.clientUser = clientsSelected;
     
      try {
        this.clientUser = clientsSelected;
      } catch (e){
        console.log(e.status, e.message);
      }
      this.updateForm = this.fb.group({
        name: [this.clientUser.name, [Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-ZÀ-ÿ \u00f1\u00d1]+')])]],
        surname: [this.clientUser.surname, [Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-ZÀ-ÿ \u00f1\u00d1]+')])]],
        email: [this.clientUser.email,  [Validators.compose([
          Validators.required,
          Validators.email])]],
        phone: [this.clientUser.phone, [Validators.compose([
            Validators.required,
            Validators.pattern('[0-9 ]+')])]],
       
      });

    
    }
    
  }
  update(){
    this.edit=true;
    this.clientUser.name = this.updateForm.value.name;
    this.clientUser.surname = this.updateForm.value.surname;
    this.clientUser.email = this.updateForm.value.email;
    this.clientUser.phone  = this.updateForm.value.phone;
 
    if(!this.updateForm.invalid){
      this.clientsService.updateClients(this.clientUser).subscribe(
        data => {this.clientUser = new Clients(data);
                 this.htmlMsg = "Datos de clinica modificados correctamente";
        }
                
         );
  
    }

    
  
    }
    
  

  return(){
    this._location.back();
  }
  

  

}
