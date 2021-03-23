import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthClientsService } from '../../../shared/auth-clients.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { of } from 'rxjs';

@Component({
  selector: 'app-clients-register',
  templateUrl: './clients-register.component.html',
  styleUrls: ['./clients-register.component.css']
})

export class ClientsRegisterComponent implements OnInit {
  registerForm: FormGroup;
  errors: string [] = [];
  submitted = false;

  constructor(
    
    public router: Router,
    public fb: FormBuilder,
    public authClientsService: AuthClientsService
  ) {
   
  }
  



ngOnInit(): void {
      this.registerForm = this.fb.group({
        name: ['', [Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z]+')])]],
        surname: ['', [Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z ]+')])]],
        email: ['',  [Validators.compose([
          Validators.required,
          Validators.email])]],
        password: ['', [Validators.compose([
          Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,10}$')])]],
        phone: ['', [Validators.compose([
            Validators.required,
            Validators.pattern('[0-9]+')])]]
       
      });
     }
  
     onSubmit(): void {
      this.submitted = true;
      this.authClientsService.register(this.registerForm.value).subscribe(
        result => {
          alert('El cliente ha sido registrado correctamente!')
        },
        error => {
          if(error.status == 409){
              this.errors.push('El email introducido ya existe.');
          }else{
            console.log(error);
            this.errors.push(error.error.message[0]);
          }
        },
        () => {
          this.registerForm.reset();
          this.router.navigate(['loginClients']);
        }
      )
    }

    onReset(){
      this.submitted =false;
      this.registerForm.reset();
    }
    // handleError(error){
    //   this.error = error.error.errors;
    // }
  
  }
