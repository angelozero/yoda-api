import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { PhotoComponent } from './photo-component/photo.component';
import { PhotoListComponent } from './photo-list-component/photo-list.component';
import { PhotoFormComponent } from './photo-form-component/photo-form.component';


@NgModule({
  // Similar a declaraçao privada do atributo, acesso apenas a componentes que conversam entre si
  declarations: [PhotoComponent, PhotoListComponent, PhotoFormComponent],

  // Expondo PhotoComponent para que outros modulos tenham acesso a este componente através deste modulo ( photo-module.ts )
  // Se houver necessidade do uso deste componente por outros modulos descomente a linha "exports: [ PhotoComponent ],"
  // exports: [ PhotoComponent ],

  // Importando HttpClientModule pois apenas o serviço de photo usa este modulo para injeçao de dependencia
  imports: [
    HttpClientModule
  ]
})
export class PhotosModule { }