import { Component, OnInit } from '@angular/core';
import { BitarApiService } from 'src/app/services/bitar-api.service';
import { Router } from '@angular/router';
import { AccountData } from 'src/app/services/accountData';
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import { iskWithdrawal } from '../iskWithdrawal';

@Component({
  selector: 'app-isk',
  templateUrl: './isk.component.html',
  styleUrls: ['./isk.component.scss']
})
export class IskComponent implements OnInit {

  account: AccountData;
  bitcoinBalance: number;
  withdrawalAmount: number;
  sWithdrawalAmount: string;
  result: string;
  show: boolean;

  iskMask = createNumberMask({
    prefix: '',
    thousandsSeparatorSymbol: '.',
    allowDecimal: false,
    decimalSymbol: ',',
    decimalLimit: 8
  });

  constructor(private bitar: BitarApiService, private router: Router) { }

  ngOnInit() {
    this.bitar.getAccountData().subscribe(res => {
      this.account = res;
      console.log(this.account);
    });
  }

  toNumber(n: string): number {
    return +n.split('.').join('').split(',').join('.');
  }

  toIcelandicLocale(s: number): string {
    return s.toLocaleString('da', { maximumFractionDigits: 8 });
  }

  withdrawISK() {
    console.log('w0t ' + this.withdrawalAmount);

    if (this.withdrawalAmount == 0) {
      return;
    }

    if (this.account.balance >= this.withdrawalAmount) {
      this.show = true;
    } else {
      this.show = false;
    }
  }

  withdrawISKConfirm() {

    console.log('===');
    console.log(this.withdrawalAmount);
    console.log(this.account.bankAccountNumber);

    this.bitar.withdrawISK(this.withdrawalAmount).subscribe(res => {
      if (res.ok) {
        console.log('Transaction request successful');
        this.result = res.body;
        console.log(this.result);
        this.router.navigate(['/dashboard/withdrawal-completed/isk', res.body.toString()]);
      }
    }, err => {
      console.log(err);
    });
  }

  iskUpdate() {
    this.withdrawalAmount = this.toNumber(this.sWithdrawalAmount);
  }

}
