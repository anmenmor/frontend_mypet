import { Component } from '@angular/core';
import { ClinicsDataService } from "../../services/clinics-data.service";

@Component({
  selector: 'app-clinics-update',
  templateUrl: './clinics-update.component.html',
  styleUrls: ['./clinics-update.component.css']
})
export class ClinicsUpdateComponent {

  constructor(private clinicsDataService: ClinicsDataService) { }

  onSubmit() {
    console.log();
 }

}
