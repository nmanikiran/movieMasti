import { TestBed, inject } from '@angular/core/testing';

import { MovieDBService } from './movie-db.service';

describe('MovieDBService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieDBService]
    });
  });

  it('should be created', inject([MovieDBService], (service: MovieDBService) => {
    expect(service).toBeTruthy();
  }));
});
