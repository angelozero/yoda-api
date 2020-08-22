import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Photo } from '../photo-component/photo';

const API = 'http://localhost:3000/';

@Injectable({ providedIn: 'root' })
export class PhotoService {

  constructor(private http: HttpClient) { }

  listPhotosFromUser(userName: string) {
    return this.http
      .get<Photo[]>(`${API}${userName}/photos`)
  }

  listPhotosFromUserPaginated(userName: string, numberPage: number) {
    const paramsNumberPage = new HttpParams().append('page', numberPage.toString())
    return this.http
      .get<Photo[]>(`${API}${userName}/photos`, {params: paramsNumberPage})
  }

}