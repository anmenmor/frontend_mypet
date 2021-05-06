import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Clients } from 'src/app/models/clients';
import { Consultation } from 'src/app/models/consultation';
import { Employee } from 'src/app/models/Employee';
import { PetService } from 'src/app/services/pet.service';
import { AuthEmployeeService } from 'src/app/shared/auth-employee.service';
import { AuthClientsService } from 'src/app/shared/auth-clients.service';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap'; 

@Component({
  selector: 'app-list-consultations',
  templateUrl: './list-consultations.component.html',
  styleUrls: ['./list-consultations.component.css'],
  providers: [NgbPaginationConfig]
})
export class ListConsultationsComponent implements OnInit {
  private routeSub: Subscription = Subscription.EMPTY;
  consultations: Consultation[] = [];
  petId: number = -1;
  showCreateComponent: boolean = false;
  employee: Employee|null = null;
  client: Clients|null = null;

  //Paginacion  
  totalItems: number = 0;
  page: number = 0;
  previousPage: number = 0;
  showPagination: boolean =false;
  pageSize: number = 0;

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    public authEmployeeService: AuthEmployeeService,
    public authClientService: AuthClientsService
  ) { }

  ngOnInit(): void {
    this.page =1;
	  this.previousPage =1;
    this.routeSub = this.route.params.subscribe(params => {
      this.petId = params['petId'];
  })
    this.getConsultations(this.page);

    this.authEmployeeService.getCurrentEmployeeValue().subscribe((employee : Employee|null) => {
        this.employee = employee;
    })

    this.authClientService.getCurrentClientValue().subscribe((client: Clients|null) => {
      this.client = client;
    })
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getConsultations(page: number):void {
    this.petService.getConsultationsPagination(this.petId, page).subscribe((data: any) => {
      if ((!data && !data.data) || (data && data.data && data.data.length == 0)) {
        this.consultations = [];
        this.showPagination = false;
      }
      else {
        this.consultations = data.data;
        this.totalItems = data.total;
        this.pageSize = data.per_page;
        this.showPagination = true;
      }
 
    })
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.getConsultations(this.page);
    }
  }

  onSelect(id: number): void {
    this.consultations = this.consultations.map(function(cons) {
      if(cons.id == id) {
        cons.visibility = !cons.visibility;
      }
      return cons
    }
    ) 
  }

  showComponent() {
    this.showCreateComponent = !this.showCreateComponent;
  }

  createHandler(): void {
    this.showCreateComponent = false;
    this.getConsultations(this.page);
  }

}
