import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

export const tooltipState = trigger('state', [
  state('initial, void, hidden', style({opacity: 0, transform: 'scale(0)'})),
  state('visible', style({opacity: 1, transform: 'scale(1)'})),
  transition('* => visible', animate('300ms cubic-bezier(0, 0, 0.2, 1)', style({opacity: 1, transform: 'scale(1)'}))),
  transition('* => hidden', animate('300ms cubic-bezier(0, 0, 0.2, 1)', style({opacity: 0, transform: 'scale(0)'}))),
]);
