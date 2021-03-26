import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Vaccination } from "src/app/models/vaccination.model";
import { VaccinationsService } from "src/app/services/vaccinations.service";

@Component({
  selector: 'app-vaccination-create',
  templateUrl: './vaccination-create.component.html',
  styleUrls: ['./vaccination-create.component.css']
})
export class VaccinationCreateComponent {
  addVaccination: any;
  htmlMsg!: String;

  constructor(private formBuilder: FormBuilder, private vaccinationService: VaccinationsService) {
      this.addVaccination = this.formBuilder.group({
      date: '',
      done: false,
      pet_id: '',
      vaccine_id: '',
    });
  }
  

  onSubmit(formData: Vaccination) {
    console.log(formData);
    this.vaccinationService
    .addVaccination(formData)
    .subscribe(
      (data) => (this.htmlMsg = "Vacunación añadida correctamente"),
      (exception) => (this.htmlMsg = exception.error.message)
    );
  }

}
