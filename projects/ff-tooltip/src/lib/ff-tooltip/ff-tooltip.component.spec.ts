import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FfTooltipComponent } from './ff-tooltip.component';

describe('FfTooltipComponent', () => {
  let component: FfTooltipComponent;
  let fixture: ComponentFixture<FfTooltipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FfTooltipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FfTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
