import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicsProfileComponent } from './clinics-profile.component';

describe('ClinicsProfileComponent', () => {
  let component: ClinicsProfileComponent;
  let fixture: ComponentFixture<ClinicsProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicsProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
