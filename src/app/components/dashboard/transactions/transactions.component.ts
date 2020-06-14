import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AccountData, MarketTransaction } from 'src/app/services/accountData';
import { BitarApiService } from 'src/app/services/bitar-api.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  @ViewChild('myTable') table: any;

  account: AccountData;
  username: string;

  timeout: any;
  math = Math;

  // rows: Observable<any[]>;
  transactions: MarketTransaction[];
  selected: [];

  /**
   * Css class overrides
   */
  @Input() cssClasses: any = {
    sortAscending: 'fas fa-angle-up u-datatable__thead-icon',
    sortDescending: 'fas fa-angle-down u-datatable__thead-icon',
    pagerLeftArrow: 'fal fa-chevron-double-left',
    pagerRightArrow: 'fal fa-chevron-double-right',
    pagerPrevious: 'fal fa-step-backward',
    pagerNext: 'fal fa-step-forward'
  };

  /**
   * Message overrides for localization
   *
   * emptyMessage     [default] = 'No data to display'
   * totalMessage     [default] = 'total'
   * selectedMessage  [default] = 'selected'
   */
  messages: any = {
    // Message to show when array is presented
    // but contains no values
    emptyMessage: 'Engar færslur hafa verið framkvæmdar',

    // Footer total message
    totalMessage: 'Samtals',

    // Footer selected message
    selectedMessage: 'Valið'
  };

  constructor(private bitar: BitarApiService) { }

  ngOnInit() {
    console.log('ohh hello there');

    // this.account = this.bitar.getAccountData();

    this.bitar.getAccountData().subscribe(res => {
      this.account = res;
      this.transactions = res.marketTransactions;
      console.log(this.transactions);
    });

    this.bitar.getUserName().subscribe(res => {
      this.username = res;
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

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

}
