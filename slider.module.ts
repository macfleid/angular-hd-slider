import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider/slider.component';
import {OnLoadDirective} from './slider/onload.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [SliderComponent, OnLoadDirective],
  declarations: [SliderComponent, OnLoadDirective]
})
export class SliderModule { }
