import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PhotoService } from './../service/photo-service';
import { Photo } from './../photo/photo';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private photoService: PhotoService) { }

  apiPhotoData: Photo[] = [];
  filter: string = '';
  apiPhotoDataListhasMore: boolean = true;
  userName: string = '';
  currentPage: number = 1;

  ngOnInit(): void {
    this.userName = this.activatedRoute.snapshot.params.userName;
    this.apiPhotoData = this.activatedRoute.snapshot.data['photos']
  }

  load() {
    this.photoService
      .listPhotosFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(photos => {
        this.filter = '';
        this.apiPhotoData = this.apiPhotoData.concat(photos)
        if (!photos.length) {
          this.apiPhotoDataListhasMore = false
        }
      })
  }
}
