import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { ExterieurComponentModule } from 'src/app/exterieur/exterieur.model';
import { LightComponentModule } from 'src/app/light/light.model';
import { MultiselectComponentModule } from 'src/app/multiselect/multiselect.model';
import { OptionselectComponentModule } from 'src/app/optionselect/optionselect.model';
import { PriceComponentModule } from 'src/app/price/price.model';
import { SwiperModule } from 'swiper/angular';
import { SliderComponentModule } from 'src/app/slider/slider.model';
import { ThumbnailsComponentModule } from 'src/app/thumbnails/thumbnails.model';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PorscheDesignSystemModule,
        ExterieurComponentModule,
        MultiselectComponentModule,
        LightComponentModule,
        PriceComponentModule,
        SwiperModule,
        SliderComponentModule,
        ThumbnailsComponentModule,
        OptionselectComponentModule,
        HomePageRoutingModule,
    ],
    exports: [
        HomePage
    ],
    declarations: [HomePage]
})
export class HomePageModule {}
