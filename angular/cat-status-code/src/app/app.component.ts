import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './04-app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // 1 - Etapa inicial
  title = 'Cat Status Code';
  // url = 'https://i.pinimg.com/originals/21/4a/88/214a884a0f81de79ebfa7d6ef4e27754.jpg';

  // 2 - Etapa Usando Diretivas
  urlPhotoList = [{
    url: 'https://http.cat/images/599.jpg'
  },
  {
    url: 'https://http.cat/images/510.jpg'
  },
  {
    url: 'https://http.cat/images/506.jpg'
  },
  {
    url: 'https://http.cat/images/500.jpg'
  }]
}
