import { Component, OnInit } from '@angular/core';
import { Photo } from './../photo-component/photo';
import { PhotoService } from '../service/photo-service';


@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  constructor(private photoService: PhotoService) { }
  apiPhotoData: Photo[] = [];

  ngOnInit(): void {
    this.photoService
      .listPhotosFromUser("angelo")
      .subscribe(photos => this.apiPhotoData = photos)
  }

}
