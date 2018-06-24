import { TestBed, inject } from '@angular/core/testing';

import { SwService } from './sw.service';

describe('SwService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SwService]
    });
  });

  it('should be created', inject([SwService], (service: SwService) => {
    expect(service).toBeTruthy();
  }));
});
