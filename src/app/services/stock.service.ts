import { Injectable } from '@angular/core';
import { HubConnectionBuilder } from '@aspnet/signalr';
import { Observable } from 'rxjs';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { Stock, Symbol } from './stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  public BTC: number;
  Stocks: Stock[];
  counter: number = 60;
  lastUpdated: Date;
  countdown: Observable<number>;

  constructor() {
    console.log('Stock service started.');

    const connection = new HubConnectionBuilder()
      .withUrl('https://api.bitar.is/stocks')
      .build();

    connection.start().catch(err => console.error(err.toSting()));

    connection.on('TimerInterval', (x: number) => {
      console.log('LULULULULULULUL');
      console.log(x);
      console.log('wut: ' + this.counter);
      this.counter = Math.round(x);
      console.log('wtf: ' + this.counter);
    });

    connection.on('StocksUpdated', (stocks: Stock[]) => {
      this.Stocks = stocks;
      this.BTC = stocks[Symbol.BTC].price;
      this.lastUpdated = new Date(stocks[Symbol.BTC].lastUpdated);
      this.counter = +this.lastUpdated - Date.now() + 60000;
      console.log(this.Stocks);
      console.log(Date.now());
      console.log(+this.lastUpdated);
    });

  }

  getCounter() {
    return timer(0, 100).pipe(
      map(() => +this.lastUpdated - Date.now())
    );
  }

  calculateNextUpdate(): number {
    return ;
  }

}
