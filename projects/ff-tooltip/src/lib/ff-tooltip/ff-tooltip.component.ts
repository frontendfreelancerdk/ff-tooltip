import {
  AfterViewInit, ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, HostBinding, HostListener, OnInit
} from '@angular/core';
import {BehaviorSubject, fromEvent} from 'rxjs';
import {tooltipState} from '../animation';

@Component({
  selector: 'ff-tooltip',
  templateUrl: './ff-tooltip.component.html',
  styleUrls: ['./ff-tooltip.component.scss'],
  animations: [tooltipState]
})
export class FFTooltipComponent implements AfterViewInit {
  private eventSubscription: any;
  public afterHide = new BehaviorSubject(false);
  _text = '';
  get text() {
    return this._text;
  }

  set text(val) {
    this._text = val;
  }

  _position = 'top';
  get position() {
    return this._position;
  }

  set position(val) {
    this._position = val;
  }


  _visibility= 'initial';

  set visibility(val) {
    this._visibility = val;
  }

  @HostBinding('@state') get visibility() {
    return this._visibility;
  }

  @HostBinding('class') _class = 'ff-tooltip-wrapper';

  @HostListener('@state.start', ['$event']) _animationStart(event) {
  }

  @HostListener('@state.done', ['$event']) _animationDone(event) {
    if (event.toState === 'hidden') {
      this.afterHide.next(true);
    }
  }

  constructor(private cdRef: ChangeDetectorRef) {
    this.eventSubscription = fromEvent(window, 'scroll').subscribe(e => {
    });
  }

  ngAfterViewInit() {
    this._doCheck();
  }

  _doCheck() {
    this.cdRef.detectChanges();
  }

  show() {
    this.visibility = 'visible';

  }

  hide() {
    this.visibility = 'hidden';
  }

  isVisible(): boolean {
    return this.visibility === 'visible';
  }


}
