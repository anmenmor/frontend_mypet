import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthEmployeeService } from '../../../shared/auth-employee.service';
import { FormBuilder, FormGroup } from "@angular/forms";
import { TokenEmployeeService } from '../../../shared/token-employee.service';
import { AuthStateService } from '../../../shared/auth-state.service';

@Component({
  selector: 'app-employees-login',
  templateUrl: './employees-login.component.html',
  styleUrls: ['./employees-login.component.css']
})
export class EmployeesLoginComponent implements OnInit {
  loginForm: FormGroup;
  errors = null;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authEmployeeService: AuthEmployeeService,
    private tokenEmployee: TokenEmployeeService,
    private authState: AuthStateService,
  ) {
    this.loginForm = this.fb.group({
      email: [],
      password: []
    })
  }

  ngOnInit() { }

  onSubmit() {
      this.authEmployeeService.signin(this.loginForm.value).subscribe(
        result => {
          this.responseHandler(result);
        },
        error => {
          this.errors = error.error;
        },() => {
          this.authState.setAuthState(true);
          this.loginForm.reset()
          this.router.navigate(['profile']);
        }
      );
  }

  // Handle response
  responseHandler(data){
    this.tokenEmployee.handleData(data.token);
  }

}