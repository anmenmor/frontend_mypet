import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { TokenEmployeeService } from "../shared/token-employee.service";
import { TokenClientsService } from "../shared/token-clients.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private employeeTokenService: TokenEmployeeService,private clientTokenService: TokenClientsService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let accessToken = this.employeeTokenService.getToken();
        if(!accessToken){
            accessToken = this.clientTokenService.getToken();
        }
        
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + accessToken           
            },
            
        });
        return next.handle(req);
    }

    

   
}