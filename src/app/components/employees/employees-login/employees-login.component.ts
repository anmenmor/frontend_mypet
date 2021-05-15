import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthEmployeeService } from '../../../shared/auth-employee.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TokenEmployeeService } from '../../../shared/token-employee.service';
import { AuthStateService } from '../../../shared/auth-state.service';
import { Employee } from 'src/app/models/Employee';

@Component({
  selector: 'app-employees-login',
  templateUrl: './employees-login.component.html',
  styleUrls: ['./employees-login.component.css']
})
export class EmployeesLoginComponent implements OnInit {
  loginForm: FormGroup;
  errors: string[] = [];
  submitted = false;
  serverError = false;
  // admin = false;
  employeAuthenticated: Employee | any;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authEmployeeService: AuthEmployeeService,
    private tokenEmployee: TokenEmployeeService,
    private authState: AuthStateService,
  ) {

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.value.email.length > 0 && this.loginForm.value.password.length > 0) {
      this.authEmployeeService.signin(this.loginForm.value).subscribe(
        result => {
          this.responseHandler(result);
        },
        error => {
          this.serverError = true;
          if (error.status == 0) {
            this.errors.push("Error al conectar con el servidor");
          } else {
            this.errors = error.error;
          }
        }, () => {
          this.authState.setAuthState(true);
          this.loginForm.reset()
          this.router.navigate(['clinics/main']);
        }
      );
    }

  }

  // Handle response
  responseHandler(data: any) {
    this.tokenEmployee.handleData(data.token);
  }

}