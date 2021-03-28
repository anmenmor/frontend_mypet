import { Component, OnInit } from '@angular/core';
import {Clients } from 'src/app/models/clients';
import { AuthClientsService } from 'src/app/shared/auth-clients.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { of } from 'rxjs';


@Component({
  selector: 'app-clients-edit',
  templateUrl: './clients-edit.component.html',
  styleUrls: ['./clients-edit.component.css']
})
export class ClientsEditComponent implements OnInit {

 
    updateForm: FormGroup;
    clientsDetails: Clients | any;
    edit: boolean;
    
  
    constructor(
      public router: Router,
      public fb: FormBuilder,
      private clientsService: AuthClientsService) 
      {
       
       }
       
    ngOnInit(): void {
      this.edit = false;
      console.log("Invoco ON init");
      
    }
    //Recibe uncliente de la lista
    @Input()
    set clientsSelected(employeeSelected: Clients){
      if(clientsSelected){
        this.edit = true;
        this.clientsDetails = clientsSelected;
        console.log("update component");
        console.log(clientsSelected);
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
      console.log(this.updateForm.value);
      this.clientsDetails.name = this.updateForm.value.name;
      this.clientsDetails.surname = this.updateForm.value.surname;
      this.clientsDetails.email = this.updateForm.value.email;
      this.clientsDetails.phone  = this.updateForm.value.phone;
      console.log(this.clientsDetails);
      this.clientsService.updateClients(this.clientsDetails).subscribe(
        data => {this.clientsDetails = new Clients(data);
          alert('Cliente actualizado!'); }  );
  
    }
  
    
  
  }
  