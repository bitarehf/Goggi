import { Component } from '@angular/core';
import { Person } from 'src/app/services/person';
import { BitarApiService } from 'src/app/services/bitar-api.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent {

  person: Person = { ssn: '', bitcoinAddress: '' };
  person2: Person = { ssn: '', bitcoinAddress: '' };
  ssnMask: Array<string | RegExp> = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  ssnValid: boolean;
  addressValid: boolean;
  hidden: boolean;
  alertHidden: boolean = true;

  constructor(private bitcoin: BitarApiService) { }

  buySubmit() {
    // if (this.ssnValid && this.addressValid) {
    //   console.log('Adding person...');
    //   this.person2.ssn = this.person.ssn.replace('-', '');
    //   this.person2.bitcoinAddress = this.person.bitcoinAddress;
    //   this.bitcoin.register(this.person2).subscribe(
    //     res => {
    //       if (res.status == 200) {
    //         console.log('Request successful');
    //         console.log(res);
    //         this.hidden = true;
    //       }
    //     },
    //     err => {
    //       console.log('Request failed');
    //       this.showError();
    //       console.error(err);
    //     }
    //   );
    // }
  }

  validateSSN() {
    let ssn = this.person.ssn.replace('-', '');
    let x1 = +ssn[0] * 3;
    let x2 = +ssn[1] * 2;
    let x3 = +ssn[2] * 7;
    let x4 = +ssn[3] * 6;
    let x5 = +ssn[4] * 5;
    let x6 = +ssn[5] * 4;
    let x7 = +ssn[6] * 3;
    let x8 = +ssn[7] * 2;
    let y = x1 + x2 + x3 + x4 + x5 + x6 + x7 + x8;
    let j = y % 11;
    let num = 11 - j;
    num = (num == 11) ? 0 : num;
    if (+ssn[8] == num) {
      if (+ssn[9] == 0 || +ssn[9] == 9 || +ssn[9] == 8) {
        console.log("ssn is valid: " + num);
        this.ssnValid = true;
        return;
      }
    }

    console.log("SSN checksum not valid: " + num)
    this.ssnValid = false;
  }

  validateAddress() {
    if (this.person.bitcoinAddress.match('^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$'))
      this.addressValid = true;
    else
      this.addressValid = false;
  }

  showError() {
    this.alertHidden = false;
  }

}
