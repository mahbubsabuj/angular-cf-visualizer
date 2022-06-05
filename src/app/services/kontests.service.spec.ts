import { TestBed } from '@angular/core/testing';

import { KontestsService } from './kontests.service';

describe('KontestsService', () => {
  let service: KontestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KontestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
