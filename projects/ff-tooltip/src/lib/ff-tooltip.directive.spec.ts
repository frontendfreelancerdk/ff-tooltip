import {Component, ViewChild} from '@angular/core';

import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {FFTooltipDirective} from './ff-tooltip.directive';
import {FFOverlayModule} from 'ff-overlay';
import {FFTooltipComponent} from './ff-tooltip/ff-tooltip.component';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@Component({
  selector: 'container',
  template: `<input ffTooltip="text" #input="ffTooltip"
                    [ffTooltipDisabled]="true"
                    [ffTooltipHideDelay]="1500"
                    [ffTooltipShowDelay]="500"
                    [ffTooltipPosition]="'left'">`,
})
export class Container {
  @ViewChild('input', {static: true}) input;

  test() {
    console.log('input.value', this.input.text);
  }
}

describe('Directive: FFValidationDirective', () => {
  let fixture;
  let container;
  let directiveEl;
  let directiveInstance;

  //setup
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Container, FFTooltipDirective, FFTooltipComponent],
      imports: [BrowserAnimationsModule, FFOverlayModule]
    });
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [FFTooltipComponent]
      }
    });
    fixture = TestBed.createComponent(Container);
    directiveEl = fixture.debugElement.query(By.directive(FFTooltipDirective));
    directiveInstance = directiveEl.injector.get(FFTooltipDirective);
    container = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
    fixture.destroy();
    container = null;
  });

  //specs
  it('should create', () => {
    expect(directiveEl).not.toBeNull();
  });
  it('should have correct values', () => {
    expect(directiveInstance.text).toBe('text');
    expect(directiveInstance.position).toBe('left');
    expect(directiveInstance.showDelay).toBe(500);
    expect(directiveInstance.hideDelay).toBe(1500);
    expect(directiveInstance.disabled).toBe(true);
  });

  it('should react to mouse events', () => {
    fixture.whenStable().then(() => {
      const el = directiveEl.nativeElement;
      directiveInstance.disabled = false;
      directiveInstance.showDelay = 0;
      directiveInstance.hideDelay = 0;
      el.dispatchEvent(new Event('mouseenter'));
      expect(directiveInstance.isTooltipVisible()).toBe(true);

      el.dispatchEvent(new Event('mouseleave'));
      expect(directiveInstance.isTooltipVisible()).toBe(false);
    });
  });
  it('should react to show/hide/toggle methods', fakeAsync(() => {
    fixture.whenStable().then(() => {
      directiveInstance.disabled = false;
      directiveInstance.show();
      expect(directiveInstance.tooltip.instance.isVisible()).toBe(false);
      tick(500);
      expect(directiveInstance.tooltip.instance.isVisible()).toBe(true);
      directiveInstance.hide();
      expect(directiveInstance.tooltip.instance.isVisible()).toBe(true);
      tick(1500);
      expect(directiveInstance.tooltip.instance.isVisible()).toBe(false);
      directiveInstance.toggle();
      tick(500);
      expect(directiveInstance.tooltip.instance.isVisible()).toBe(true);
    });
  }));
});
