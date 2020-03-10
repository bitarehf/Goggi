import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountData } from 'src/app/services/accountData';
import { BitarApiService } from 'src/app/services/bitar-api.service';
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import { BitcoinWithdrawal } from '../bitcoinWithdrawal';

@Component({
  selector: 'app-btc',
  templateUrl: './btc.component.html',
  styleUrls: ['./btc.component.scss']
})
export class BtcComponent implements OnInit {

  account: AccountData;
  bitcoinBalance: number;
  nbtc: number = 0;
  sbtc: string;
  btcFees: number;
  result: string;
  show: boolean;

  btcMask = createNumberMask({
    prefix: '',
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ',',
    decimalLimit: 8
  });

  constructor(private bitar: BitarApiService, private router: Router) { }

  ngOnInit() {
    this.bitar.getAccountData().subscribe(res => (this.account = res));
    this.bitar.getAddressBalance().subscribe(res => {
      this.bitcoinBalance = res;
      this.btcFees = 0.0003;

      if (this.bitcoinBalance - this.btcFees >= 0.0005) {
        this.nbtc = this.bitcoinBalance - this.btcFees;
        this.sbtc = (this.bitcoinBalance - this.btcFees).toLocaleString('da', { maximumFractionDigits: 8 });
      }
    });
  }

  toNumber(n: string): number {
    return +n.split('.').join('').split(',').join('.');
  }

  toIcelandicLocale(s: number): string {
    return s.toLocaleString('da', { maximumFractionDigits: 8 });
  }

  withdrawBitcoin() {
    console.log('w0t ' + this.nbtc);

    if (this.account.withdrawalAddress == null) {
      return;
    }

    if (this.nbtc >= 0.0005 && this.nbtc <= this.bitcoinBalance) {
      this.show = true;
    } else {
      this.show = false;
    }
  }

  withdrawBitcoinConfirm() {

    const bitcoinWithdrawal: BitcoinWithdrawal = {
      amount: this.nbtc,
      fees: this.btcFees
    };

    console.log('===');
    console.log(bitcoinWithdrawal.amount);
    console.log(bitcoinWithdrawal.fees);

    this.bitar.withdrawBitcoin(bitcoinWithdrawal).subscribe(
      res => {
        if (res.ok) {
          console.log('Transaction request successful');
          this.result = res.body;
          console.log(this.result);
          this.router.navigate(['/dashboard/withdrawal-completed/btc', res.body.toString()]);
        }
      },
      err => {
        console.log(err);
      }
    );

  }

  btcUpdate() {
    this.nbtc = this.toNumber(this.sbtc);
  }

}
