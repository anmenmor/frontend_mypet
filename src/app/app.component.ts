import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenEmployeeService } from './shared/token-employee.service';
import { AuthStateService } from './shared/auth-state.service';
import { AuthEmployeeService } from './shared/auth-employee.service';
import { Employee } from './models/Employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  // isSignedIn: boolean;

   constructor(
    private authEmployeeService: AuthEmployeeService,
  //   private auth: AuthStateService,
  //   public router: Router,
   public tokenEmployee: TokenEmployeeService,
   ) {
   }

  ngOnInit() {
    if (this.tokenEmployee.getToken() && !this.authEmployeeService.currentEmployee) {
      this.authEmployeeService.getAuthenticateUser().subscribe((employee: Employee) => {
        this.authEmployeeService.currentEmployee = employee
    }) 
    }
    
  //   this.auth.userAuthState.subscribe(val => {
  //       this.isSignedIn = val;
  //   });
  }

  // // Signout
  // signOut() {
  //   this.auth.setAuthState(false);
  //   this.tokenEmployee.removeToken();
  //   this.router.navigate(['loginEmployee']);
  // }

}