import { TestBed } from '@angular/core/testing';

import { BusyDisplayService } from './busy-display.service';

describe('BusyDisplayService', () => {
  let service: BusyDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusyDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
