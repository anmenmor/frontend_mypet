import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Consultation } from 'src/app/models/consultation';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-create-consultation',
  templateUrl: './create-consultation.component.html',
  styleUrls: ['./create-consultation.component.css']
})
export class CreateConsultationComponent implements OnInit {
  private routeSub: Subscription = Subscription.EMPTY;
  consultationForm: FormGroup;
  petId: number = -1;
  submitted = false;
  @Input() showComponent: boolean = false;
  @Output() creationEvent = new EventEmitter();
  employeeId: number = 61;

  constructor(
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private petService: PetService,
  ) { }


  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.petId = params['petId'];
      });

      this.consultationForm = this.fb.group({
        comments: ['', Validators.required],
      });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  createConsultation() {
    console.log(this.consultationForm.controls)
    this.submitted = true;
    if(!this.consultationForm.controls.comments.errors) {
      const comments = this.consultationForm.value.comments;
      this.petService.createConsultation(this.petId, this.employeeId, comments).subscribe((data: Consultation) => {
        alert("La consulta ha sido añadida correctamente");
        this.creationEvent.emit();
      })
    }
    
  }

}
