import { RouterModule } from '@angular/router';
import { VMessageModule } from './../../shared/components/vmessage/vmessage.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoFormComponent } from './../photo-form/photo-form.component';


@NgModule({
  declarations: [
    PhotoFormComponent
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    VMessageModule,
    FormsModule,
    RouterModule
  ]
})

export class PhotoFormModule {

}