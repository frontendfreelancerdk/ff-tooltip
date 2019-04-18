import {
  ApplicationRef,
  ComponentFactoryResolver,
  Injectable, Injector, OnDestroy, Renderer2, RendererFactory2,
} from '@angular/core';
import {FFOverlayService} from 'ff-overlay';
import {FFTooltipComponent} from './ff-tooltip/ff-tooltip.component';
import {FFPositionService} from './ff-position.service';
import {BehaviorSubject, from, fromEvent} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FFTooltipService implements OnDestroy {
  private renderer: Renderer2;
  private _elements: any[] = [];
  private _changePosition = new BehaviorSubject<any>(this._elements);
  private _subscription: any;
  private _subscribers = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector,
              rendererFactory: RendererFactory2,
              private overlayService: FFOverlayService,
              private positionService: FFPositionService) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initComponent(FFTooltipComponent);
    this._changePosition.subscribe((arr) => {
        if (arr.length) {
          for (let i = 0, len = arr.length; i < len; i++) {
            this.setPosition(arr[i].domElem, arr[i].target);
          }
        }
      }
    );
  }

  private setPosition(domElem, target) {
    if (!target) {
      return;
    }
    const sizes = target.getBoundingClientRect();
    this.renderer.setStyle(domElem, 'left', sizes.left + 'px');
    this.renderer.setStyle(domElem, 'top', sizes.top + 'px');
    this.renderer.setStyle(domElem, 'width', sizes.width + 'px');
    this.renderer.setStyle(domElem, 'height', sizes.height + 'px');
    this.positionService.setEl(domElem.firstChild);
  }

  initComponent(component: any) {
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);
    this.appRef.attachView(componentRef.hostView);
    return componentRef;
  }

  removeElem(domElem) {
    let index = -1;
    for (let i = 0, len = this._elements.length; i < len; i++) {
      if (this._elements[i].domElem === domElem) {
        index = i;
        break;
      }
    }
    if (index !== -1) {
      this._elements.splice(index, 1);
      this.renderer.removeChild(this.overlayService.getOverlay(), domElem);
    }
  }

  appendElem(domElem, target) {
    let index = -1;
    for (let i = 0, len = this._elements.length; i < len; i++) {
      if (this._elements[i].domElem === domElem) {
        index = i;
        break;
      }
    }
    if (index === -1) {
      const obj = {domElem, target};
      this._elements.push(obj);
      this.renderer.appendChild(this.overlayService.getOverlay(), domElem);
      this._changePosition.next([obj]);
    }
  }

  subscribe(s) {
    this._subscribers.push(s);
    if (!this._subscription) {
      this._subscription = from(['scroll', 'resize', 'orientationchange']).pipe(
        mergeMap(event => fromEvent(window, event))
      ).subscribe((event) => {
        this._changePosition.next(this._elements);
      });
    }
  }

  unsubscribe(s) {
    const index = this._subscribers.indexOf(s);
    if (index !== -1) {
      this._subscribers.splice(index, 1);
    }
    if (!this._subscribers.length) {
      this._subscription.unsubscribe();
      this._subscription = null;
    }
  }

  ngOnDestroy(): void {

  }
}
