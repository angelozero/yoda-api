import { Observable } from 'rxjs';
import { UserService } from './../user/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { UserInterface } from '../user/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  // BOA PRATICA!!! Usar o simbolo "$" indica que a variavel vai receber um valor vindo de um Observable
  user$: Observable<UserInterface>;

  constructor(private userService: UserService) {
    this.user$ = userService.getUser();
  }
}
