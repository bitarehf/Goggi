import { Component, OnInit } from '@angular/core';
import { AccountData } from 'src/app/services/accountData';
import { BitarApiService } from 'src/app/services/bitar-api.service';


@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  account: AccountData;
  bitcoinBalance: number;

  constructor(private bitar: BitarApiService) { }

  ngOnInit() {
    this.bitar.getAccountData().subscribe(res => (this.account = res));
    this.bitar.getAddressBalance().subscribe(res => (this.bitcoinBalance = res));
  }

}
