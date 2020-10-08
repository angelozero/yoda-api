import { NewUser } from './new-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const API_URL = "http://localhost:3000"

@Injectable({
  providedIn: 'root'
})
export class SingUpService {

  constructor(private httpClient: HttpClient) { }

  checkUserNameTaken(userName: string) {
    console.log(`Verificando nome do usuario`, userName)
    return this.httpClient.get(API_URL + '/user/exists/' + userName);
  }

  signup(newUser: NewUser) {
    return this.httpClient.post(API_URL + '/user/signup', newUser);
  }
}
