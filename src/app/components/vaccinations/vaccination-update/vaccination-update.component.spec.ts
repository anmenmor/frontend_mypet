import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationUpdateComponent } from './vaccination-update.component';

describe('VaccinationUpdateComponent', () => {
  let component: VaccinationUpdateComponent;
  let fixture: ComponentFixture<VaccinationUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinationUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccinationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
