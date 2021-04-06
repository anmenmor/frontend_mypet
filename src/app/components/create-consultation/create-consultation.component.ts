import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Consultation } from 'src/app/models/consultation';
import { Employee } from 'src/app/models/Employee';
import { PetService } from 'src/app/services/pet.service';
import { AuthEmployeeService } from 'src/app/shared/auth-employee.service';

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
  employee: Employee|null = null
  @Input() showComponent: boolean = false;
  @Output() creationEvent = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private petService: PetService,
    private authEmployeeService: AuthEmployeeService
  ) { }


  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.petId = params['petId'];
      });

      this.consultationForm = this.fb.group({
        comments: ['', Validators.required],
      });
      this.authEmployeeService.getCurrentEmployeeValue().subscribe((employee : Employee|null) => {
        this.employee = employee
    })
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  createConsultation() {
    this.submitted = true;
    if(!this.consultationForm.controls.comments.errors && this.employee) {
      const comments = this.consultationForm.value.comments;
      this.petService.createConsultation(this.petId, this.employee.id, comments).subscribe((data: Consultation) => {
        alert("La consulta ha sido añadida correctamente");
        this.creationEvent.emit();
      })
    }
    
  }

}
