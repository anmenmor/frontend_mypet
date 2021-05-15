import { Component, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { Employee } from 'src/app/models/Employee';
import { Specialities } from 'src/app/models/Specialities';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { SpecialitiesService } from 'src/app/services/specialities.service';
import { AuthEmployeeService } from '../../../shared/auth-employee.service';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap'; 

interface Alert {
  type: string;
  message: string;
}
@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css'],
  providers: [NgbPaginationConfig]

})
export class EmployeesListComponent implements OnInit{
  alerts: Alert[] =[];
  employees: Employee[] | any;
  employeeSelectedInList: Employee | any;
  submitted = false;
  specialities: Specialities[] | any = [];
  loading = true;

//Paginacion  
  totalItems: number = 0;
  page: number = 0;
  previousPage: number = 0;
  showPagination: boolean =false;
  pageSize: number = 0;

  employeeAdmin: boolean = false;
  registerChild: boolean = false;
  updateChild: boolean = false;
  @Output() employeeSelectedEvent = new EventEmitter<Employee>();

  constructor(private employeeService: AuthEmployeeService, private adminService: AdminServiceService, private specialitiesService: SpecialitiesService) { }

  ngOnInit(): void {
    this.page =1;
	  this.previousPage =1;
    this.employees = [];
    this.listAllEmployeesPagination(this.page);
    this.getSpecility();
    this.employeeService.getCurrentEmployeeValue().subscribe((employee : Employee|null) => {
      this.employeeAdmin = employee? employee.admin : false;
    }); 
  }

  //Alertas
  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  getAlertRegister(event: Alert) {
    this.alerts.push(event);
  }

  getAlertUpdated(event: Alert){
    this.alerts.push(event);
  } 

  listAllEmployeesPagination(page: number): void {
    this.submitted = true;
    this.employeeService.listAllEmployeesPagination(page).subscribe(
      response =>{
        this.hideloader();
        if ((!response && !response.data) || (response && response.data && response.data.length == 0)) {
          this.employees = [];
          this.showPagination = false;
        }
        else {
          this.employees = Object.values(response.data)
          .map(employeeDB => new Employee(employeeDB));
          this.totalItems = response.total;
          this.pageSize = response.per_page;
          this.showPagination = true;
        }


      });
  }
  loadPage(page: number) {
    this.loading = true;
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.listAllEmployeesPagination(this.page);
    }
  }
  sendSelected(employee: Employee): void{
    this.updateChild = true;
    this.registerChild = false;
    this.employeeSelectedInList =  employee;
    this.employeeSelectedEvent.emit(employee);

  }

  getSpecility(): void {
      this.specialitiesService.specialities().subscribe(
        data=>{
          this.specialities = Object.values(data)
          .map(specialitiesDB => new Specialities(specialitiesDB));
        });
    }   

    //this.specialities tiene cargado el listado de especialidades al llamarse en el OnInit
    getSpecialitybyId(id: string): any{
      let specialitiesFilter = this.specialities.filter( (specialty: Specialities) => specialty.id == id)
      if (specialitiesFilter.length > 0) {
        return specialitiesFilter[0].name.charAt(0).toUpperCase() + specialitiesFilter[0].name.slice(1);
      }
      return "No disponible";    
    } 

    addEmployee(): void{
      this.registerChild = true;
      this.updateChild = false;
    }

    deleteEmployee(id: number): void{
      this.employeeService.deleteEmployee(id).subscribe(
        (data)=> {
          let index: number = this.employees.findIndex((employee : Employee) => employee.id === data.id);
          if (index !== -1){
            this.employees.splice(index,1);
            this.alerts.push({
              type: 'success',
              message: 'Empleado: ' +data.name+' borrado exitosamente',
            });
          }
         },
         error => {
              this.alerts.push({
                type: 'danger',
                message: 'No se ha podido eliminar, el empleado no se encuentra en la base de datos.',
              });
        },
         );
    }

    hideRegisterChild(){
      this.registerChild = false;
    }

    hideUpdateChild(){
      this.updateChild = false;
    }
 
    hideloader() {
      this.loading = false;
    }
}

