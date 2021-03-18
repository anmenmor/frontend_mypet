import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/auth.interceptor';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesLoginComponent } from './components/employees/employees-login/employees-login.component';
import { EmployeesRegisterComponent } from './components/employees/employees-register/employees-register.component';
import { ClinicsDataComponent } from './clinics/components/clinics-data/clinics-data.component';
import { ClinicsDataService } from './clinics/services/clinics-data.service';
import { EmployeesListComponent } from './components/employees/employees-list/employees-list.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesLoginComponent,
    EmployeesRegisterComponent,
    ClinicsDataComponent,
    EmployeesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
    },
    ClinicsDataService
],
  bootstrap: [AppComponent],
})
export class AppModule { }
