import {NgModule} from '@angular/core';
import {FFTooltipDirective} from './ff-tooltip.directive';
import {FFTooltipComponent} from './ff-tooltip/ff-tooltip.component';
import {FFOverlayModule} from 'ff-overlay';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [FFTooltipDirective, FFTooltipComponent],
  imports: [CommonModule, BrowserAnimationsModule, BrowserModule, FFOverlayModule],
  exports: [FFTooltipDirective],
  entryComponents: [FFTooltipComponent]
})
export class FFTooltipModule {
}
