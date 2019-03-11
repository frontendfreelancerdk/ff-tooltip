import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FFPositionService {
  _windowSize = {
    height: 0,
    width: 0
  };
  _elRect: any;
  _newPosition: any;
  _el: any;

  constructor() {


  }

  setEl(el) {
    this._el = el;
    return this.init();
  }

  init() {
    this._windowSize.height = window.innerHeight;
    this._windowSize.width = window.innerWidth;
    console.log(this._windowSize);
    this._elRect = this._el.getBoundingClientRect();
    console.log(this._el, this._elRect);
    if (this._elRect.x < 0 || this._elRect.y < 0 || this._windowSize.width < this._elRect.x + this._elRect.width || this._windowSize.height < this._elRect.y + this._elRect.height) {
      return false;
    }
    return true;
  }
}
