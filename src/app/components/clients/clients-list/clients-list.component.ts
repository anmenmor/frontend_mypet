import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  
  // Añadido import: EventEmmiter y Output
  
  @Output() clientsSelectedEvent = new EventEmitter<Clients>();

  constructor(private clientsListService: AuthClientsService) { }

  ngOnInit(): void {
    this.clients = [];
    this.listClients;
  }

  // Se comenta el contenido del método listClients para que no de error de compilación

  listClients(): void {
    this.submitted = true;
    //this.clientsListService.listClients().subscribe(data=>
      //this.clients = Object.values(data)
      //  .map(clientsDB => new Clients(clientsDB));
    };

// Eliminado un } aquí que hacía terminar el componente 

  sendSelected(clients: Clients): void{
    console.log(clients);
  
    this.clientsSelected =  clients;
    this.clientsSelectedEvent.emit(clients);
  }
 

}

  