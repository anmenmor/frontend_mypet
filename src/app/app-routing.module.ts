import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EmployeesLoginComponent } from './components/employees/employees-login/employees-login.component';
import { EmployeesRegisterComponent } from  './components/employees/employees-register/employees-register.component';
import { ClinicsListComponent } from './components/clinics/clinics-list/clinics-list.component';
import { ClinicsUpdateComponent } from './components/clinics/clinics-update/clinics-update.component';
import { EmployeesListComponent } from './components/employees/employees-list/employees-list.component';
import { VaccinesComponent } from './components/vaccines/vaccines.component';
import { CreatePetComponent } from './components/create-pet/create-pet.component';
import { ListPetsComponent } from './components/list-pets/list-pets.component';
import { ClientsLoginComponent } from './components/clients/clients-login/clients-login.component';
import { ClientsRegisterComponent } from  './components/clients/clients-register/clients-register.component';
import { ClientsListComponent } from './components/clients/clients-list/clients-list.component';
import { ClientsEditComponent } from './components/clients/clients-edit/clients-edit.component';
import { SideNavbarClientsComponent} from './components/side-navbar-clients/side-navbar-clients.component';
import { VaccinationsComponent } from './components/vaccinations/vaccination-list/vaccinations.component';
import { VaccinationUpdateComponent } from './components/vaccinations/vaccination-update/vaccination-update.component';
import { VaccinationCreateComponent } from './components/vaccinations/vaccination-create/vaccination-create.component';
import { EmployeesUpdateComponent} from  './components/employees/employees-update/employees-update.component';
import { PetDetailComponent } from './components/pet-detail/pet-detail.component';
import { SideNavbarClinicsComponent} from './components/side-navbar-clinics/side-navbar-clinics.component';
import { DatesComponent } from './components/dates/dates.component';
import { CreateDateComponent } from './components/dates/create-date/create-date.component';



const routes: Routes = [
  
  {path: '',component:HomeComponent, pathMatch:'full'},
  {path: 'loginEmployee', component:EmployeesLoginComponent, pathMatch: 'full'},
  {path: 'registerEmployee', component:EmployeesRegisterComponent, pathMatch: 'full'},
  {path: 'clinics', component:ClinicsListComponent, pathMatch: 'full'},
  {path: 'clinics/updateClinic', component:ClinicsUpdateComponent, pathMatch: 'full'},
  {path: 'clinics/updateClinic/:id', component:ClinicsUpdateComponent, pathMatch: 'full'},
  {path: 'employees', component:EmployeesListComponent, pathMatch: 'full'},
  {path: 'vaccines', component:VaccinesComponent, pathMatch: 'full'},
  {path: 'clients/:clientId/pets/createPet', component: CreatePetComponent, pathMatch: 'full'},
  {path: 'clients/:clientId/pets', component: ListPetsComponent, pathMatch: 'full'},
  {path: 'clients/:clientId/pets/:petId', component: PetDetailComponent, pathMatch: 'full'},
  {path: 'loginClients', component:ClientsLoginComponent, pathMatch: 'full'},
  {path: 'registerClients', component:ClientsRegisterComponent, pathMatch: 'full'},
  {path: 'clientsList', component:ClientsListComponent, pathMatch: 'full'},
  {path: 'clients/:clientsId/update', component:ClientsEditComponent, pathMatch: 'full'},
  {path: 'clients/main', component: SideNavbarClientsComponent, pathMatch: 'full'},
  {path: 'vaccinations', component:VaccinationsComponent, pathMatch: 'full'},
  {path: 'vaccinations/addVaccination', component:VaccinationCreateComponent, pathMatch: 'full'},
  {path: 'vaccinations/addVaccination/clients/:clientId', component:VaccinationCreateComponent, pathMatch: 'full'},
  {path: 'vaccinations/addVaccination/pets/:petId', component:VaccinationCreateComponent, pathMatch: 'full'},
  {path: 'vaccinations/updateVaccination/:id', component:VaccinationUpdateComponent, pathMatch: 'full'},
  {path: 'vaccinations/updateVaccination/pets/:petId', component:VaccinationUpdateComponent, pathMatch: 'full'},
  {path: 'employees/:employeeId/update', component: EmployeesUpdateComponent, pathMatch: 'full'},
  {path: 'clinics/main', component: SideNavbarClinicsComponent, pathMatch: 'full'},
  {path: 'dates', component: DatesComponent, pathMatch: 'full'},
  {path: 'dates/addDate', component: CreateDateComponent, pathMatch: 'full'},
  {path: 'dates/addDate/clients/:clientId', component:CreateDateComponent, pathMatch: 'full'},
  {path: 'dates/addDate/pets/:petId', component: CreateDateComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
