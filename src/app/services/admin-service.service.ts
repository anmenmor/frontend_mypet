import { Injectable } from '@angular/core';
import { AuthEmployeeService } from '../shared/auth-employee.service';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  isAdmin: boolean = false;
  constructor(private authEmployeeService: AuthEmployeeService) {
    
   }

   checkIsAdmin(): Promise<any>
   {
    return new Promise( resolve=> {
      this.authEmployeeService.getAuthenticateUser().subscribe(
        data=>{ 
          resolve(data.admin);
        }

      );
    });
   }
}

