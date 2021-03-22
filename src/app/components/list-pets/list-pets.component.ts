import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/models/pet';
import { PetService } from 'src/app/services/pet.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

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
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.clientId = params['clientId'];
  })
   this.listAllPets()
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
