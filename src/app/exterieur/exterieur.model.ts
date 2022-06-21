import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';


import { ExterieurComponent } from './exterieur.component';

@NgModule({
  imports: [ CommonModule, FormsModule, RouterModule, PorscheDesignSystemModule],
  declarations: [ExterieurComponent],
  exports: [ExterieurComponent]
})
export class ExterieurComponentModule {}
