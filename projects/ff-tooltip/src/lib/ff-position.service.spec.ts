import { TestBed } from '@angular/core/testing';

import { FFPositionService } from './ff-position.service';

describe('FFPositionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FFPositionService = TestBed.get(FFPositionService);
    expect(service).toBeTruthy();
  });
});
