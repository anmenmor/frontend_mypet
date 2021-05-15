import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { TokenEmployeeService } from 'src/app/shared/token-employee.service';
import { TokenClientsService } from 'src/app/shared/token-clients.service';
import { AuthEmployeeService } from 'src/app/shared/auth-employee.service';
import { Employee } from 'src/app/models/Employee';
import { AuthClientsService } from 'src/app/shared/auth-clients.service';
import { Clients } from 'src/app/models/clients';

@Component({
  selector: 'app-navbar-clinics',
  templateUrl: './navbar-clinics.component.html',
  styleUrls: ['./navbar-clinics.component.css']
})
export class NavbarClinicsComponent implements OnInit {
  isSignedIn: boolean | any;
  isSignedEmployee: boolean = false;
  isSignedClient: boolean = false;
  currentEmployee: Employee | null = null;
  currentClient: Clients | null = null;

  constructor(
    private auth: AuthStateService,
    public employeeService: AuthEmployeeService,
    public clientService: AuthClientsService,
    public router: Router,
    public tokenEmployee: TokenEmployeeService,
    public tokenClients: TokenClientsService,
  ) {

  }

  ngOnInit() {
    this.isSignedIn = false;
    this.clientService.getCurrentClientValue().subscribe((client: Clients | null) => {
      this.currentClient = client
    })
    this.employeeService.getCurrentEmployeeValue().subscribe((employee: Employee | null) => {
      this.currentEmployee = employee
    })
    this.auth.userAuthState.subscribe(val => {
      this.isSignedIn = val;
    });

  }

  // Signout
  signOut() {
    let loginType = '';
    if (this.currentEmployee) {
      loginType = 'employee'
    } else if (this.currentClient) {
      loginType = 'client'
    }
    this.auth.setAuthState(false);
    this.tokenEmployee.removeToken();
    this.tokenClients.removeToken();
    switch (loginType) {
      case 'employee': this.router.navigate(['loginEmployee']);
        break;
      case 'client': this.router.navigate(['loginClients']);
        break;
      default: this.router.navigate(['']);
        break;
    }



  }

}
