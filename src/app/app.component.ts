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
  test = true;

  constructor() {
    const pos = ['left', 'top', 'bottom', 'right'];
    let i = 0;
    setInterval(() => {
      this.direction = pos[i];
      i + 1 >= pos.length ? i = 0 : i++;
    }, 2000);

    setTimeout(() => {
      this.text = 'world';
    }, 5000);

    setTimeout(() => {
      this.test = false;
    }, 5000);
  }
}
