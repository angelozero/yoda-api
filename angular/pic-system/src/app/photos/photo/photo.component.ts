import { Component, Input } from '@angular/core';

@Component({
    selector: 'pic-system-photo',
    templateUrl: 'photo.component.html'
})
export class PhotoComponent {
    title = 'Fotos';
    @Input()
    description: String;
    @Input()
    url: String;
}