import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { PhotoComponent } from './photo/photo.component';


@NgModule({
  // Similar a declaraçao privada do atributo, acesso apenas a componentes que conversam entre si
  declarations: [ PhotoComponent ],
  
  // Expondo atributos para que outros modulos importando um modulo que usa este componente possa ter acesso a este atributo
  exports: [ PhotoComponent ],
  
  // Importando HttpClientModule pois apenas o serviço de photo usa este modulo para injeçao de dependencia
  imports: [HttpClientModule]
})
export class PhotosModule { }