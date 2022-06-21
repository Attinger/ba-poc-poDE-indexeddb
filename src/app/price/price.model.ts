import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

import {PriceComponent } from './price.component';

@NgModule({
    imports: [ CommonModule, FormsModule, PorscheDesignSystemModule, RouterModule],
    declarations: [PriceComponent],
    exports: [PriceComponent]
})
export class PriceComponentModule {}

