import { Component, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { Employee } from 'src/app/models/Employee';
import { Specialities } from 'src/app/models/Specialities';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { SpecialitiesService } from 'src/app/services/specialities.service';
import { AuthEmployeeService } from '../../../shared/auth-employee.service';


@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit{
  employees: Employee[] | any;
  employeeSelectedInList: Employee | any;
  submitted = false;
  specialities: Specialities[] | any;
  add = false;
  employeeAdmin: boolean =false;
  @Output() employeeSelectedEvent = new EventEmitter<Employee>();

  constructor(private employeeService: AuthEmployeeService, private adminService: AdminServiceService, private specialitiesService: SpecialitiesService) { }

  ngOnInit(): void {
    this.employees = [];
    this.listAllEmployees();
    this.getSpecility();
    this.adminService.checkIsAdmin().then(isAdmin =>{
      this.employeeAdmin = isAdmin;
    }

    );
    console.log("Admin en el componente " + this.employeeAdmin);
  }

  listAllEmployees(): void {
    this.submitted = true;
    this.employeeService.listAllEmployees().subscribe(data=>
      {
        this.employees = Object.values(data)
        .map(employeeDB => new Employee(employeeDB));
      });
  }

  sendSelected(employee: Employee): void{
    this.employeeSelectedInList =  employee;
    this.employeeSelectedEvent.emit(employee);

  }

  getSpecility(): void {
      this.specialitiesService.specialities().subscribe(
        data=>{
          console.log(data);
          this.specialities = Object.values(data)
          .map(specialitiesDB => new Specialities(specialitiesDB));
          console.log(this.specialities);
        });
    }   

    //this.specialities tiene cargado el listado de especialidades al llamarse en el OnInit
    getSpecialitybyId(id: string): any{
      return this.specialities.filter( (specialty: Specialities) => specialty.id == id)[0].name;    
    } 

    addEmployee(): void{
      this.add = true;
    }

    deleteEmployee(id: number): void{
      this.employeeService.deleteEmployee(id).subscribe(
        (data)=> {
          let index: number = this.employees.findIndex((employee : Employee) => employee.id === data.id);
          if (index !== -1){
            this.employees.splice(index,1);
            alert('El empleado ha' + data.name+ 'sido eliminado correctamente');
          }
         });
    }

}
