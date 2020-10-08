import { SingUpService } from './sing-up.service';
import { NewUser } from './new-user';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { lowerCaseValidator } from '../../shared/validators/lower-case.validator'
import { Router } from '@angular/router';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {


  singupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userNotTakenValidatorService: UserNotTakenValidatorService, private singUpService: SingUpService, private router: Router) { }

  ngOnInit(): void {

    this.singupForm = this.formBuilder.group({
      email: ['',
        [
          Validators.required,
          Validators.email,
        ]
      ],
      userName: ['',
        [
          Validators.required,
          lowerCaseValidator,
          Validators.minLength(2),
          Validators.maxLength(30)
        ],
        this.userNotTakenValidatorService.checkUserNameTaken()
      ],
      fullName: ['',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40)
        ]
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(14)
        ]
      ],
    });
  }

  signup() {
    const newUser = this.singupForm.getRawValue() as NewUser;
    this.singUpService
      .signup(newUser)
      .subscribe(() => this.router.navigate([''])),
      err => console.log(`ERRO SING-UP `, err)
  }
}