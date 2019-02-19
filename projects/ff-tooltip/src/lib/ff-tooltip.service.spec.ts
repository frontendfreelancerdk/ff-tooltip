import { TestBed } from '@angular/core/testing';

import { FFTooltipService } from './ff-tooltip.service';

describe('FFTooltipService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FFTooltipService = TestBed.get(FFTooltipService);
    expect(service).toBeTruthy();
  });
});
