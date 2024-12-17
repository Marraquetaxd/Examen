import { TestBed } from '@angular/core/testing';
import { authGuard } from './auth.guard.service';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });
});
