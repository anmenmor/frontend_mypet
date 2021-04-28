import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthClientsService } from './shared/auth-clients.service';
import { AuthEmployeeService } from './shared/auth-employee.service';
import { Employee } from 'src/app/models/Employee';
import { Clients } from 'src/app/models/clients';

@Injectable({
  providedIn: 'root'
})
export class AuthEmployeesGuard implements CanActivate {
  currentEmployee: Employee |any;
  // currentClient: Clients |any;

  constructor(
    private router: Router,
    private employeesService: AuthEmployeeService,
) { }


getEmployeeAuthenticated() : Promise<any>{
  return new Promise(resolve => {
    this.employeesService.getCurrentEmployeeValue().subscribe(
      data => {
        console.log("la data", data);
        resolve(data);
      }
    );
  } );
}

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  
    console.log('verificando guard');
    // const currentEmployee = this.employeesService.getCurrentEmployeeValue;
    const currentEmployee = this.employeesService.currentEmployee;
    
    this.getEmployeeAuthenticated()
    .then(authenticatedEmployee => {
      if(authenticatedEmployee !== null){
        console.log('hay empleado');
        console.log(this.currentEmployee);
  
        return true;
      }
    });

    // if (this.currentEmployee) {
    //   console.log('hay empleado');
    //     return true;
    // }

    console.log('no logueado como empleado');
    this.router.navigate(['/loginEmployee']);
    return false;
}
  
}
