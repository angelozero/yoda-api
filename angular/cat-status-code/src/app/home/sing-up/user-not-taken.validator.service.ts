import { debounceTime, map, switchMap, first, tap } from 'rxjs/operators';
import { SingUpService } from './sing-up.service';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserNotTakenValidatorService {

  constructor(private singupService: SingUpService) { }

  // control.valueChanges retorna um observable, o observable pode receber um pipe, e o pipe a cada digito vai aguardar 300 milisegundos para fazer a verificaçao do nome digitado
  checkUserNameTaken() {
    return (control: AbstractControl) => {
      return control
        .valueChanges
        .pipe(debounceTime(300))
        .pipe(switchMap(userName => this.singupService.checkUserNameTaken(userName)))
        .pipe(map(isTaken => isTaken ? { userNameTaken: true } : null))
        .pipe(first())
    }
  }
}
