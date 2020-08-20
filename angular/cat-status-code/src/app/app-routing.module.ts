import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { PhotoFormComponent } from './photos/photo-form-component/photo-form.component';
import { PhotoListComponent } from './photos/photo-list-component/photo-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'user/angelo', component: PhotoListComponent },
  { path: 'photo/add', component: PhotoFormComponent }

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
