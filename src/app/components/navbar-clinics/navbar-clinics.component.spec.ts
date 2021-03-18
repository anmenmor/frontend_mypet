import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarClinicsComponent } from './navbar-clinics.component';

describe('NavbarClinicsComponent', () => {
  let component: NavbarClinicsComponent;
  let fixture: ComponentFixture<NavbarClinicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarClinicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarClinicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
