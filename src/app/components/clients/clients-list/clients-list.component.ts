import { Component, OnInit } from '@angular/core';
import { Clients } from 'src/app/models/clients';
import { ClientsListService } from 'src/app/services/clients-list.service';


@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {
  clients: Clients[] | any;

  constructor(private clientsListService: ClientsListService) { }

  ngOnInit(): void {
    this.listClients;
  }
  listClients(): void {
    this.clientsListService.listClients().subscribe(data=>
      this.clients = data);
  }
 

}