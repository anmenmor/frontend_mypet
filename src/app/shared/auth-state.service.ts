import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TokenEmployeeService } from '../shared/token-employee.service';

@Injectable({
  providedIn: 'root'
})

export class AuthStateService {

  private userState = new BehaviorSubject<boolean>(this.tokenEmployee.isLoggedIn());
  userAuthState = this.userState.asObservable();


  constructor(
    public tokenEmployee: TokenEmployeeService,
  ) { }

  setAuthState(value: boolean) {
    this.userState.next(value);
  }
  
}