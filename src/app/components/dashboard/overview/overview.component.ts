import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AccountData } from 'src/app/services/accountData';
import { BitarApiService } from 'src/app/services/bitar-api.service';
import { Ticker } from 'src/app/services/ticker';
import { TickerService } from 'src/app/services/ticker.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  countdown: Observable<number>;
  tickers: { [id: string]: Ticker };

  account: AccountData;
  bitcoinBalance: number;

  nbtc: number;
  nisk: number;
  sbtc: string = '';
  sisk: string = '';
  show: boolean;

  constructor(
    public tickerService: TickerService,
    public bitar: BitarApiService,
    private router: Router) { }

  ngOnInit() {
    this.bitar.getAccountData().subscribe(res => {
      this.account = res;
      console.log(this.account);
    });
    this.bitar.getAddressBalance().subscribe(res => this.bitcoinBalance = res);
    this.tickerService.tickers.subscribe(tickers => this.tickers = tickers);
    this.countdown = this.tickerService.getCounter();
  }

  toNumber(s: string): number {
    return +s.split('.').join('').split(',').join('.');
  }

  iskUpdate() {
    this.nisk = this.toNumber(this.sisk);
    this.nbtc = this.convertISKToBTC(this.nisk);
    this.sbtc = this.nbtc.toLocaleString('da', { maximumFractionDigits: 8 });
    console.table([this.nisk, this.sisk, this.nbtc, this.sbtc]);
  }

  btcUpdate() {
    this.nbtc = this.toNumber(this.sbtc);
    this.nisk = this.convertBTCToISK(this.nbtc);
    this.sisk = this.nisk.toLocaleString('da', { maximumFractionDigits: 0 });
    console.table([this.nisk, this.sisk, this.nbtc, this.sbtc]);
  }

  convertISKToBTC(isk: number) {
    return +(isk / Math.ceil(this.tickers.btcisk.ask * (1 + this.account.fee / 100))).toFixed(8);
  }

  convertBTCToISK(btc: number) {
    return Math.ceil(btc * Math.ceil(this.tickers.btcisk.ask * (1 + this.account.fee / 100)));
  }

  order() {
    console.log('w0t ' + this.nisk);
    if (this.nisk >= 5000) {
      this.show = true;
    } else {
      this.show = false;
    }
  }

  orderConfirm() {
    this.bitar.order(this.nisk).subscribe(
      res => {
        if (res.ok) {
          console.log('Order completed');
          console.log(res.body.toString());
          this.router.navigate(['order-completed', res.body.toString()]);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}