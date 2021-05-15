import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthEmployeeService } from '../../../shared/auth-employee.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { of } from 'rxjs';
import { SpecialitiesService } from 'src/app/services/specialities.service';
import { Specialities } from '../../../models/Specialities';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-employees-register',
  templateUrl: './employees-register.component.html',
  styleUrls: ['./employees-register.component.css']
})

export class EmployeesRegisterComponent implements OnInit {
  registerForm: FormGroup;
  errors: string[] = [];
  workShifts: { id: string, name: string }[] = [];
  specialities: Specialities[] | any;
  submitted = false;
  @Output() buttonRegisterClick = new EventEmitter<void>();
  @Output() alertOk = new EventEmitter<any>();


  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authEmployeeService: AuthEmployeeService,
    public specialitiesService: SpecialitiesService
  ) {
  }
  ngOnInit(): void {

    this.registerForm = this.fb.group({
      name: ['', [Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-ZÀ-ÿ \u00f1\u00d1]+')])]],
      surname: ['', [Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-ZÀ-ÿ \u00f1\u00d1]+')])]],
      email: ['', [Validators.compose([
        Validators.required,
        Validators.email])]],
      password: ['', [Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$')])]],
      admin: ['', Validators.required],
      workShifts: [''],
      specialities: ['']
    });

    of(this.getWorkShift()).subscribe(workShifts => {
      this.workShifts = workShifts;
      this.registerForm.controls.workShifts.patchValue(this.workShifts[0].name);
    });
    this.getSpecilityId().then(specialities => {
      this.specialities = specialities;
      this.registerForm.controls.specialities.patchValue(this.specialities[0].id);
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (!this.registerForm.invalid) {
      this.authEmployeeService.register(this.registerForm.value).subscribe(
        result => {
          this.alertOk.emit({
            type: 'success',
            message: 'Empleado añadido correctamente.',
          });
        },
        error => {
          if (error.status == 409) {
            this.errors.push('El email introducido ya existe.');
          } else if (error.status == 0){
            this.errors.push('Error al conectar con el servidor.');
          } else {
            console.log(error.error);
             this.errors.push(error.error.message[0]);
         
   
          }
        } 
        ,
        () => {
          this.registerForm.reset();
          this.hideComponent();
        }
      );
    }
  }

  getWorkShift(): any {
    return [
      { name: 'Mañana' },
      { name: 'Tarde' },
    ];
  }

  //Como se hace una llamada a un servicio que llama a un servicio más arriba, al ser asíncronos no se esperan
  //Por eso es necesario que la llamada al servicio de specialities() sea en forma de promesa
  getSpecilityId(): Promise<any> {
    return new Promise(resolve => {
      this.specialitiesService.specialities().subscribe(
        data => {
          this.specialities = Object.values(data)
            .map(specialitiesDB => new Specialities(specialitiesDB));
          resolve(this.specialities);
        }

      );
    });
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  hideComponent() {
    this.buttonRegisterClick.emit();
  }

}





