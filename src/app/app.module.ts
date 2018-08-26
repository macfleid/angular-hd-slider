import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HdSliderLibModule} from 'hd-slider-lib';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HdSliderLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
