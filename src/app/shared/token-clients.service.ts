import { Injectable } from '@angular/core';
import { ClientsRaw } from '../models/clients.raw';
import { Payload } from '../models/payload';
import { AuthClientsService } from './auth-clients.service';

@Injectable({
  providedIn: 'root'
})

export class TokenClientsService {

  private issuer = {
    login: 'http://127.0.0.1:8000/api/auth/loginClients',
    register: 'http://127.0.0.1:8000/api/auth/registerClients'
  }

  constructor(private authClientsService: AuthClientsService) { }

  handleData(token: any) {
    localStorage.setItem('auth_token', token);
    this.authClientsService.getAuthenticateUser().subscribe((client: ClientsRaw) => {
      this.authClientsService.setCurrentClientValue(client.user)
    })
  }

  getToken() {
    return localStorage.getItem('auth_token');
  }

  // Verify the token

  isValidToken() {
    const payload = this.payload();
    if (payload) {
      return Object.values(this.issuer).indexOf(payload.iss) > -1 ? true : false;
    } else {
      return false;
    }
  }


  payload(): Payload | null {
    const token = this.getToken()
    if (token) {
      const jwtPayload = token.split('.')[1];
      return JSON.parse(atob(jwtPayload));

    } else {
      return null
    }
  }

  // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
  }

  // Remove token
  removeToken() {
    localStorage.removeItem('auth_token');
    this.authClientsService.setCurrentClientValue(null)
  }

}