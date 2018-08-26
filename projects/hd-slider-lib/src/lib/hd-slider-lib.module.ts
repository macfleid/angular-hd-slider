import { NgModule } from '@angular/core';
import { HdSliderLibComponent } from './hd-slider-lib.component';
import {OnLoadDirective} from './onload.directive';
import {CommonModule} from '@angular/common';
// import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [HdSliderLibComponent, OnLoadDirective],
  exports: [HdSliderLibComponent, OnLoadDirective]
})
export class HdSliderLibModule { }
