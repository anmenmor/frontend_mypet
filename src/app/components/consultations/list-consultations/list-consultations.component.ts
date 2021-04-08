import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Clients } from 'src/app/models/clients';
import { Consultation } from 'src/app/models/consultation';
import { Employee } from 'src/app/models/Employee';
import { PetService } from 'src/app/services/pet.service';
import { AuthEmployeeService } from 'src/app/shared/auth-employee.service';

@Component({
  selector: 'app-list-consultations',
  templateUrl: './list-consultations.component.html',
  styleUrls: ['./list-consultations.component.css']
})
export class ListConsultationsComponent implements OnInit {
  private routeSub: Subscription = Subscription.EMPTY;
  consultations: Consultation[] = [];
  petId: number = -1;
  showCreateComponent: boolean = false;
  employee: Employee|null = null

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    public authEmployeeService: AuthEmployeeService
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.petId = params['petId'];
  })
    this.getConsultations();

    this.authEmployeeService.getCurrentEmployeeValue().subscribe((employee : Employee|null) => {
        this.employee = employee
    })
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getConsultations():void {
    this.petService.getConsultations(this.petId).subscribe((data: Consultation[]) => {
      this.consultations = data;
    })
  }

  onSelect(id: number): void {
    this.consultations = this.consultations.map(function(cons) {
      if(cons.id == id) {
        cons.visibility = !cons.visibility;
      }
      return cons
    }
    ) 
  }

  showComponent() {
    this.showCreateComponent = !this.showCreateComponent;
  }

  createHandler(): void {
    this.showCreateComponent = false;
    this.getConsultations();
  }

}
