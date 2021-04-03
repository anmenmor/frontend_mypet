import { Injectable } from '@angular/core';
import { Employee } from '../models/Employee';
import { AuthEmployeeService } from './auth-employee.service';

@Injectable({
  providedIn: 'root'
})

export class TokenEmployeeService {

  private issuer = {
    loginEmployee: 'http://127.0.0.1:8000/api/loginEmployee',
    loginClient: 'http://127.0.0.1:8000/api/loginClients',
  }

  constructor(private authEmployeeService: AuthEmployeeService) { }

  handleData(token: any){
    localStorage.setItem('auth_token', token);
    this.authEmployeeService.getAuthenticateUser().subscribe((employee: Employee) => {
      this.authEmployeeService.currentEmployee = employee
    })
  }

  getToken(){
    return localStorage.getItem('auth_token');
  }

  // Verify the token
  isValidToken(){
     const token = this.getToken();
      // CAMBIO LINEA 28: De undefined a null por problemas - Fran
     if(token !== null){
       console.log('hay token');
       console.log(token);
       const payload = this.payload(token);
       if(payload){
        console.log(payload);
         return Object.values(this.issuer).indexOf(payload.iss) > -1 ? true : false;
       }else{
        console.log("no hay payload");
         return false;
       } 
     } else {
      console.log("no hay token");
        return false;
     }
  }

  payload(token: any) {
    const jwtPayload = token.split('.')[1];
    return JSON.parse(atob(jwtPayload));
  }

  // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
  }

  // Remove token
  removeToken(){
    localStorage.removeItem('auth_token');
    this.authEmployeeService.currentEmployee = null
  }

}