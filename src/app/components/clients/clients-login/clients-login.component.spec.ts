import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsLoginComponent } from './clients-login.component';

describe('ClientsLoginComponent', () => {
  let component: ClientsLoginComponent;
  let fixture: ComponentFixture<ClientsLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
