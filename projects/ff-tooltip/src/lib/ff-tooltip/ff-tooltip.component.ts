import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector   : 'ff-tooltip',
  templateUrl: './ff-tooltip.component.html',
  styleUrls  : ['./ff-tooltip.component.scss']
})
export class FfTooltipComponent implements OnInit {
  @Input() text : string = '';
  @Input() theme : string = 'dark';
  @Input() position : string = 'top';

  constructor() {
  }

  ngOnInit() {
  }

}
