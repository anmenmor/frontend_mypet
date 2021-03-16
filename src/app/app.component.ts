import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenEmployeeService } from './shared/token-employee.service';
import { AuthStateService } from './shared/auth-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
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