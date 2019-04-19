import {TestBed} from '@angular/core/testing';


import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {FFOverlayModule} from 'ff-overlay';
import {FFTooltipService} from './ff-tooltip.service';
import {FFTooltipComponent} from './ff-tooltip/ff-tooltip.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('FFModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FFTooltipComponent],
      imports: [BrowserAnimationsModule, FFOverlayModule]
    });
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [FFTooltipComponent]
      }
    });
  });

  it('should be created', () => {
    const service: FFTooltipService = TestBed.get(FFTooltipService);
    expect(service).toBeTruthy();
  });
});
