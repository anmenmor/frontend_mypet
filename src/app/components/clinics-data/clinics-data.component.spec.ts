import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicsDataComponent } from './clinics-data.component';

describe('ClinicsDataComponent', () => {
  let component: ClinicsDataComponent;
  let fixture: ComponentFixture<ClinicsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicsDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
