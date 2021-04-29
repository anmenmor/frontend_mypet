import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Pet } from 'src/app/models/pet';
import { PetService } from 'src/app/services/pet.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthEmployeeService } from 'src/app/shared/auth-employee.service';
import { TokenEmployeeService } from 'src/app/shared/token-employee.service';
import { Employee } from 'src/app/models/Employee';
import { AuthClientsService } from 'src/app/shared/auth-clients.service';
import { Clients } from 'src/app/models/clients';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-pets',
  templateUrl: './list-pets.component.html',
  styleUrls: ['./list-pets.component.css'],
  providers: [NgbPaginationConfig]
})

export class ListPetsComponent implements OnInit {
  private routeSub: Subscription = Subscription.EMPTY;
  pets: Pet[] = [];
  clientId: number = -1;
  loggedClient: boolean = false;
  employee: Employee | null = null;

  //Paginacion  
  totalItems: number = 0;
  page: number = 0;
  previousPage: number = 0;
  showPagination: boolean = false;
  pageSize: number = 0;

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private authEmployeeService: AuthEmployeeService,
    private authClientService: AuthClientsService
  ) { }

  ngOnInit(): void {
    this.page = 1;
    this.previousPage = 1;
    this.showPagination = true;

    this.authEmployeeService.getCurrentEmployeeValue().subscribe((employee: Employee | null) => {
      if (employee) {
        this.employee = employee;
        this.routeSub = this.route.params.subscribe(params => {
          this.clientId = params['clientId'];
          this.listAllPets(this.page)
        })
      }
    })
    this.authClientService.getCurrentClientValue().subscribe((client: Clients | null) => {
      if (client) {
        this.loggedClient = true;
        this.clientId = client.id;
        this.listAvailablePets(this.page)
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("Cambios: ", changes)
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  listAllPets(page: number): void {
    console.log('me meto qi');
    this.petService.listAllPetsPagination(this.clientId, page).subscribe((data: any) => {
      console.log(data);
      if ((!data && !data.data) || (data && data.data && data.data.length == 0)) {
        this.pets = [];
        this.showPagination = false;
      } else {
        this.pets = Object.values(data.data);
        this.totalItems = data.total;
        this.pageSize = data.per_page;
        this.showPagination = true;
      }
      // this.pets = Object.values(data);
    })
  }

  listAvailablePets(page: number): void {
    this.petService.listAvailablePetsPagination(this.clientId, page).subscribe((data: any) => {
      // this.pets = Object.values(data);
      if ((!data && !data.data) || (data && data.data && data.data.length == 0)) {
        this.pets = [];
        this.showPagination = false;
      } else {
        this.pets = Object.values(data.data);
        this.totalItems = data.total;
        this.pageSize = data.per_page;
        this.showPagination = true;
      }
    })
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      if(this.employee){
        console.log('empleado');
        this.listAllPets(this.page);
      }
      if(this.loggedClient){
        console.log('cliente');
        this.listAvailablePets(this.page);
      }
     
    }
  }

}
