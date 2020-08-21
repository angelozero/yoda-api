import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ErrorsModule } from './errors/errors.module';
import { PhotosModule } from './photos/photos.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PhotosModule,
    ErrorsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
