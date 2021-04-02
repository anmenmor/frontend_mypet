  
import { TestBed } from '@angular/core/testing';

import { ClientsListService } from './clients-list.service';

describe('ClientsListService', () => {
  let service: ClientsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});