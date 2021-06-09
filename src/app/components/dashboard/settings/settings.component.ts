import { Component, OnInit } from '@angular/core';
import { AccountData } from 'src/app/services/accountData';
import { BitarApiService } from 'src/app/services/bitar-api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  account: AccountData;

  constructor(private bitar: BitarApiService) { }

  ngOnInit() {
    this.bitar.getAccountData().subscribe(res => (this.account = res));
  }

  update() {
    this.bitar.setWithdrawalAddress(this.account.withdrawalAddress).subscribe(
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
