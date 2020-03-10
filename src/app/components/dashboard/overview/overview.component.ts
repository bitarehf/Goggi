import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AccountData } from 'src/app/services/accountData';
import { BitarApiService } from 'src/app/services/bitar-api.service';
import { StockService } from 'src/app/services/stock.service';
import createNumberMask from "text-mask-addons/dist/createNumberMask";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  account: AccountData;
  bitcoinBalance: number;
  countdown: Observable<number>;
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
    public stock: StockService,
    public bitar: BitarApiService,
    private router: Router) { }

  ngOnInit() {
    this.bitar.getAccountData().subscribe(res => {
      this.account = res;
      console.log(this.account);
    });
    this.bitar.getAddressBalance().subscribe(res => (this.bitcoinBalance = res));
    this.countdown = this.stock.getCounter();
  }

  toNumber(n: string): number {
    return +n.split('.').join('').split(',').join('.');
  }

  iskUpdate() {
    this.nisk = +this.sisk.split('.').join('');
    if (this.nisk >= 5000) {
      this.nbtc = (this.nisk - (this.account.fee / 100 * this.nisk))  / this.stock.BTC;
      this.sbtc = this.nbtc.toFixed(8).split('.').join(',');
      console.log(this.nbtc);
    } else {
      if (this.sbtc.length === 0) {
        return;
      } else {
        this.nbtc = 0;
        this.sbtc = '0,00000000';
        console.log('noice');
      }
    }
  }

  btcUpdate() {
    this.nbtc = this.toNumber(this.sbtc);
    console.log((this.nbtc + (this.account.fee / 100 * this.nbtc)) * this.stock.BTC);
    this.nisk = Math.trunc((this.nbtc - (this.account.fee / 100 * this.nbtc)) * this.stock.BTC);
    this.sisk = this.nisk.toString().split('.').join(',');
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