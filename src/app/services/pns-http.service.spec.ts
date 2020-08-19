import { TestBed } from '@angular/core/testing';

import { PnsHttpService } from './pns-http.service';

describe('PnsHttpService', () => {
  let service: PnsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PnsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
