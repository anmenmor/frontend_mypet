import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationCreateComponent } from './vaccination-create.component';

describe('VaccinationCreateComponent', () => {
  let component: VaccinationCreateComponent;
  let fixture: ComponentFixture<VaccinationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinationCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccinationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
