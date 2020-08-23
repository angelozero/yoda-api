

import { CardModule } from '../shared/components/card/card.module';
import { NgModule } from '@angular/core';


import { PhotoModule } from './photo/photo.module';
import { PhotoFormModule } from './photo-form/photo-form.module';
import { PhotoListModule } from './photo-list/photo-list.module';


@NgModule({
  // Similar a declaraçao privada do atributo, acesso apenas a componentes que conversam entre si
  declarations: [],

  // Expondo PhotoComponent para que outros modulos tenham acesso a este componente através deste modulo ( photo-module.ts )
  // Se houver necessidade do uso deste componente por outros modulos descomente a linha "exports: [ PhotoComponent ],"
  // exports: [ PhotoComponent ],

  // Importando HttpClientModule pois apenas o serviço de photo usa este modulo para injeçao de dependencia
  // Importando CommonModule para o uso de diretivas nos componentes
  imports: [
    PhotoModule, 
    PhotoFormModule, 
    PhotoListModule,
    CardModule
  ]
})
export class PhotosModule { }