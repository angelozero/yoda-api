// import { Component, OnInit } from '@angular/core';
// // import { Photo } from './photos/photo/photo';
// // import { PhotoService } from './photos/service/photo-service';
// // import { HttpClient } from '@angular/common/http'

// @Component({
//   selector: 'app-root',
//   templateUrl: './06-app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent /*implements OnInit*/ {
//   // 0 - Etapa inicial
//   // url = 'https://i.pinimg.com/originals/21/4a/88/214a884a0f81de79ebfa7d6ef4e27754.jpg';
//   title = 'Cat Status Code';

//   // 1 - Etapa Usando Diretivas
//   // urlPhotoList = [{
//   //   url: 'https://http.cat/images/599.jpg'
//   // },
//   // {
//   //   url: 'https://http.cat/images/510.jpg'
//   // },
//   // {
//   //   url: 'https://http.cat/images/506.jpg'
//   // },
//   // {
//   //   url: 'https://http.cat/images/500.jpg'
//   // }]

//   // 2 - Recebendo informações de uma API externa
//   // apiPhotoData: Object[] =  []; 
//   // http: HttpClient;

//   // constructor(http: HttpClient) {
//   //   this.http = http

//   //   http
//   //     .get<Object[]>('http://localhost:3000/angelo/photos')
//   //     .subscribe(photos => this.apiPhotoData = photos)
//   // }

//   // 3 - Isolando a chamda em uma camada de serviço
//   // apiPhotoData: Object[] = [];
//   // http: HttpClient;

//   // constructor(private photoService: PhotoService) {
//   //   this.photoService
//   //     .listPhotosFromUser("angelo")
//   //     .subscribe(photos => this.apiPhotoData = photos)
//   // }

//   // 4 - Ciclo de vida de um componente
//   // constructor(private photoService: PhotoService) { }
//   // apiPhotoData: Photo[] = [];

//   // ngOnInit(): void {
//   //   this.photoService
//   //     .listPhotosFromUser("angelo")
//   //     .subscribe(photos => this.apiPhotoData = photos)
//   // }

//   // 5 - Extraindo funcao de fotos para um novo componente
//   // apiPhotoData = [{
//   //   url: 'https://http.cat/images/420.jpg'
//   // }]
// }
