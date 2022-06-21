import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

import {SliderComponent } from './slider.component';
import {SwiperModule} from "swiper/angular";

@NgModule({
    imports: [ CommonModule, FormsModule, PorscheDesignSystemModule, RouterModule, SwiperModule],
    declarations: [SliderComponent],
    exports: [SliderComponent]
})
export class SliderComponentModule {}

