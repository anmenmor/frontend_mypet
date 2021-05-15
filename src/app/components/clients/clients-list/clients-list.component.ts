import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Clients } from 'src/app/models/clients';
import { AuthClientsService } from '../../../shared/auth-clients.service';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap'; 


@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css'],
  providers: [NgbPaginationConfig]
})

export class ClientsListComponent implements OnInit {
  clients: Clients[] | any;
  clientsSelectedList: Clients | any;
  submitted = false;
  loading = true;
  updateChild: boolean = false;

  //Paginacion  
  totalItems: number = 0;
  page: number = 0;
  previousPage: number = 0;
  showPagination: boolean = false;
  pageSize: number = 0;


   @Output() clientsSelectedEvent = new EventEmitter<Clients>();

  constructor(private clientsService: AuthClientsService) { }

  ngOnInit(): void {
    this.page =1;
	  this.previousPage =1;
    this.clients = [];
    this.listClients(this.page);
  }

  // Se comenta el contenido del método listClients para que no de error de compilación

  listClients(page: number): void {
    this.submitted = true;
    this.clientsService.listClients(page).subscribe(data=>
     {
      this.hideloader();
      if ((!data && !data.result) || (data && data.data && data.data.length == 0)) {
			  this.clients = [];
			  this.showPagination = false;
			}else{
        this.clients = Object.values(data.data)
        .map(clientsDB => new Clients(clientsDB));
        this.totalItems = data.total;
        this.pageSize = data.per_page;
        this.showPagination = true;
      }
      
    });
  }
  loadPage(page: number) {
    this.loading = true;
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.listClients(this.page);
    }
  }
  
    hideloader() {
      this.loading = false;
    }

  sendSelected(clients: Clients): void{
    this.updateChild = true;
    this.clientsSelectedList =  clients;
    this.clientsSelectedEvent.emit(clients);
  }

  deleteClients(id : number): void{
    this.clientsService.deleteClients(id).subscribe(
      (data)=>{
        let index: number = this.clients.findIndex((clients : Clients)=> clients.id === data.id);
        if(index !== -1){
            this.clients.splice(index,1);
            alert('usuario eliminado');
        }
      }
      );

     }
 
  hideUpdateChild(){
    this.updateChild = false;
  }
}





  
