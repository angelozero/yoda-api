import { debounceTime, map, switchMap, first, tap } from 'rxjs/operators';
import { SingUpService } from './sing-up.service';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserNotTakenValidatorService {

  constructor(private singupService: SingUpService) { }

  // Control retorna um observable, o observable pode receber um pipe, e o pipe a cada digito vai aguardar 300 milisegundos para fazer a verificaçao do nome digitado
  checkUserNameTaken() {
    console.log(`\n\n\n 1 AQUI`)
    return (control: AbstractControl) => {
      console.log(`\n\n\n 2 AQUI`)
      return control
        .valueChanges
        .pipe(debounceTime(300))
        .pipe(switchMap(userName => this.singupService.checkUserNameTaken(userName)))
        .pipe(map(isTaken => isTaken ? { userNameTaken: true } : null))
        //.pipe(tap(r => console.log(`ERRO AQUI TAP `, r)))
        .pipe(first())
    }
  }
}
