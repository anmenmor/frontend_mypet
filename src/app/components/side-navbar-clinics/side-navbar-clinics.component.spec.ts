import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavbarClinicsComponent } from './side-navbar-clinics.component';

describe('SideNavbarClinicsComponent', () => {
  let component: SideNavbarClinicsComponent;
  let fixture: ComponentFixture<SideNavbarClinicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideNavbarClinicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavbarClinicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
