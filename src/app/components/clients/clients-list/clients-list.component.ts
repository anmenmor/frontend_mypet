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
  updateChild: boolean = false;
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





  
