import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

//Componentes criados
import { PhotosModule } from './photos/photos.module';


@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    BrowserModule,

    //MODULO CRIADO COM OS COMPONENTES INCLUSOS DE FOTOS
    PhotosModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
