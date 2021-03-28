import { Component, Input, OnInit } from '@angular/core';
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
  edit: boolean;
  specialities: Specialities[] | any;
  workShifts: {id: string, name: string}[]=[];
 

  constructor(
    public router: Router,
    public fb: FormBuilder,
    private employeeService: AuthEmployeeService,
    public specialitiesService: SpecialitiesService) 
    {
     
     }
  ngOnInit(): void {
    this.edit = false;
    console.log("Invoco ON init");
    
  }
  //Recibe un empleado de employees-list
  @Input()
  set employeeSelected(employeeSelected: Employee){
    if(employeeSelected){
      this.edit = true;
      this.employeeDetails = employeeSelected;
      console.log("update component");
      console.log(employeeSelected);
      try {
        this.employeeDetails = employeeSelected;
      } catch (e){
        console.log(e.status, e.message);
      }
      this.updateForm = this.fb.group({
        name: [this.employeeDetails.name, [Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z]+')])]],
        surname: [this.employeeDetails.surname, [Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z ]+')])]],
        email: [this.employeeDetails.email,  [Validators.compose([
          Validators.required,
          Validators.email])]],
        admin: ['', Validators.required],
        workShifts: [''],
        specialities: ['']
      });

      of(this.getWorkShift()).subscribe(workShifts => {
        this.workShifts = workShifts;
        workShifts.forEach((element: any) => {
          if(element.name == this.employeeDetails.workShifts){
            this.updateForm.controls.workShifts.patchValue(element.name);
          }
        });
      });

      this.getSpecility().then(specialities => {
        specialities.forEach((element : any) => {
          if(element.id === this.employeeDetails.specialities){
            this.updateForm.controls.specialities.patchValue(element.id);
          }
        
        });
    });
    }
    
  }
  getWorkShift(): any {
    return [
      { name: 'mañana' },
      { name: 'tarde' },
    ];
  }

  update(): void{
    console.log(this.updateForm.value);
    this.employeeDetails.name = this.updateForm.value.name;
    this.employeeDetails.surname = this.updateForm.value.surname;
    this.employeeDetails.email = this.updateForm.value.email;
    this.employeeDetails.workShifts = this.updateForm.value.workShifts;
    this.employeeDetails.specialities = this.updateForm.value.specialities;
    console.log(this.employeeDetails);
    this.employeeService.updateEmployee(this.employeeDetails).subscribe(
      data => {this.employeeDetails = new Employee(data);
        alert('Empleado actualizado!'); }  );

  }

  getSpecility(): Promise<any> {
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

}
