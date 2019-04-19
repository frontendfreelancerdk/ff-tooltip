import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {FFTooltipDirective} from '../../projects/ff-tooltip/src/lib/ff-tooltip.directive';

@Component({
  selector: 'ff-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  @ViewChild('tooltip') tooltip: FFTooltipDirective;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.tooltip.text = 'text from component';
    this.tooltip.position = 'bottom';
    this.tooltip.showDelay = 500;
    this.tooltip.hideDelay = 1500;
    this.tooltip.show();
  }
}
