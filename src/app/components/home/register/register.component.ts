import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BitarApiService } from 'src/app/services/bitar-api.service';
import { Login } from 'src/app/services/login';
import { Register } from 'src/app/services/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

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
    if (true) {

      let formValue = this.registerForm.value;
      formValue.id = formValue.id.replace('-', '');
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
  }

  validateId() {
    const id = this.registerForm.get('id').value.replace('-', '');
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
        this.idValid = true;
        return;
      }
    }

    console.log("Id checksum not valid: " + num)
    this.idValid = false;
  }

}
