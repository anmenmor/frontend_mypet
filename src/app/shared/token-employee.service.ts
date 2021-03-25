import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TokenEmployeeService {

  private issuer = {
    login: 'http://127.0.0.1:8000/api/auth/loginEmployee',
    register: 'http://127.0.0.1:8000/api/auth/registerEmployee'
  }

  constructor() { }

  handleData(token: any){
    localStorage.setItem('auth_token', token);
  }

  getToken(){
    return localStorage.getItem('auth_token');
  }

  // Verify the token
  isValidToken(){
     const token = this.getToken();
      // CAMBIO LINEA 28: De undefined a null por problemas - Fran
     if(token !== null){
       const payload = this.payload(token);
       if(payload){
         return Object.values(this.issuer).indexOf(payload.iss) > -1 ? true : false;
       }else return false;
     } else {
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
  }

}