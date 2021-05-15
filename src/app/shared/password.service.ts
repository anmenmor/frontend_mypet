import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private http: HttpClient) { }


    // req-password-reset
    reqPasswordReset(data: any) {
      return this.http.post('http://127.0.0.1:8000/api/resetPass', data)
    }  
  
    // update password
    updatePassword(data: any) {
      return this.http.post('http://127.0.0.1:8000/api/updatePass', data)
    }
}



