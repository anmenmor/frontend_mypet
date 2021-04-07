import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pet } from 'src/app/models/pet';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.css']
})
export class PetDetailComponent implements OnInit {
  private routeSub: Subscription = Subscription.EMPTY;
  petDetailForm: FormGroup;
  petId: number = -1;

  constructor(
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private petService: PetService,
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.petId = params['petId'];
  })

  this.petDetailForm = this.fb.group({
    name: ['', Validators.required],
    sex: ['', Validators.required],
    weight: ['', Validators.required],
    age: ['', Validators.required], 
    species: ['', Validators.required],
    breed: ['', Validators.required],
  });

  this.petService.getPetDetail(this.petId).subscribe((data:Pet) => {
    let pet = data
    this.petDetailForm = this.fb.group({
      name: [pet.name, Validators.required],
      sex: [pet.sex, Validators.required],
      weight: [pet.weight, Validators.required],
      age: [pet.age, Validators.required], 
      species: [pet.species, Validators.required],
      breed: [pet.breed, Validators.required],
    });
  });
}

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  updatePet() {
    const controls = this.petDetailForm.controls
    if (!controls.name.errors && !controls.sex.errors && !controls.weight.errors
      && !controls.age.errors && !controls.species.errors &&
      !controls.breed.errors){
       const pet: Pet = this.petDetailForm.value;
       try {
        this.petService.updatePet(pet, this.petId).subscribe((data: Pet) =>
        alert("La mascota ha sido modificada correctamente")
       )
      } catch (e) {
        this.petService.getPetDetail(this.petId).subscribe((data:Pet) => {
          let pet = data
          this.petDetailForm = this.fb.group({
            name: [pet.name, Validators.required],
            sex: [pet.sex, Validators.required],
            weight: [pet.weight, Validators.required],
            age: [pet.age, Validators.required], 
            species: [pet.species, Validators.required],
            breed: [pet.breed, Validators.required],
          });
        });
       }
       
    }
  }

}
