import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicsUpdateComponent } from './clinics-update.component';

describe('ClinicsUpdateComponent', () => {
  let component: ClinicsUpdateComponent;
  let fixture: ComponentFixture<ClinicsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicsUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
