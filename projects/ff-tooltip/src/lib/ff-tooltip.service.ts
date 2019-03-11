import {
  ApplicationRef,
  ComponentFactoryResolver, EmbeddedViewRef,
  Injectable, Injector, OnDestroy, Renderer2, RendererFactory2,
} from '@angular/core';
import {FFOverlayService} from 'ff-overlay';
import {FFTooltipComponent} from './ff-tooltip/ff-tooltip.component';
import {FFPositionService} from './ff-position.service';

@Injectable({
  providedIn: 'root'
})
export class FFTooltipService implements OnDestroy {
  private renderer: Renderer2;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector,
              rendererFactory: RendererFactory2,
              private overlayService: FFOverlayService,
              private positionService: FFPositionService) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initComponent(FFTooltipComponent);
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
    this.renderer.removeChild(this.overlayService.getOverlay(), domElem);
  }

  appendElem(domElem, target){
    this.renderer.appendChild(this.overlayService.getOverlay(), domElem);
    this.setPosition(domElem, target);
  }

  ngOnDestroy(): void {

  }
}
