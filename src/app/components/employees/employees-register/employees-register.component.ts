import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthEmployeeService } from '../../../shared/auth-employee.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { of } from 'rxjs';
import { SpecialitiesService } from 'src/app/services/specialities.service';
import { Specialities } from '../../../models/Specialities';

@Component({
  selector: 'app-employees-register',
  templateUrl: './employees-register.component.html',
  styleUrls: ['./employees-register.component.css']
})

export class EmployeesRegisterComponent implements OnInit {
    registerForm: FormGroup;
    errors: string [] = [];
    workShifts: {id: string, name: string}[]=[];
    // specialities: {id: string, name: string}[]=[];
    specialities: Specialities[] | any;
    submitted = false;

  
    constructor(
      public router: Router,
      public fb: FormBuilder,
      public authEmployeeService: AuthEmployeeService,
      public specialitiesService: SpecialitiesService
    ) {
      console.log("Constructor");
    }
    ngOnInit(): void {
      console.log("OnInit");
      this.registerForm = this.fb.group({
        name: ['', [Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z ]+')])]],
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
      this.getSpecilityId().then(specialities => {
        console.log(specialities);
        this.specialities = specialities;
        this.registerForm.controls.specialities.patchValue(this.specialities[0].id);
      });
     }
  
    onSubmit(): void {
      this.submitted = true;
      if(!this.registerForm.invalid){
        this.authEmployeeService.register(this.registerForm.value).subscribe(
          result => {
            alert('El empleado ha sido registrado correctamente!');
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
          }
        );
      }
    }

    getWorkShift(): any {
      return [
        {name: 'Mañana' },
        {name: 'Tarde' },
      ];
    }

    //Como se hace una llamada a un servicio que llama a un servicio más arriba, al ser asíncronos no se esperan
    //Por eso es necesario que la llamada al servicio de specialities() sea en forma de promesa
    getSpecilityId(): Promise<any> {
      return new Promise( resolve=> {
        this.specialitiesService.specialities().subscribe(
          data=>{
            console.log(data);
            this.specialities = Object.values(data)
            .map(specialitiesDB => new Specialities(specialitiesDB));
            console.log(this.specialities);
            
            resolve(this.specialities);
          }
  
        );
      });
    }

    onReset(){
      this.submitted = false;
      // this.show = false;
      this.registerForm.reset();
    }
    // handleError(error){
    //   this.error = error.error.errors;
    // }
  
  }



