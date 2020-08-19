import { TestBed } from '@angular/core/testing';

import { PnsInterInterceptorService } from './pns-inter-interceptor.service';

describe('PnsInterInterceptorService', () => {
  let service: PnsInterInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PnsInterInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
