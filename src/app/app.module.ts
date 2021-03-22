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
import { ClinicsListComponent } from './clinics/components/clinics-list/clinics-list.component';
import { ClinicsUpdateComponent } from './clinics/components/clinics-update/clinics-update.component';
import { ClinicsDataService } from './clinics/services/clinics-data.service';
import { EmployeesListComponent } from './components/employees/employees-list/employees-list.component';
import { VaccinesComponent } from './components/vaccines/vaccines.component';
import { NavbarClinicsComponent } from './components/navbar-clinics/navbar-clinics.component';
import { CreatePetComponent } from './components/create-pet/create-pet.component';
import { ListPetsComponent } from './components/list-pets/list-pets.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesLoginComponent,
    EmployeesRegisterComponent,
    ClinicsListComponent,
    ClinicsUpdateComponent,
    EmployeesListComponent,
    VaccinesComponent,
    NavbarClinicsComponent,
    CreatePetComponent,
    ListPetsComponent
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
