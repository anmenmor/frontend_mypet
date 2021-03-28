import { Component, OnInit } from '@angular/core';
import { Clients } from 'src/app/models/clients';
import { AuthClientsService } from '../../../shared/auth-clients.service';


@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})

export class ClientsListComponent implements OnInit {
  clients: Clients[] | any;
  clientsSelected: Clients | any;
  submitted = false;
  
  @Output() clientsSelectedEvent = new EventEmitter<Clients>();

  constructor(private clientsListService: AuthClientsService) { }

  ngOnInit(): void {
    this.clients = [];
    this.listClients;
  }
  listClients(): void {
    this.submitted = true;
    this.clientsListService.listClients().subscribe(data=>
      this.clients = Object.values(data)
        .map(clientsDB => new Clients(clientsDB));
      });
  }

  sendSelected(clients: Clients): void{
    console.log(clients);
  
    this.clientsSelected =  clients;
    this.clientsSelectedEvent.emit(clients);
  }
 

}

  