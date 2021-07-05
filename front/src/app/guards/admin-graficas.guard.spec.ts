import { TestBed } from '@angular/core/testing';

import { AdminGraficasGuard } from './admin-graficas.guard';

describe('AdminGraficasGuard', () => {
  let guard: AdminGraficasGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminGraficasGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
