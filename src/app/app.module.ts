import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesLoginComponent } from './employees-login/employees-login.component';
import { EmployeesRegisterComponent } from './employees-register/employees-register.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesLoginComponent,
    EmployeesRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
