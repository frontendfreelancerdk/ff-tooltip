import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FFTooltipModule } from 'ff-tooltip';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FFTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
