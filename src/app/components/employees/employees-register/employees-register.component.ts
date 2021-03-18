import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthEmployeeService } from '../../../shared/auth-employee.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { of } from 'rxjs';

@Component({
  selector: 'app-employees-register',
  templateUrl: './employees-register.component.html',
  styleUrls: ['./employees-register.component.css']
})
export class EmployeesRegisterComponent implements OnInit {
    registerForm: FormGroup;
    errors = [];
    workShifts: {id: string, name: string}[]=[];
    specialities: {id: string, name: string}[]=[];
    submitted = false;
  
    constructor(
      public router: Router,
      public fb: FormBuilder,
      public authEmployeeService: AuthEmployeeService
    ) {
     
    }
    ngOnInit() {
      this.registerForm = this.fb.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        email: ['', Validators.email],
        password: ['', [Validators.required, Validators.minLength(6)]],
        admin: ['', Validators.required],
        workShifts: ['', Validators.required],
        specialities: ['', Validators.required]
      });
      of(this.getWorkShift()).subscribe(workShifts => {
        this.workShifts = workShifts;
        this.registerForm.controls.workShifts.patchValue(this.workShifts[0].name);
      });
      of(this.getSpecilityId()).subscribe(specialities => {
        this.specialities = specialities;
        this.registerForm.controls.specialities.patchValue(this.specialities[0].id);
      });
     }
  
    onSubmit() {
      this.submitted = true;
      this.authEmployeeService.register(this.registerForm.value).subscribe(
        result => {
          console.log(result);
        },
        error => {
          console.log(error);
          this.errors = error.error;
        },
        () => {

          this.registerForm.reset()
          this.router.navigate(['loginEmployee']);
        }
      )
    }

    getWorkShift() {
      return [
        {id: '1',  name: 'tarde' },
        {id: '2',  name: 'mañana' },
      ];
    }

    getSpecilityId() {
      return [
        { id: '106', name: 'dermatologia' },
        { id: '115', name: 'cardiologia' },
        { id: '197', name: 'cirugia' },
      ];
    }

    onReset(){
      this.submitted =false;
      this.registerForm.reset();
    }
    // handleError(error){
    //   this.error = error.error.errors;
    // }
  
  }



