import { Injectable } from '@angular/core';

const TOKEN_KEY = 'authToken';

@Injectable({ providedIn: 'root' })
export class TokenService {


  hasToken(): boolean {
    // !! ---> a primeira exaclamação "!" deixa o retorno do getToken() como false se caso houver string.
    // !! ---> a segunda exaclamação "!" inverte o valor booleano recebido pela primeira exclamação.
    // Se     houver retorno no getToken o primeiro status sera false e com a segunda exclamaçao sera true.
    // Se nao houver retorno no getToken o primeiro status sera true e com a segunda exclamaçao sera false.
    return !!this.getToken();
  }

  setToken(token: string) {
    window.localStorage.setItem(TOKEN_KEY, token)
  }

  getToken() {
    return window.localStorage.getItem(TOKEN_KEY)
  }

  removeToken() {
    window.localStorage.removeItem(TOKEN_KEY)
  }
}