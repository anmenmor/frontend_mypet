import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/models/Employee';
import { AuthEmployeeService } from 'src/app/shared/auth-employee.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { SpecialitiesService } from 'src/app/services/specialities.service';
import { Specialities } from '../../../models/Specialities';
import { of } from 'rxjs';

@Component({
  selector: 'app-employees-update',
  templateUrl: './employees-update.component.html',
  styleUrls: ['./employees-update.component.css']
})
export class EmployeesUpdateComponent implements OnInit {
  updateForm: FormGroup;
  employeeDetails: Employee | any;
  edit: boolean = false;
  errors: string[] = [];
  specialities: Specialities[] | any;
  submitted = false;
  workShifts: { id: string, name: string }[] = [];
  @Output() buttonUpdateClick = new EventEmitter<void>();
  @Output() alertUpdated = new EventEmitter<any>();


  constructor(
    public router: Router,
    public fb: FormBuilder,
    private employeeService: AuthEmployeeService,
    public specialitiesService: SpecialitiesService) {

  }

  ngOnInit(): void {
    this.edit = true;
  }

  //Recibe un empleado de employees-list
  @Input()
  set employeeSelected(employeeSelected: Employee) {
    if (employeeSelected) {
      this.edit = true;
      this.employeeDetails = employeeSelected;
      this.updateForm = this.fb.group({
        name: [this.employeeDetails.name, [Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-ZÀ-ÿ \u00f1\u00d1]+')])]],
        surname: [this.employeeDetails.surname, [Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-ZÀ-ÿ \u00f1\u00d1]+')])]],
        email: [this.employeeDetails.email, [Validators.compose([
          Validators.required,
          Validators.email])]],
        admin: [this.employeeDetails.admin, Validators.required],
        workShifts: [''],
        specialities: ['']
      });

      of(this.getWorkShift()).subscribe(workShifts => {
        this.workShifts = workShifts;
        workShifts.forEach((element: any) => {
          if (element.name == this.employeeDetails.workShifts) {
            this.updateForm.controls.workShifts.patchValue(element.name);
          }
        });
      });

      this.getSpecility().then(specialities => {
        specialities.forEach((element: any) => {
          if (element.id === this.employeeDetails.specialities) {
            this.updateForm.controls.specialities.patchValue(element.id);
          }

        });
      });
    }

  }
  getWorkShift(): any {
    return [
      { name: 'Mañana' },
      { name: 'Tarde' },
    ];
  }

  update(): void {
    this.submitted = true;
    if (!this.updateForm.invalid) {
      this.employeeDetails.name = this.updateForm.value.name;
      this.employeeDetails.surname = this.updateForm.value.surname;
      this.employeeDetails.email = this.updateForm.value.email;
      this.employeeDetails.workShifts = this.updateForm.value.workShifts;
      this.employeeDetails.specialities = this.updateForm.value.specialities;
      this.employeeService.updateEmployee(this.employeeDetails).subscribe(
        data => {
          this.employeeDetails = new Employee(data);
          this.alertUpdated.emit({
            type: 'success',
            message: 'Empleado actualizado correctamente.',
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
        },
        () => {
          this.hideComponent();
        });
    }
  }

  getSpecility(): Promise<any> {
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

  hideComponent() {
    this.buttonUpdateClick.emit();
  }


}
