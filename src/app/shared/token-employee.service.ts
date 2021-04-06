import { Injectable } from '@angular/core';
import { Employee } from '../models/Employee';
import { Payload } from '../models/payload';
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
      this.authEmployeeService.setCurrentEmployeeValue(employee)
    })
  }

  getToken(): string | null{
    return localStorage.getItem('auth_token');
  }

  // Verify the token
  isValidToken(){
       const payload = this.payload();
       if(payload){
        console.log(payload);
         return Object.values(this.issuer).indexOf(payload.iss) > -1 ? true : false;
       }else{
        console.log("no hay payload");
         return false;
       } 
     }
  

  payload(): Payload | null {
    const token = this.getToken()
    if (token) {
      const jwtPayload = token.split('.')[1];
    return JSON.parse(atob(jwtPayload));

    } else {
      console.log("no hay token")
      return null
    }
  }

  // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
  }

  // Remove token
  removeToken(){
    localStorage.removeItem('auth_token');
    this.authEmployeeService.setCurrentEmployeeValue(null);
  }

}