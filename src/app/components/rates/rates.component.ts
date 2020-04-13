import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { Ticker } from 'src/app/services/ticker';
import { TickerService } from 'src/app/services/ticker.service';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss']
})
export class RatesComponent implements OnInit {

  countdown;
  tickers: Observable<{ [id: string]: Ticker }>;

  constructor(public ticker: TickerService) { }

  ngOnInit() {
    this.tickers = this.ticker.tickers;
    this.countdown = this.ticker.getCounter();
  }

}
