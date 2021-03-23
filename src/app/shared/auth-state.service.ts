import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TokenEmployeeService } from '../shared/token-employee.service';
import { TokenClientsService } from '../shared/token-clients.service';

@Injectable({
  providedIn: 'root'
})

export class AuthStateService {

  private userState = new BehaviorSubject<boolean>(this.tokenEmployee.isLoggedIn());
  private usersState = new BehaviorSubject<boolean>(this.tokenClients.isLoggedIn());
  
  userAuthState = this.userState.asObservable();
  usersAuthState = this.usersState.asObservable();

  constructor(
    public tokenEmployee: TokenEmployeeService,
    public tokenClients: TokenClientsService
  ) { }

  setAuthState(value: boolean) {
    this.usersState.next(value);
    this.userState.next(value);
  }
  
}