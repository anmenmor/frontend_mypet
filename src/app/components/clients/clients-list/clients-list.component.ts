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
  clientsSelectedList: Clients | any;
  submitted = false;
  
  // Añadido import: EventEmmiter y Output
  
  @Output() clientsSelectedEvent = new EventEmitter<Clients>();

  constructor(private clientsService: AuthClientsService) { }

  ngOnInit(): void {
    this.clients = [];
    this.listClients();
  }

  // Se comenta el contenido del método listClients para que no de error de compilación

  listClients(): void {
    this.submitted = true;
    this.clientsService.listClients().subscribe(data=>
     {
        this.clients = Object.values(data).map(clientsDB => new Clients(clientsDB));
    });
  }



  sendSelected(clients: Clients): void{
    console.log(clients);
  
    this.clientsSelectedList =  clients;
    this.clientsSelectedEvent.emit(clients);
  }
 

}





  
