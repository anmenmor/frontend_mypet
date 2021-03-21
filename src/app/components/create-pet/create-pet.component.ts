import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Pet } from 'src/app/models/pet';
import { PetService } from 'src/app/services/pet.service';


@Component({
  selector: 'app-create-pet',
  templateUrl: './create-pet.component.html',
  styleUrls: ['./create-pet.component.css']
})
export class CreatePetComponent implements OnInit {
  private routeSub: Subscription = Subscription.EMPTY;
  petForm: FormGroup;
  submitted = false;
  clientId: number = -1;

  constructor(
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private PetService: PetService,
    ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
    this.clientId = params['clientId'];
    });

    this.petForm = this.fb.group({
      name: ['', Validators.required],
      sex: ['', Validators.required],
      weight: ['', Validators.required],
      age: ['', Validators.required], 
      species: ['', Validators.required],
      breed: ['', Validators.required],
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  createPet() {
    this.submitted = true;
    const controls = this.petForm.controls
    if (!controls.name.errors && !controls.sex.errors && !controls.weight.errors
      && !controls.age.errors && !controls.species.errors &&
      !controls.breed.errors){
       const pet: Pet = this.petForm.value;
       this.PetService.createPet(pet, this.clientId).subscribe((data: Pet) =>
        alert("La mascota ha sido añadida correctamente")
       )
    }
    
    
  }

}
