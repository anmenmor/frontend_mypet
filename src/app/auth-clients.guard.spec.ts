import { TestBed } from '@angular/core/testing';

import { AuthClientsGuard } from './auth-clients.guard';

describe('AuthClientsGuard', () => {
  let guard: AuthClientsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthClientsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
