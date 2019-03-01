import {
  AfterViewInit,
  ApplicationRef,
  ComponentFactoryResolver,
  Directive,
  ElementRef, EmbeddedViewRef,
  HostListener,
  Injector,
  Input,
  OnInit,
  Renderer2
} from '@angular/core';
import { FfTooltipComponent } from './ff-tooltip/ff-tooltip.component';

@Directive({
  selector: '[ffTooltip]'
})
export class FfTooltipDirective implements OnInit, AfterViewInit {
  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event) {
    console.log('mouseenter', event);
    setTimeout(() => {
      this.appendComponentToBody(FfTooltipComponent);
    });
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event) {
    console.log('mouseleave', event);
    this.tooltip.destroy();
  }

  @Input('ff-Tooltip') text : string = '';
  tooltip;

  constructor(private renderer : Renderer2,
              private el : ElementRef,
              private componentFactoryResolver : ComponentFactoryResolver,
              private appRef : ApplicationRef,
              private injector : Injector) {

  }

  ngOnInit() : void {
    this.renderer.setStyle(
      this.el.nativeElement,
      'position', 'relative'
    );
  }

  ngAfterViewInit() {

  }

  appendComponentToBody(component : any) {
    // 1. Create a component reference from the component
    this.tooltip= this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);

    // 2. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(this.tooltip.hostView);

    // 3. Get DOM element from component
    // @ts-ignore
    this.tooltip.instance.text = this.text;
    const domElem = (this.tooltip.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // 4. Append DOM element to the body
    this.renderer.appendChild(this.el.nativeElement, domElem);
  }
}
