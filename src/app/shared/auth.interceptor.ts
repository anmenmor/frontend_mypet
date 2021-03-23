import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { TokenEmployeeService } from "../shared/token-employee.service";
import { TokenClientsService } from "../shared/token-clients.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenEmployeeService,private tokensService: TokenClientsService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const accessToken = this.tokenService.getToken();
        const accesToken = this.tokensService.getToken();
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + {accessToken , accesToken},
                            
                
            },
            
        });
        return next.handle(req);
    }

    

   
}