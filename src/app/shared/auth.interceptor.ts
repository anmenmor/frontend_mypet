import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { TokenEmployeeService } from "../shared/token-employee.service";
import { TokenClientsService } from "../shared/token-clients.service";
import { Observable } from "rxjs";

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
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                console.log(error);
                if( error instanceof HttpErrorResponse){
                    console.log(error.status);
                    console.log(error.statusText);
                    if (error.status === 401 || error.status === 403){
                        this.employeeTokenService.removeToken();
                        window.location.href = "/loginEmployee";
                    }
    
                }
                return throwError(error);
            })
        )
       
    }

    

   
}