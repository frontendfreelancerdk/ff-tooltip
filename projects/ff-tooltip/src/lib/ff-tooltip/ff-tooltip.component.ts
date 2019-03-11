import {
  AfterViewInit,
  ChangeDetectorRef,
  Component
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


  _visibility = 'initial';
  get visibility() {
    return this._visibility;
  }

  set visibility(val) {
    this._visibility = val;
  }

  private _showTimeoutId;
  private _hideTimeoutId;


  constructor(private cdRef: ChangeDetectorRef) {
    this.eventSubscription = fromEvent(window, 'scroll').subscribe(e => {
    });
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  _doCheck() {
    this.cdRef.detectChanges();
  }

  show(delay: number) {
    console.log('show');
    if (this._hideTimeoutId) {
      clearTimeout(this._hideTimeoutId);
      this._hideTimeoutId = null;
    }
    this._showTimeoutId = setTimeout(() => {
      this.visibility = 'visible';
    }, delay);
  }

  hide(delay: number) {
    console.log('hide');
    if (this._showTimeoutId) {
      clearTimeout(this._showTimeoutId);
      this._showTimeoutId = null;
    }
    this._hideTimeoutId = setTimeout(() => {
      this.visibility = 'hidden';
    }, delay);
  }

  isVisible(): boolean {
    return this.visibility === 'visible';
  }

  _animationStart(event) {
    console.log(event);
  }

  _animationDone(event) {
    console.log(event);
    if (event.toState === 'hidden') {
      this.afterHide.next(true);
    }
  }
}
