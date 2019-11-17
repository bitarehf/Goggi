import { Component, OnInit } from '@angular/core';
import { AccountData } from 'src/app/services/accountData';
import { BitarApiService } from 'src/app/services/bitar-api.service';
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import { BitcoinWithdrawal } from './bitcoinWithdrawal';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.scss']
})
export class WithdrawalComponent implements OnInit {

  nbtc: number;
  sbtc: string;
  btcFees: number;
  account: AccountData;
  bitcoinBalance: number;
  result: string;

  btcMask = createNumberMask({
    prefix: '',
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ',',
    decimalLimit: 8
  });

  constructor(private bitar: BitarApiService) { }

  ngOnInit() {
    this.bitar.getAccountData().subscribe(res => (this.account = res));
    this.bitar.getAddressBalance().subscribe(res => {
      this.bitcoinBalance = res;
      this.btcFees = 0.0003;
      this.nbtc = this.bitcoinBalance - this.btcFees;
      this.sbtc = (this.bitcoinBalance - this.btcFees).toLocaleString('da', { maximumFractionDigits: 8 });
      console.log(this.bitcoinBalance);
      console.log(this.nbtc);
      console.log(this.bitcoinBalance - this.btcFees);
      console.log(this.bitcoinBalance - this.btcFees - this.nbtc);
    });

  }

  toNumber(n: string): number {
    return +n.split('.').join('').split(',').join('.');
  }

  toIcelandicLocale(s: number): string {
    return s.toLocaleString('da', { maximumFractionDigits: 8 });
  }

  withdrawBitcoin() {

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
          //this.router.navigate(['order-completed', res.body.toString()]);
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
