import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AccountData } from 'src/app/services/accountData';
import { BitarApiService } from 'src/app/services/bitar-api.service';
import { Ticker } from 'src/app/services/ticker';
import { TickerService } from 'src/app/services/ticker.service';
import createNumberMask from "text-mask-addons/dist/createNumberMask";

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

  iskMask = createNumberMask({
    prefix: '',
    thousandsSeparatorSymbol: '.'
  });

  btcMask = createNumberMask({
    prefix: '',
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ',',
    decimalLimit: 8
  });

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

  // iskUpdate2()
  // {
  //   this.nisk = this.toNumber(this.sisk);
  //   let fee = (this.account.fee / 100) * this.nisk;
  //   this.nbtc = +(this.nisk / this.tickers.btcisk.ask - (fee / this.tickers.btcisk.ask)).toFixed(8);
  //   this.sbtc = this.nbtc.toLocaleString('da', { maximumFractionDigits: 8 });
  //   console.table([this.nisk, this.sisk, this.nbtc, this.sbtc]);
  //   console.log(fee / this.tickers.btcisk.ask);
  // }

  // btcUpdate2() {
  //   this.nbtc = this.toNumber(this.sbtc);
  //   this.nisk = Math.floor(this.nbtc * (1 + (this.account.fee / 100)) * this.tickers.btcisk.ask);
  //   // let fee = this.nbtc / 100 * this.account.fee;
  //   // this.nisk = Math.floor((this.nbtc - fee) * this.tickers.btcisk.ask);
  //   this.sisk = this.nisk.toLocaleString('da', { maximumFractionDigits: 0 });
  //   console.table([this.nisk, this.sisk, this.nbtc, this.sbtc]);
  // }

  // iskUpdate() {
  //   this.nisk = +this.sisk.split('.').join('');
  //   if (this.nisk >= 5000) {
  //     this.nbtc = (this.nisk - (this.account.fee / 100 * this.nisk));
  //     // this.nbtc = (this.nisk - (this.account.fee / 100 * this.nisk))  / this.stock.BTC;
  //     this.sbtc = this.nbtc.toFixed(8).split('.').join(',');
  //     console.log(this.nbtc);
  //   } else {
  //     if (this.sbtc.length === 0) {
  //       return;
  //     } else {
  //       this.nbtc = 0;
  //       this.sbtc = '0,00000000';
  //       console.log('noice');
  //     }
  //   }
  // }

  // btcUpdate() {
  //   this.nbtc = this.toNumber(this.sbtc);
  //   console.log((this.nbtc + (this.account.fee / 100 * this.nbtc)));
  //   this.nisk = Math.trunc((this.nbtc - (this.account.fee / 100 * this.nbtc)));
  //   // console.log((this.nbtc + (this.account.fee / 100 * this.nbtc)) * this.stock.BTC);
  //   // this.nisk = Math.trunc((this.nbtc - (this.account.fee / 100 * this.nbtc)) * this.stock.BTC);
  //   this.sisk = this.nisk.toString().split('.').join(',');
  // }

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