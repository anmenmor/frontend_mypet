import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Pet } from "src/app/models/pet";
import { PetService } from "src/app/services/pet.service";
import { Vaccination } from "src/app/models/vaccination.model";
import { Vaccine } from "src/app/models/vaccine";
import { VaccinesService } from "src/app/services/vaccines.service";
import { VaccinationsService } from "src/app/services/vaccinations.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthClientsService } from "src/app/shared/auth-clients.service";
import { Subscription } from "rxjs";
import { AuthEmployeeService } from "src/app/shared/auth-employee.service";
import { Employee } from "src/app/models/Employee";
import { Clients } from 'src/app/models/clients';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap'; 

@Component({
  selector: "app-vaccinations",
  templateUrl: "./vaccinations.component.html",
  styleUrls: ["./vaccinations.component.css"],
  providers: [NgbPaginationConfig]
})
export class VaccinationsComponent implements OnInit {
  private routeSub: Subscription = Subscription.EMPTY;
  // vaccinations: Array<Vaccination> = [];
  vaccinations: Vaccination[] = [];
  currentEmployee: Employee | null = null;
  client: Clients|null = null;
  petId = 0;
  clientId = 0;

  //Paginacion  
  totalItems: number = 0;
  page: number = 0;
  previousPage: number = 0;
  showPagination: boolean =false;
  pageSize: number = 0;

  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private vaccinationService: VaccinationsService,
    private authEmployeeService: AuthEmployeeService,
    private authClientService: AuthClientsService
  ) {}

  ngOnInit() :void {
    this.page =1;
	  this.previousPage =1;
    this.vaccinations = [];
    this.routeSub = this.route.params.subscribe((params) => {
      this.petId = params["petId"];
      this.clientId = params["clientId"];
      this.getVaccinationsByPetId(this.petId, this.page);
    });
    this.authEmployeeService
      .getCurrentEmployeeValue()
      .subscribe((employee: Employee | null) => {
        this.currentEmployee = employee;
      });

      this.authClientService.getCurrentClientValue().subscribe((client: Clients|null) => {
        this.client = client;
      })
  }

  getVaccinationsByPetId(petId: number, page: number) {
    this.vaccinationService.listVaccinationByPetIdPaginate(petId, page).subscribe((data) => {
      if ((!data && !data.data) || (data && data.data && data.data.length == 0)) {
        this.vaccinations = [];
        this.showPagination = false;
      }
      else {
        console.log(data);
        this.vaccinations = data.data;
        this.totalItems = data.total;
        this.pageSize = data.per_page;
        this.showPagination = true;
      }
   
    });
  
  
  }
  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.getVaccinationsByPetId(this.petId, this.page);
    }
  }

  addVaccination() {
    if (this.petId > 0) {
      this.router.navigate(["vaccinations/addVaccination/pets/", this.petId]);
    } else if (this.clientId > 0) {
      this.router.navigate([
        "vaccinations/addVaccination/clients/",
        this.clientId,
      ]);
    }
  }

  return() {
    this._location.back();
  }
}
