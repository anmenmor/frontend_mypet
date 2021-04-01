import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { TokenEmployeeService } from 'src/app/shared/token-employee.service';
import { TokenClientsService } from 'src/app/shared/token-clients.service';

@Component({
  selector: 'app-navbar-clinics',
  templateUrl: './navbar-clinics.component.html',
  styleUrls: ['./navbar-clinics.component.css']
})
export class NavbarClinicsComponent implements OnInit {
  isSignedIn: boolean | any;
  isSignedEmployee: boolean = false;
  isSignedClient: boolean = false;

  constructor(
    private auth: AuthStateService,
    // private auths: AuthStateService,
    public router: Router,
    public tokenEmployee: TokenEmployeeService,
    public tokenClients: TokenClientsService,
  ) {
  }

  ngOnInit() {
    console.log('ngOninit');
    this.isSignedIn = false;
    this.auth.userAuthState.subscribe(val => {
        console.log(val);
        this.isSignedIn = val;
        if(!val) {
          console.log('redirigiendo');
          this.router.navigate(["/"]);
        }
    });
    console.log('fin ngOninit');
    // this.auths.usersAuthState.subscribe(val => {
    //   console.log(val);
    //   this.isSignedIn = val;
    //   if(!val) {this.router.navigate(["/loginClient"]);}
    // });
  
  }

  // Signout
  signOut() {
    this.auth.setAuthState(false);
    this.tokenEmployee.removeToken();
    this.tokenClients.removeToken();
    this.router.navigate(['loginEmployee']);
    this.router.navigate(['loginClients']);
  }

}
