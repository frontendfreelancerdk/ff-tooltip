import {Component} from '@angular/core';

@Component({
  selector: 'ff-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ff-tooltip-app';
  direction = '';
  text = 'hello';

  constructor() {
    const pos = ['left', 'top', 'bottom', 'right'];
    this.direction = pos[0];
    let i = 1;
    setInterval(() => {
      this.direction = pos[i];
      i + 1 >= pos.length ? i = 0 : i++;
    }, 22000);

    setTimeout(() => {
      this.text = 'world';
    }, 5000);

  }
}
