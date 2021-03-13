import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesLoginComponent } from './employees-login/employees-login.component';
import { EmployeesRegisterComponent } from  './employees-register/employees-register.component';


const routes: Routes = [
  {path: 'loginEmployee', component:EmployeesLoginComponent, pathMatch: 'full'},
  {path: 'registerEmployee', component:EmployeesRegisterComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
