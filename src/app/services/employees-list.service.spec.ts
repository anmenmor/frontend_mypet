import { TestBed } from '@angular/core/testing';

import { EmployeesListService } from './employees-list.service';

describe('EmployeesListService', () => {
  let service: EmployeesListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeesListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
