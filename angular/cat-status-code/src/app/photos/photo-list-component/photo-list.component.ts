import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { PhotoService } from './../service/photo-service';
import { Photo } from './../photo-component/photo';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {

  constructor(private activatedRoute: ActivatedRoute, private photoService: PhotoService) { }

  apiPhotoData: Photo[] = [];
  filter: string = '';
  debounce: Subject<string> = new Subject<string>();
  apiPhotoDataListhasMore: boolean = true;
  userName: string = '';
  currentPage: number = 1;

  ngOnInit(): void {
    this.userName = this.activatedRoute.snapshot.params.userName;
    this.apiPhotoData = this.activatedRoute.snapshot.data['photos']

    this.debounce
      .pipe(debounceTime(300))
      .subscribe(filter => this.filter = filter)
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }

  load() {
    this.photoService
      .listPhotosFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(photos => {
        this.apiPhotoData = this.apiPhotoData.concat(photos)
        if (!photos.length) {
          this.apiPhotoDataListhasMore = false
        }
      })

  }

}
