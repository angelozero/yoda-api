import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'TITULO INICIAL'

  photos = [
    {
      url:'https://i.pinimg.com/originals/bb/a8/1e/bba81eb389b952e4dc0a75ae540858b7.jpg',
      description:'Solid Snake'
    },
    {
      url:'https://img.favpng.com/6/18/9/metal-gear-solid-special-missions-playstation-solid-snake-metal-gear-acid-png-favpng-XKSZA8TmuXUyZr0df1RfHknuu.jpg',
      description:'Solid Snake and Meryl'
    },
  ]
  
}
