import { Component, Input, OnInit } from '@angular/core';
import { Consultation } from 'src/app/models/consultation';

@Component({
  selector: 'app-consultation-detail',
  templateUrl: './consultation-detail.component.html',
  styleUrls: ['./consultation-detail.component.css']
})
export class ConsultationDetailComponent implements OnInit {
  @Input() consultation: Consultation;

  constructor() { }

  ngOnInit(): void {
  }

}
