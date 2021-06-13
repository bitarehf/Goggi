import { Component, OnInit } from '@angular/core';
import { AccountData, KnowYourCustomer } from 'src/app/services/accountData';
import { BitarApiService } from 'src/app/services/bitar-api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  account: AccountData;
  knowYourCustomer: KnowYourCustomer;

  constructor(private bitar: BitarApiService) { }

  ngOnInit() {
    this.bitar.getAccountData().subscribe(res => (this.account = res));
  }

  updateKnowYourCustomer() {
    console.log("kyc");
    this.knowYourCustomer = { occupation: "t1", originOfFunds: "t2", ownerOfFunds: true };
    this.bitar.updateKnowYourCustomer(this.knowYourCustomer);
    window.location.href = 'https://innskraning.island.is/?id=bitar.is&qaa=4';
  }

  update() {
    this.bitar.setTransferAddress(this.account.withdrawalAddress).subscribe(
      res => {
        if (res.ok) {
          console.log('Withdrawal address updated successfully');
          console.log(res.body.toString());
        }
      },
      err => {
        console.log(err);
      }
    );

    this.bitar.setBankAccountNumber(this.account.bankAccountNumber.split('-').join('')).subscribe(
      res => {
        if (res.ok) {
          console.log('Bank account number updated successfully');
          console.log(res.body.toString());
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
