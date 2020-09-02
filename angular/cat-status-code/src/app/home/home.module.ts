import { RouterModule } from '@angular/router';
import { VMessageModule } from './../shared/components/vmessage/vmessage.module';
import { SingInComponent } from './sing-in/sing-in.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'



@NgModule({
  declarations: [SingInComponent],
  imports: [
    CommonModule,
    VMessageModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class HomeModule { }
