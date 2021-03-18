import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { TokenEmployeeService } from 'src/app/shared/token-employee.service';

@Component({
  selector: 'app-navbar-clinics',
  templateUrl: './navbar-clinics.component.html',
  styleUrls: ['./navbar-clinics.component.css']
})
export class NavbarClinicsComponent implements OnInit {
  isSignedIn: boolean;

  constructor(
    private auth: AuthStateService,
    public router: Router,
    public tokenEmployee: TokenEmployeeService,
  ) {
  }

  ngOnInit() {
    this.auth.userAuthState.subscribe(val => {
        this.isSignedIn = val;
    });
  }

  // Signout
  signOut() {
    this.auth.setAuthState(false);
    this.tokenEmployee.removeToken();
    this.router.navigate(['loginEmployee']);
  }

}
