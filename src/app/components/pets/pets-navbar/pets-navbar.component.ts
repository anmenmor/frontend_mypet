import { Component, OnInit } from '@angular/core';
import { AuthEmployeeService } from 'src/app/shared/auth-employee.service';
import { Employee } from 'src/app/models/Employee';

@Component({
  selector: 'app-pets-navbar',
  templateUrl: './pets-navbar.component.html',
  styleUrls: ['./pets-navbar.component.css']
})
export class PetsNavbarComponent implements OnInit {
  employee: Employee|null = null;

  constructor(
    public authEmployeeService: AuthEmployeeService,
  ) { }

  ngOnInit(): void {
    this.authEmployeeService.getCurrentEmployeeValue().subscribe((employee : Employee|null) => {
      this.employee = employee;
  })
  }

}
