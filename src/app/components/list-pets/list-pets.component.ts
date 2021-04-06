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

@Component({
  selector: 'app-list-pets',
  templateUrl: './list-pets.component.html',
  styleUrls: ['./list-pets.component.css']
})

export class ListPetsComponent implements OnInit {
  private routeSub: Subscription = Subscription.EMPTY;
  pets: Pet[] = [];
  clientId: number = -1;

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private authEmployeeService: AuthEmployeeService,
    private authClientService: AuthClientsService
  ) { }

  ngOnInit(): void {
    this.authEmployeeService.getCurrentEmployeeValue().subscribe((employee : Employee|null) => {
      if(employee) {
        this.routeSub = this.route.params.subscribe(params => {
          this.clientId = params['clientId'];
          this.listAllPets()
      })}
    })
    this.authClientService.getCurrentClientValue().subscribe((client : Clients|null) => {
      if(client) {
          this.clientId = client.id;
          this.listAllPets()
    }})
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("Cambios: ", changes)
  }

ngOnDestroy() {
  this.routeSub.unsubscribe();
}

listAllPets():void {
  this.petService.listAllPets(this.clientId).subscribe((data: Pet[]) => {
    this.pets = Object.values(data);
  })
  
}

}
