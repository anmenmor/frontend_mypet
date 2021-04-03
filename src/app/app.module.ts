import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./shared/auth.interceptor";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { EmployeesLoginComponent } from "./components/employees/employees-login/employees-login.component";
import { EmployeesRegisterComponent } from "./components/employees/employees-register/employees-register.component";
import { ClinicsListComponent } from "./components/clinics/clinics-list/clinics-list.component";
import { ClinicsUpdateComponent } from "./components/clinics/clinics-update/clinics-update.component";
import { ClinicsDataService } from "./services/clinics-data.service";
import { EmployeesListComponent } from "./components/employees/employees-list/employees-list.component";
import { VaccinesComponent } from "./components/vaccines/vaccines.component";
import { NavbarClinicsComponent } from "./components/navbar-clinics/navbar-clinics.component";
import { CreatePetComponent } from "./components/create-pet/create-pet.component";
import { ListPetsComponent } from "./components/list-pets/list-pets.component";
import { ClientsLoginComponent } from "./components/clients/clients-login/clients-login.component";
import { ClientsRegisterComponent } from "./components/clients/clients-register/clients-register.component";
import { ClientsListComponent } from "./components/clients/clients-list/clients-list.component";
import { ClientsEditComponent } from "./components/clients/clients-edit/clients-edit.component";
import { VaccinationsComponent } from "./components/vaccinations/vaccination-list/vaccinations.component";
import { VaccinationUpdateComponent } from "./components/vaccinations/vaccination-update/vaccination-update.component";
import { EmployeesUpdateComponent } from "./components/employees/employees-update/employees-update.component";
import { VaccinationCreateComponent } from "./components/vaccinations/vaccination-create/vaccination-create.component";
import { PetDetailComponent } from "./components/pet-detail/pet-detail.component";
import { HomeComponent } from "./components/home/home.component";
import { FooterComponent } from "./components/footer/footer.component";
import { SideNavbarClinicsComponent } from "./components/side-navbar-clinics/side-navbar-clinics.component";
import { SideNavbarClientsComponent } from "./components/side-navbar-clients/side-navbar-clients.component";
import { DatesComponent } from "./components/dates/dates.component";
import { CreateDateComponent } from "./components/dates/create-date/create-date.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClinicsProfileComponent } from './components/clinics/clinics-profile/clinics-profile.component';

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
    ListPetsComponent,
    ClientsLoginComponent,
    ClientsRegisterComponent,
    ClientsListComponent,
    ClientsEditComponent,
    VaccinationsComponent,
    EmployeesUpdateComponent,
    VaccinationUpdateComponent,
    VaccinationCreateComponent,
    PetDetailComponent,
    HomeComponent,
    FooterComponent,
    SideNavbarClinicsComponent,
    SideNavbarClientsComponent,
    DatesComponent,
    CreateDateComponent,
    ClinicsProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    ClinicsDataService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
