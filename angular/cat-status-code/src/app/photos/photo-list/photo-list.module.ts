import { DarkenOnHoverModule } from './../../shared/directives/darken-on-hover/darken-on-hover.module';
import { SearchComponent } from './search/search.component';
import { CardModule } from '../../shared/components/card/card.module';
import { PhotoModule } from './../photo/photo.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterByDescriptionPipe } from './filter-by-description.pipe'
import { PhotoListComponent } from './photo-list.component'
import { PhotoLoadButtonComponent } from './photo-load-button/photo-load-button.component';
import { PhotosRenderComponent } from './photos-render/photos-render.component';



@NgModule({
  declarations: [
    PhotoListComponent,
    FilterByDescriptionPipe,
    PhotoLoadButtonComponent,
    PhotosRenderComponent,
    SearchComponent

  ],

  imports: [
    CommonModule,
    PhotoModule,
    CardModule,
    DarkenOnHoverModule
  ]
})

export class PhotoListModule {

}