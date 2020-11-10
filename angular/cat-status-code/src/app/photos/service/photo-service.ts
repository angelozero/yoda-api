import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Photo } from '../photo/photo';

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

  upload(description: string, allowComments: boolean, file: File){
    
    const formData = new FormData();
    //description ---> nome da propriedade definido no backend ( server em node )
    formData.append('description', description);
    //allowComments ---> nome da propriedade definido no backend ( server em node )
    formData.append('allowComments', description.toString());
    //imageFile ---> nome da propriedade definido no backend ( server em node )
    formData.append('imageFile', file);

    return this.http.post(API + 'photos/upload', formData)
  }

}