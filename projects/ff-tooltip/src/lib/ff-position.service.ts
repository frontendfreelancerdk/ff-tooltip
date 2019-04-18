import {Inject, Injectable, OnDestroy, Renderer2, RendererFactory2} from '@angular/core';
import {DOCUMENT} from '@angular/common';

import {from, fromEvent} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

export type xAxis = 'top' | 'right' | 'bottom' | 'left' | 'center';

export type yAxis = 'start' | 'center' | 'end' | 'before' | 'after';

export interface BoundingRect {
  top: number;
  right: number;
  bottom: number;
  left: number;
  height: number;
  width: number;
}

@Injectable({
  providedIn: 'root'
})
export class FFPositionService implements OnDestroy {
  private _document?: Document;
  private renderer: Renderer2;
  private wrapper;
  private _windowSize = {
    height: 0,
    width: 0
  };

  private _subscriptions = [];

  private get windowSize() {
    return this._windowSize;
  }

  private set windowSize(size) {
    this._windowSize = size;
  }

  _elRect: any;
  _newPosition: any;
  _el: any;

  constructor( rendererFactory: RendererFactory2, @Inject(DOCUMENT) document?: any) {
    this._document = document as Document;
    this.renderer = rendererFactory.createRenderer(null, null);

    this._subscriptions.push(
      from(['resize', 'orientationchange']).pipe(
        mergeMap((event) => fromEvent(window, event))
      ).subscribe(() => {
        this._getWindowSize();
        console.log(this._windowSize);

      })
    );
  }

  setEl(el) {
    this._el = el;
    return this.init();
  }

  init() {
    this._getWindowSize();
    this._elRect = this._el.getBoundingClientRect();
    if (this._elRect.x < 0 || this._elRect.y < 0 || this._windowSize.width < this._elRect.x + this._elRect.width || this._windowSize.height < this._elRect.y + this._elRect.height) {
      return false;
    }
    return true;
  }

  private _getWindowSize() {
    const size = {
      height: this._document.documentElement.clientHeight,
      width: this._document.documentElement.clientWidth
    };
    this.windowSize = size;
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  private createWrapper() {
    this.wrapper = this.renderer.createElement('div');
    this.renderer.addClass(this.wrapper, 'ff-position-wrapper');
  }
}
