import { Component, OnInit } from '@angular/core';
import { AccountData, MarketTransaction } from 'src/app/services/accountData';
import { BitarApiService } from 'src/app/services/bitar-api.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  account: AccountData;
  username: string;

  transactions: MarketTransaction[];

  constructor(private bitar: BitarApiService) { }

  ngOnInit() {
    console.log('ohh hello there');

    this.bitar.getAccountData().subscribe(res => {
      this.account = res;
      this.transactions = res.marketTransactions;
      console.log(this.transactions);
    });

    this.bitar.getUserName().subscribe(res => {
      this.username = res;
    });
  }

}
