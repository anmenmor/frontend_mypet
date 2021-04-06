import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { TokenEmployeeService } from 'src/app/shared/token-employee.service';
import { TokenClientsService } from 'src/app/shared/token-clients.service';
import { AuthEmployeeService } from 'src/app/shared/auth-employee.service';
import { Employee } from 'src/app/models/Employee';
import { AuthClientsService } from 'src/app/shared/auth-clients.service';

@Component({
  selector: 'app-navbar-clinics',
  templateUrl: './navbar-clinics.component.html',
  styleUrls: ['./navbar-clinics.component.css']
})
export class NavbarClinicsComponent implements OnInit {
  isSignedIn: boolean | any;
  isSignedEmployee: boolean = false;
  isSignedClient: boolean = false;
  // employeeName: string = " ";
  employeeName: any = " ";

  constructor(
    private auth: AuthStateService,
    private employeeService: AuthEmployeeService,
    private clientService: AuthClientsService,
    // private auths: AuthStateService,
    public router: Router,
    public tokenEmployee: TokenEmployeeService,
    public tokenClients: TokenClientsService,
  ) {

  }

  ngOnInit() {
    console.log('ngOninit');
    this.isSignedIn = false;
    this.auth.userAuthState.subscribe(val => {  
        console.log(val);
        this.isSignedIn = val;
        // if(!val) {
        //   console.log('redirigiendo');
        //   this.router.navigate(["/"]);
        // }else{
        //   this.employeeName = this.employeeService.currentEmployee? this.employeeService.currentEmployee : "mal asunto";
        //   console.log(this.employeeName);
        //   console.log("Estoy logueado");
        //  this.signedUserName().then((data) =>{
        //  this.employeeName = data;
        //  });
          
        // }
        
    });
   
 
    console.log('fin ngOninit');
    // this.auths.usersAuthState.subscribe(val => {
    //   console.log(val);
    //   this.isSignedIn = val;
    //   if(!val) {this.router.navigate(["/loginClient"]);}
    // });
  
  }

  // signedUserName(): Promise<any>{
  //   return new Promise( resolve=> {
  //     this.employeeService.getAuthenticateUser().subscribe(
  //       data=>{ 
  //         resolve(data.name);
  //       }

  //     );
  //   });
  // }
 

 
  // Signout
  signOut() {
    this.auth.setAuthState(false);
    this.tokenEmployee.removeToken();
    this.tokenClients.removeToken();
    this.router.navigate(['loginEmployee']);
    this.router.navigate(['loginClients']);
  }

}
