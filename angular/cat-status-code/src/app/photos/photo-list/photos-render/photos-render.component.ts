import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Photo } from '../../photo/photo';

@Component({
  selector: 'app-photos-render',
  templateUrl: './photos-render.component.html',
  styleUrls: ['./photos-render.component.css']
})
export class PhotosRenderComponent implements OnChanges {

  @Input() photos: Photo[] = [];
  rows: any[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.photos){
      this.rows = this.groupColumns(this.photos);
    }
  }

  groupColumns(photos: Photo[]) {
    const newRows = [];

    for (let index = 0; index < photos.length; index += 6) {
      newRows.push(photos.slice(index, index + 6))
    }
    return newRows;
  }
}
