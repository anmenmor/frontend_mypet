import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthEmployeeService } from '../../../shared/auth-employee.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TokenEmployeeService } from '../../../shared/token-employee.service';
import { AuthStateService } from '../../../shared/auth-state.service';

@Component({
  selector: 'app-employees-login',
  templateUrl: './employees-login.component.html',
  styleUrls: ['./employees-login.component.css']
})
export class EmployeesLoginComponent implements OnInit {
  loginForm: FormGroup;
  errors = [];
  submitted = false;
  serverError = false;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authEmployeeService: AuthEmployeeService,
    private tokenEmployee: TokenEmployeeService,
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
       this.authEmployeeService.signin(this.loginForm.value).subscribe(
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
          this.router.navigate(['employees']);
        }
      );
    }
     
  }

  // Handle response
  responseHandler(data: any){
    this.tokenEmployee.handleData(data.token);
  }

}