import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-photo-load-button',
  templateUrl: './photo-load-button.component.html',
  styleUrls: ['./photo-load-button.component.css']
})
export class PhotoLoadButtonComponent implements OnInit {


  @Input() infoPhotohasMore: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
