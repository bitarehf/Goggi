import { Component, OnInit } from '@angular/core';
import { BitarApiService } from 'src/app/services/bitar-api.service';
import { Router } from '@angular/router';
import { Login } from 'src/app/services/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  idMask: Array<string | RegExp> = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  idValid: boolean;
  passwordValid: boolean;
  emailValid: boolean;
  account: Login = { User: '', Password: '' };

  constructor(private bitar: BitarApiService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    if (this.idValid && this.passwordValid) {
      console.log('Logging in...');
      this.account.User = this.account.User.replace('-', '');
      this.bitar.login(this.account).subscribe(
        res => {
          if (res.ok) {
            console.log('Logged in');
            localStorage.setItem('token', res.body.toString());
            this.router.navigate(['dashboard']);
          }
        },
        err => {
          console.log(err);
        }
      );
    }
    else
    {
      console.log('fuck');
      console.log(this.idValid);
      console.log(this.passwordValid);
    }
  }

  validateId() {
    let id = this.account.User.replace('-', '');
    let x1 = +id[0] * 3;
    let x2 = +id[1] * 2;
    let x3 = +id[2] * 7;
    let x4 = +id[3] * 6;
    let x5 = +id[4] * 5;
    let x6 = +id[5] * 4;
    let x7 = +id[6] * 3;
    let x8 = +id[7] * 2;
    let y = x1 + x2 + x3 + x4 + x5 + x6 + x7 + x8;
    let j = y % 11;
    let num = 11 - j;
    num = (num == 11) ? 0 : num;
    if (+id[8] == num) {
      if (+id[9] == 0 || +id[9] == 9 || +id[9] == 8) {
        console.log("Id is valid: " + num);
        this.idValid = true;
        return;
      }
    }

    console.log("Id checksum not valid: " + num)
    this.idValid = false;
  }

  // validateEmail() {
  //   if (this.account.Email.match(new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))) {
  //     this.emailValid = true;
  //   }
  //   else {
  //     this.emailValid = false;
  //   }
  // }

  validatePassword() {
    if (this.account.Password.match(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{7,})"))) {
      this.passwordValid = true;
    }
    else {
      this.passwordValid = false;
    }
  }

}
