import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsNavbarComponent } from './pets-navbar.component';

describe('PetsNavbarComponent', () => {
  let component: PetsNavbarComponent;
  let fixture: ComponentFixture<PetsNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetsNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
