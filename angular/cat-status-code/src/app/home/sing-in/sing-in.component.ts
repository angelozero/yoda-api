
import { PlataformDetectorService } from './../../core/plataform-detector/plataform-detector.service';
import { AuthService } from '../../core/auth/auth.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  //selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  //styleUrls: ['./sing-in.component.css']
})
export class SingInComponent implements OnInit {

  loginForm: FormGroup;
  @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private platFormDetectorService: PlataformDetectorService) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

    // this.platFormDetectorService.isPlatformBrowser() &&
    //   this.userNameInput.nativeElement.focus();

  }
  
  login() {

    const userNameValue = this.loginForm.get('userName').value;
    const passwordValue = this.loginForm.get('password').value;

    this.authService
      .authenticate(userNameValue, passwordValue)
      .subscribe(() => {
        console.log('sucesso')
        //this.router.navigateByUrl(`user/${userNameValue}`)
        this.router.navigate(['user', userNameValue])
      },
        err => {
          console.log(`Erro ao se autenticar ${err.message}`);
          this.loginForm.reset();

          // Maneira de se proteger se caso o serviço nao for utilizado via
          // this.platFormDetectorService.isPlatformBrowser() &&
          //   this.userNameInput.nativeElement.focus();

            alert('Invalid user name and/or password')
        }
      )
  }
}
