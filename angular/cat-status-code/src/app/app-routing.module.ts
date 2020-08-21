import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoFormComponent } from './photos/photo-form-component/photo-form.component';
import { PhotoListComponent } from './photos/photo-list-component/photo-list.component';

const routes: Routes = [
  { path: 'user/angelo', component: PhotoListComponent },
  { path: 'photo/add', component: PhotoFormComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
