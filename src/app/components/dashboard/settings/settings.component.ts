import { Component, OnInit } from '@angular/core';
import { BitarApiService } from 'src/app/services/bitar-api.service';
import { AccountData } from 'src/app/services/accountData';

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
          console.log('Settings updated successfully');
          console.log(res.body.toString());
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
