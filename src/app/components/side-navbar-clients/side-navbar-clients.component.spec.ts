import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavbarClientsComponent } from './side-navbar-clients.component';

describe('SideNavbarClientsComponent', () => {
  let component: SideNavbarClientsComponent;
  let fixture: ComponentFixture<SideNavbarClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideNavbarClientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavbarClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
