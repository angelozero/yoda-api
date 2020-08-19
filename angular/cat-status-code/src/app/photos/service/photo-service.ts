import { Photo } from '../photo/photo';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PhotoService {

  constructor(private http: HttpClient) { }

  listPhotosFromUser(userName: string) {
    return this.http
      .get<Photo[]>(`http://localhost:3000/${userName}/photos`)
  }

}