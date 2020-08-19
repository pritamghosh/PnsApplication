import { TestBed } from '@angular/core/testing';

import { PnsErrorService } from './pns-error.service';

describe('PnsErrorService', () => {
  let service: PnsErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PnsErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
