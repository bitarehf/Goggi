import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { AccountData } from "src/app/services/accountData";
import { BitarApiService } from "src/app/services/bitar-api.service";
import { StockService } from "src/app/services/stock.service";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  account: AccountData;
  bitcoinBalance: number;
  btc: string = '';
  isk: string = '';
  show: boolean;
  countdown: Observable<number>;

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

  constructor(public stock: StockService, private bitar: BitarApiService) { }

  ngOnInit() {
    this.bitar.getAccountData().subscribe(res => (this.account = res));
    this.bitar.getAddressBalance().subscribe(res => (this.bitcoinBalance = res));
    this.countdown = this.stock.getCounter();
  }

  toNumber(n: string): number {
    return +n.split('.').join('').split(',').join('.');
  }

  iskUpdate() {
    const nisk = +this.isk.split('.').join('');
    if (nisk >= 5000) {
      this.btc = (nisk / this.stock.BTC).toFixed(8).split('.').join(',');
      console.log((nisk / this.stock.BTC).toFixed(8).split('.').join(','));
    } else {
      if (this.btc.length === 0) {
        return;
      } else {
        this.btc = '0,00000000';
        console.log('noice');
      }
    }
  }

  btcUpdate() {
    const nbtc = +this.btc.split(',').join('.');
    console.log(nbtc * this.stock.BTC);
    this.isk = Math.trunc(nbtc * this.stock.BTC).toString().split('.').join(',');
  }

  order() {
    console.log('w0t ' + this.toNumber(this.isk));
    if (this.toNumber(this.isk) >= 5000) {
      this.show = true;
    } else {
      this.show = false;
    }
  }
}
