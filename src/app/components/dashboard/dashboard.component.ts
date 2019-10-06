import { Component, OnInit } from '@angular/core';
import { BitarApiService } from 'src/app/services/bitar-api.service';
import { HttpClient } from '@angular/common/http';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  accountData: AccountData;
  accountBTCBalance: number;  

  constructor(http: HttpClient, public stock: StockService) {
    http.get<AccountData>("https://api.bitar.is/accountdata/getaccountdata").subscribe(result => {
      console.log(result);
      this.accountData = result;
    }, error => console.error(error));
    http.get<number>("https://api.bitar.is/accountdata/getaddressbalance").subscribe(result => {
      console.log(result);
      this.accountBTCBalance = result;
    }, error => console.error(error));
  }


  ngOnInit() {

  }
}

interface Transaction {
  id: string;
  date: string;
  reference: string;
  shortReference: string;
  paymentDetail: string;
  amount: number;
}

interface AccountData {
  id: string;
  withdrawalAddress: string;
  derivation: number;
  balance: number;
  transactions: Transaction[];
}

