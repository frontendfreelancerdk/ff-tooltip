import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FFTooltipComponent} from './ff-tooltip.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('FFTooltipComponent', () => {
  let component: FFTooltipComponent;
  let fixture: ComponentFixture<FFTooltipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FFTooltipComponent],
      imports: [BrowserAnimationsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FFTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
