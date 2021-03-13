import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesLoginComponent } from './employees-login.component';

describe('EmployeesLoginComponent', () => {
  let component: EmployeesLoginComponent;
  let fixture: ComponentFixture<EmployeesLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
