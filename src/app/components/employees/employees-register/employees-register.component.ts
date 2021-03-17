import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthEmployeeService } from '../../../shared/auth-employee.service';
import { FormBuilder, FormGroup } from "@angular/forms";
import { of } from 'rxjs';

@Component({
  selector: 'app-employees-register',
  templateUrl: './employees-register.component.html',
  styleUrls: ['./employees-register.component.css']
})
export class EmployeesRegisterComponent implements OnInit {
    registerForm: FormGroup;
    errors = null;
    workShifts: {id: string, name: string}[]=[];
    specialities: {id: string, name: string}[]=[];
  
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
        workShifts: [''],
        specialities: ['']
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
  
  }



