import { NgModule } from '@angular/core';
import { FfTooltipDirective } from './ff-tooltip.directive';
import { FfTooltipComponent } from './ff-tooltip/ff-tooltip.component';

@NgModule({
  declarations: [FfTooltipDirective, FfTooltipComponent],
  imports     : [],
  exports     : [FfTooltipDirective],
  entryComponents: [FfTooltipComponent]
})
export class FFTooltipModule {
}
