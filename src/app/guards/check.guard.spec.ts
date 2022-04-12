import { TestBed } from '@angular/core/testing';

import { CheckGuard } from './check.guard';

describe('CheckGuard', () => {
  let guard: CheckGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
