import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

import { MultiselectComponent } from './multiselect.component';

@NgModule({
    imports: [ CommonModule, FormsModule, PorscheDesignSystemModule, RouterModule],
    declarations: [MultiselectComponent],
    exports: [MultiselectComponent]
})
export class MultiselectComponentModule {}
