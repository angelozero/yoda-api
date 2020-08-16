import { Component, Input } from '@angular/core';

@Component({
  selector: 'cat-status-photo-component',
  templateUrl: './photo.component.html'
})
export class PhotoComponent {

  @Input() url = '';

}