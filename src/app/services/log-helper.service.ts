import { Injectable } from "@angular/core";
import { AuthClientsService } from "../shared/auth-clients.service";
import { AuthEmployeeService } from "../shared/auth-employee.service";

@Injectable({
  providedIn: "root",
})
export class LogHelper {
  constructor(
    private clientLogin: AuthClientsService,
    private employeeLogin: AuthEmployeeService,
  ) {}

  getLoggedUser(): any {
    this.clientLogin.profileClients().subscribe(
      (data) => {
        return data.user;
      },
      (exception) => {
        this.employeeLogin.getAuthenticateUser().subscribe((data) => {
          return data.user;
        });
      }
    );
  }
}
