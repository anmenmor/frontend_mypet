import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesLoginComponent } from './components/employees/employees-login/employees-login.component';
import { EmployeesRegisterComponent } from './components/employees/employees-register/employees-register.component';
import { ClinicsDataComponent } from './components/clinics-data/clinics-data.component';
import { ClinicsDataService } from './components/clinics-data/clinics-data.service';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesLoginComponent,
    EmployeesRegisterComponent,
    ClinicsDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ClinicsDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
