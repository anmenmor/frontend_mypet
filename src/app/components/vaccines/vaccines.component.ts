import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Vaccine } from 'src/app/models/vaccine';
import { VaccinesService } from 'src/app/services/vaccines.service';

@Component({
  selector: 'app-vaccines',
  templateUrl: './vaccines.component.html',
  styleUrls: ['./vaccines.component.css']
})
export class VaccinesComponent implements OnInit {
  vaccines: Vaccine[] = [];

  newVaccineName: string = "";

  constructor(private vaccinesService: VaccinesService) { }

  ngOnInit(): void {
    this.listAllVaccines();
  }

  listAllVaccines():void {
    this.vaccinesService.listAllVaccines().subscribe((data: Vaccine[]) =>
      this.vaccines = data);
  }

  createVaccine():void {
    if (this.newVaccineName != "") {
    this.vaccinesService.createVaccine(this.newVaccineName).subscribe((data: Vaccine) => {
        alert("La vacuna ha sido añadida correctamente")
        this.newVaccineName = "";
        this.listAllVaccines();
    })
  }
}

}
