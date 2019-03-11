import { TestBed } from '@angular/core/testing';

import { FfShowPositionService } from './ff-position.service';

describe('FfShowPositionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FfShowPositionService = TestBed.get(FfShowPositionService);
    expect(service).toBeTruthy();
  });
});
