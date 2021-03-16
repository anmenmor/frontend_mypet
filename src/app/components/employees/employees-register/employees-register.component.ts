import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthEmployeeService } from '../../../shared/auth-employee.service';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-employees-register',
  templateUrl: './employees-register.component.html',
  styleUrls: ['./employees-register.component.css']
})
export class EmployeesRegisterComponent implements OnInit {
    registerForm: FormGroup;
    errors = null;
  
    constructor(
      public router: Router,
      public fb: FormBuilder,
      public authEmployeeService: AuthEmployeeService
    ) {
      this.registerForm = this.fb.group({
        name: [''],
        surname: [''],
        email: [''],
        password: [''],
        admin: [''],
        work_shift: ['']
      })
    }
  
    ngOnInit() { }
  
    onSubmit() {
      this.authEmployeeService.register(this.registerForm.value).subscribe(
        result => {
          console.log(result)
        },
        error => {
          this.errors = error.error;
        },
        () => {
          this.registerForm.reset()
          this.router.navigate(['loginEmployee']);
        }
      )
    }
  
  }



