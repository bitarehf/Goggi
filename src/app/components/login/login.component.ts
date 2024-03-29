import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { BitarApiService } from 'src/app/services/bitar-api.service';
import { Login } from 'src/app/services/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  userValid: boolean;
  idValid: boolean;
  emailValid: boolean;

  constructor(
    private bitar: BitarApiService,
    private router: Router, private fb: FormBuilder,
    public alertService: AlertService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      user: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{7,})"))
      ]]
    });
  }

  get user() {
    return this.loginForm.get('user');
  }

  get password() {
    return this.loginForm.get('password');
  }

  submitHandler() {
    const formValue = this.loginForm.value;

    console.log('Logging in...');
    console.log(formValue);

    this.bitar.login(formValue).subscribe(
      res => {
        if (res.ok) {
          console.log('Logged in');
          localStorage.setItem('token', res.body.toString());
          this.router.navigate(['dashboard']);
        }
      },
      err => {
        console.log(err);
        console.log('tada');
        console.log(err.message);
        this.alertService.clear(); // Prevents multiple alerts stacking.
        this.alertService.error('Innskráning tókst ekki: ' + err.error);
        
      }
    );
  }

  validateUser() {
    const user = this.loginForm.get('user').value;

    if (user === '') {
      return;
    }

    const id = user.replace('-', '');
    const x1 = +id[0] * 3;
    const x2 = +id[1] * 2;
    const x3 = +id[2] * 7;
    const x4 = +id[3] * 6;
    const x5 = +id[4] * 5;
    const x6 = +id[5] * 4;
    const x7 = +id[6] * 3;
    const x8 = +id[7] * 2;
    const y = x1 + x2 + x3 + x4 + x5 + x6 + x7 + x8;
    const j = y % 11;
    let num = 11 - j;
    num = (num == 11) ? 0 : num;
    if (+id[8] == num) {
      if (+id[9] == 0 || +id[9] == 9 || +id[9] == 8) {
        console.log("Id is valid: " + num);
        this.userValid = true;
        return;
      }
    }

    console.log("Id checksum not valid");

    if (this.loginForm.get('user').value.match(/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)) {
      console.log('email is valid');
      this.userValid = true;
    }
    else {
      console.log('invalid email');
      this.userValid = false;
    }
  }

}
