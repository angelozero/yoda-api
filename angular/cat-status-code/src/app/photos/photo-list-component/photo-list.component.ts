import { Component, OnInit } from '@angular/core';
import { Photo } from './../photo-component/photo';
import { PhotoService } from '../service/photo-service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  constructor(private photoService: PhotoService, private activatedRoute: ActivatedRoute) { }
  
  apiPhotoData: Photo[] = [];

  ngOnInit(): void {

    const userName = this.activatedRoute.snapshot.params.userName;

    this.photoService
      .listPhotosFromUser(userName)
      .subscribe(photos => this.apiPhotoData = photos)
  }

}
