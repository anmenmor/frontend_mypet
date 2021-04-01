import { Component, EventEmitter,Input, OnInit, Output } from '@angular/core';
import {Clients } from 'src/app/models/clients';
import { AuthClientsService } from 'src/app/shared/auth-clients.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs';

// Añadido import de Input

@Component({
  selector: 'app-clients-edit',
  templateUrl: './clients-edit.component.html',
  styleUrls: ['./clients-edit.component.css']
})
export class ClientsEditComponent implements OnInit {

    //Añadido ! a variables no inicializadas para que no salte error
    
    updateForm: FormGroup;
    clientsDetails: Clients | any;
    edit: boolean;
    htmlMsg: String;

    @Output() buttonUpdateClick = new EventEmitter<void>();
  
    constructor(
      public router: Router,
      public fb: FormBuilder,
      private _location: Location,
      private clientsService: AuthClientsService) 
      {
       
       }
       
    ngOnInit(): void {
      this.edit = false;
      }
    //Recibe uncliente de la lista

    
    
    @Input()
    set clientsSelected(clientsSelected: Clients){
      if(this.clientsSelected){
        this.edit = true;
        this.clientsDetails = clientsSelected;
       
        try {
          this.clientsDetails = clientsSelected;
        } catch (e){
          console.log(e.status, e.message);
        }
        this.updateForm = this.fb.group({
          name: [this.clientsDetails.name, [Validators.compose([
            Validators.required,
            Validators.pattern('[a-zA-Z]+')])]],
          surname: [this.clientsDetails.surname, [Validators.compose([
            Validators.required,
            Validators.pattern('[a-zA-Z ]+')])]],
          email: [this.clientsDetails.email,  [Validators.compose([
            Validators.required,
            Validators.email])]],
          phone: [this.clientsDetails.phone, [Validators.compose([
              Validators.required,
              Validators.pattern('[0-9 ]+')])]],
         
        });
  
      
      }
      
    }
   
  
    update(): void{
      this.edit=true;
      this.clientsDetails.name = this.updateForm.value.name;
      this.clientsDetails.surname = this.updateForm.value.surname;
      this.clientsDetails.email = this.updateForm.value.email;
      this.clientsDetails.phone  = this.updateForm.value.phone;
   
      if(!this.updateForm.invalid){
        this.clientsService.updateClients(this.clientsDetails).subscribe(
          data => {this.clientsDetails = new Clients(data); }  
           );
    
      }
      
    }

    return(){
      this._location.back();
    }
  
    
  
  }
  