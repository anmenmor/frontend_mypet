import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthClientsService } from '../../../shared/auth-clients.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TokenClientsService } from '../../../shared/token-clients.service';
import { AuthStateService } from '../../../shared/auth-state.service';

@Component({
  selector: 'app-clients-login',
  templateUrl: './clients-login.component.html',
  styleUrls: ['./clients-login.component.css']
})
export class ClientsLoginComponent implements OnInit {
  loginForm: FormGroup;
  errors = [];
  submitted = false;
  serverError = false;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authClientsService: AuthClientsService,
    private tokenClients: TokenClientsService,
    private authState: AuthStateService,
  ) {
    // this.loginForm = this.fb.group({
    //   email: [],
    //   password: []
    // })
  }

  ngOnInit():void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
   }

  onSubmit() {
    this.submitted = true;
    console.log(this.loginForm.value);
    if(this.loginForm.value.email.length > 0 && this.loginForm.value.password.length > 0 ){
       this.authClientsService.signin(this.loginForm.value).subscribe(
        result => {
          this.responseHandler(result);
          console.log(result);
        },
        error => {
          this.serverError = true;
          this.errors = error.error;   
        },() => {
          this.authState.setAuthState(true);
          this.loginForm.reset()
          this.router.navigate(['clients']);
        }
      );
    }
     
  }

  // Handle response
  responseHandler(data: any){
    this.tokenClients.handleData(data.token);
  }

}