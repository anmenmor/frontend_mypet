import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenEmployeeService } from './shared/token-employee.service';

@Injectable({
  providedIn: 'root'
})
export class AuthEmployeesGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private tokenEmployee: TokenEmployeeService
  ) { }

  canActivate() {
    const currentPayload = this.tokenEmployee.payload();
    const loginUrl: String = currentPayload ? currentPayload.iss : "";
    if (loginUrl.endsWith("loginEmployee")) {
      return true;
    }
    this.router.navigate(['/']);
    return false;

  }



}
