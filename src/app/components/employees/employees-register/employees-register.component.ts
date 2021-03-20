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
    errors: string [] = [];
    workShifts: {id: string, name: string}[]=[];
    specialities: {id: string, name: string}[]=[];
    submitted = false;
  
    constructor(
      public router: Router,
      public fb: FormBuilder,
      public authEmployeeService: AuthEmployeeService
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
        admin: ['', Validators.required],
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
  
    onSubmit(): void {
      this.submitted = true;
      this.authEmployeeService.register(this.registerForm.value).subscribe(
        result => {
          alert('El empleado ha sido registrado correctamente!')
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
          this.router.navigate(['loginEmployee']);
        }
      )
    }

    getWorkShift(): any {
      return [
        {id: '1',  name: 'Mañana' },
        {id: '2',  name: 'Tarde' },
      ];
    }

    getSpecilityId(): any {
      return [
        { id: '106', name: 'Dermatologia' },
        { id: '115', name: 'Cardiologia' },
        { id: '197', name: 'Cirugia' },
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



