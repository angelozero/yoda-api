import { UserInterface } from './user.interface';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './../token/token.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new  BehaviorSubject<UserInterface>(null);


  constructor(private tokenService: TokenService) {
    if (this.tokenService.hasToken()) {
      this.decodeAndNotify();
    }
  }

  setToken(token: string) {
    this.tokenService.setToken(token)
    this.decodeAndNotify()
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  private decodeAndNotify() {
    const token = this.tokenService.getToken()
    const user = this.decode(token) as UserInterface;
    this.userSubject.next(user);
  }

  // Decode sem o modulo jwt-decode
  private decode(token: string) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.log(`Nao foi possivel decodificar o token`)
    }
  }
}
