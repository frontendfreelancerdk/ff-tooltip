import {
  AfterViewInit,
  Directive,
  ElementRef, EmbeddedViewRef,
  HostListener,
  Input, OnDestroy,
} from '@angular/core';
import {FFTooltipComponent} from './ff-tooltip/ff-tooltip.component';
import {FFTooltipService} from './ff-tooltip.service';

export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipDefaultOptions {
  disabled: boolean;
  text: string;
  showDelay: number;
  hideDelay: number;
  position: TooltipPosition;
  target?: any;
}

@Directive({
  selector: '[ffTooltip]',
  exportAs: 'ffTooltip'
})
export class FFTooltipDirective implements AfterViewInit, OnDestroy {
  private tooltip: any;
  private _defaultOptions: TooltipDefaultOptions = {
    disabled: false,
    text: '',
    showDelay: 0,
    hideDelay: 0,
    position: 'top',
    target: null
  };
  private _disabled = this._defaultOptions.disabled;
  private _position: TooltipPosition = this._defaultOptions.position;
  private _text = this._defaultOptions.text;
  private _showDelay = this._defaultOptions.showDelay;
  private _hideDelay = this._defaultOptions.hideDelay;
  private _tooltipInstance: any;
  private _showTimeoutId: any;
  private _hideTimeoutId: any;

  get hideDelay(): number {
    return this._hideDelay;
  }

  get text(): string {
    return this._text;
  }

  get showDelay(): number {
    return this._showDelay;
  }

  get disabled(): boolean {
    return this._disabled;
  }

  get position(): TooltipPosition {
    return this._position;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.show();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.hide();
  }

  @Input('ffTooltip') set text(text: string) {
    this._text = text;
    if (!this.text && this.isTooltipVisible()) {
      this.hide(0);
    }
    this._changeTooltipText(text);
  }

  @Input('ffTooltipPosition') set position(pos: TooltipPosition) {
    this._position = pos;
    this._changeTooltipPosition(pos);
  }

  @Input('ffTooltipShowDelay') set showDelay(ms: number) {
    this._showDelay = ms;
  }

  @Input('ffTooltipHideDelay') set hideDelay(ms: number) {
    this._hideDelay = ms;
  }

  @Input('ffTooltipDisabled') set disabled(value: boolean) {
    this._disabled = value;
    if (this._disabled) {
      this.hide(0);
    }
  }

  constructor(private el: ElementRef, private service: FFTooltipService) {
    this.tooltip = this.service.initComponent(FFTooltipComponent);
    this._tooltipInstance = this.tooltip.instance;
    this._tooltipInstance.afterHide.subscribe((val) => {
      if (val) {
        const domElem = (this.tooltip.hostView as EmbeddedViewRef<any>)
          .rootNodes[0] as HTMLElement;
        this.service.removeElem(domElem);
        this._tooltipInstance._doCheck();
      }
    });
    this.service.subscribe(this);
  }

  ngAfterViewInit() {
    this._defaultOptions.target = this.el.nativeElement;
  }

  ngOnDestroy(): void {
    this.tooltip.destroy();
    this.service.unsubscribe(this);
  }

  show(ms: number = this.showDelay) {
    if (this._hideTimeoutId) {
      clearTimeout(this._hideTimeoutId);
      this._hideTimeoutId = null;
    }
    if (this.disabled || !this.text || (this.isTooltipVisible() &&
      !this._tooltipInstance._showTimeoutId && !this._tooltipInstance._hideTimeoutId)) {
      return;
    }
    const domElem = (this.tooltip.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    this._showTimeoutId = setTimeout(() => {
      this.service.appendElem(domElem, this.el.nativeElement);
      this._tooltipInstance._doCheck();
      this._tooltipInstance.show();
    }, ms);
  }

  hide(ms: number = this.hideDelay) {

    if (this._tooltipInstance) {
      if (this._showTimeoutId) {
        clearTimeout(this._showTimeoutId);
        this._showTimeoutId = null;
      }
      this._hideTimeoutId = setTimeout(() => {
        this._tooltipInstance.hide();
      }, ms);

    }
  }

  toggle(): void {
    this.isTooltipVisible() ? this.hide() : this.show();
  }

  public isTooltipVisible(): boolean {
    return !!this._tooltipInstance && this._tooltipInstance.isVisible();
  }

  private _changeTooltipText(text: string) {
    if (this._tooltipInstance) {
      this._tooltipInstance.text = text;
      this._tooltipInstance._doCheck();
    }
  }

  private _changeTooltipPosition(position: TooltipPosition) {
    if (this._tooltipInstance) {
      this._tooltipInstance.position = position;
      this._tooltipInstance._doCheck();
    }
  }
}
