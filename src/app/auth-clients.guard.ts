import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenClientsService } from './shared/token-clients.service';

@Injectable({
  providedIn: 'root'
})
export class AuthClientsGuard implements CanActivate {

  constructor(
    private router: Router,
    private tokenClients: TokenClientsService
  ) { }

  canActivate() {
    const currentPayload = this.tokenClients.payload();
    const loginUrl: String = currentPayload ? currentPayload.iss : "";
    if (loginUrl.endsWith("loginClients")) {
      return true;
    }
    this.router.navigate(['/']);
    return false;

  }
  
}
