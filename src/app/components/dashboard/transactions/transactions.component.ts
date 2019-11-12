import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AccountData, MarketTransaction } from 'src/app/services/accountData';
import { BitarApiService } from 'src/app/services/bitar-api.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  // account: Observable<AccountData>;

  // rows: Observable<any[]>;
  transactions: MarketTransaction[];
  selected: [];

  cssClasses: any = {
    sortAscending: 'fas fa-angle-up u-datatable__thead-icon',
    sortDescending: 'fas fa-angle-down u-datatable__thead-icon',
    pagerLeftArrow: 'datatable-icon-left',
    pagerRightArrow: 'datatable-icon-right',
    pagerPrevious: 'datatable-icon-prev',
    pagerNext: 'datatable-icon-skip'
  };

  constructor(private bitar: BitarApiService) { }

  ngOnInit() {
    console.log('ohh hello there');

    // this.account = this.bitar.getAccountData();

    this.bitar.getAccountData().subscribe(res => {
      this.transactions = res.marketTransactions;
      console.log(this.transactions);
    });

    // this.bitar.getAccountData().subscribe(res => {
    //   const t = JSON.stringify(res.marketTransactions);
    //   const d = JSON.parse(t);
    //   console.log(d);

    //   this.rows = Observable.create(subscriber => {
    //     subscriber.next(d);
    //     subscriber.complete();
    //   });
    // });


  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

}
