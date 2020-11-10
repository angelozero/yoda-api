import { UserInterface } from './../user/user.interface';
import { Observable } from 'rxjs';
import { UserService } from './../user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  user$: Observable<UserInterface>;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user$ = this.userService.getUser();
  }

}
