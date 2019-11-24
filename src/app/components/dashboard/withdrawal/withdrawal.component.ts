import { Component, OnInit } from '@angular/core';
import { AccountData } from 'src/app/services/accountData';
import { BitarApiService } from 'src/app/services/bitar-api.service';


@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.scss']
})
export class WithdrawalComponent implements OnInit {

  account: AccountData;
  bitcoinBalance: number;

  constructor(private bitar: BitarApiService) { }

  ngOnInit() {
    this.bitar.getAccountData().subscribe(res => (this.account = res));
    this.bitar.getAddressBalance().subscribe(res => (this.bitcoinBalance = res));
  }

}
