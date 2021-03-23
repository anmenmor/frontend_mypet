import { TestBed } from '@angular/core/testing';

import { ClinicsDataService } from './clinics-data.service';

describe('ClinicsDataService', () => {
  let service: ClinicsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClinicsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
