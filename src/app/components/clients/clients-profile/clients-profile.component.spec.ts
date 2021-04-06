import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsProfileComponent } from './clients-profile.component';

describe('ClientsProfileComponent', () => {
  let component: ClientsProfileComponent;
  let fixture: ComponentFixture<ClientsProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
