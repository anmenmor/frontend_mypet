import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenEmployeeService } from './shared/token-employee.service';
import { AuthStateService } from './shared/auth-state.service';
import { AuthEmployeeService } from './shared/auth-employee.service';
import { Employee } from './models/Employee';
import { AuthClientsService } from './shared/auth-clients.service';
import { Clients } from './models/clients';
import { TokenClientsService } from './shared/token-clients.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  // isSignedIn: boolean;

   constructor(
    private authEmployeeService: AuthEmployeeService,
    private authClientsService: AuthClientsService,
  //   private auth: AuthStateService,
  //   public router: Router,
    private tokenEmployee: TokenEmployeeService,
    private tokenClient: TokenClientsService,
   ) {
   }

  ngOnInit() {
    if (this.tokenEmployee.getToken()) {
      this.authEmployeeService.getAuthenticateUser().subscribe((employee: Employee) => {
        this.authEmployeeService.setCurrentEmployeeValue(employee)
    }) 
    }
    if (this.tokenClient.getToken()) {
      this.authClientsService.getAuthenticateUser().subscribe((client: Clients) => {
        this.authClientsService.setCurrentClientValue(client)
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