import { CommonModule } from '@angular/common';
import { VmessageComponent } from './vmessage.component';

import { NgModule } from '@angular/core';

@NgModule({
  declarations: [VmessageComponent],
  exports: [VmessageComponent],
  
  imports: [CommonModule],

})
export class VMessageModule { }