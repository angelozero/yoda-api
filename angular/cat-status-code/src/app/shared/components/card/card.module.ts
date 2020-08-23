import { StatusStyleColorModule } from './../../directives/status-style-color/status-style-color.module';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';

import { NgModule } from '@angular/core';

@NgModule({
  declarations: [CardComponent],
  exports: [CardComponent, StatusStyleColorModule],
  
  imports: [CommonModule, StatusStyleColorModule],

})
export class CardModule { }