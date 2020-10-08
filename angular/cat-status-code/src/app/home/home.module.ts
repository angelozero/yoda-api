import { RouterModule } from '@angular/router';
import { VMessageModule } from './../shared/components/vmessage/vmessage.module';
import { SingInComponent } from './sing-in/sing-in.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SingUpComponent } from './sing-up/sing-up.component'



@NgModule({
  declarations: [SingInComponent, SingUpComponent],
  imports: [
    CommonModule,
    FormsModule,
    VMessageModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class HomeModule { }
