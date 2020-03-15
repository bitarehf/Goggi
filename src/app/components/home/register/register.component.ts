import { Component, OnInit } from '@angular/core';
import { BitarApiService } from 'src/app/services/bitar-api.service';
import { Register } from 'src/app/services/register';
import { Login } from 'src/app/services/login';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl, Validator } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  idMask: Array<string | RegExp> = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  
  // Form state
  idValid: boolean = false;

  constructor(private bitar: BitarApiService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      id: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{7,})"))
      ]]
    });
  }

  get id() {
    return this.registerForm.get('id');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  async submitHandler() {
    const formValue = this.registerForm.value;

    console.log('Creating account...');
    console.log(formValue);

    this.bitar.register(formValue).subscribe(
      res => {
        if (res.ok) {
          console.log('Account created');
          localStorage.setItem('token', res.body.toString());
          this.router.navigate(['dashboard']);
        }
      },
      err => {
        console.log(err);
      });
  }

  validateId() {
    let id = this.registerForm.get('id').value.replace('-', '');
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

}
