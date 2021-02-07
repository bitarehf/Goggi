import { Injectable } from '@angular/core';
import { HubConnectionBuilder } from '@aspnet/signalr';
import { BehaviorSubject } from 'rxjs';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Ticker } from './ticker';

@Injectable({
  providedIn: 'root'
})
export class TickerService {

  apiUrl: string = environment.apiUrl + 'tickers';
  lastUpdated: Date;
  private _tickers = new BehaviorSubject<{ [id: string]: Ticker }>({});
  readonly tickers = this._tickers.asObservable();

  constructor() {
    console.log('Stock service started.');

    const connection = new HubConnectionBuilder()
      .withUrl(this.apiUrl)
      .build();

    connection.start().catch(err => console.error(err.toSting()));

    // connection.on('TimerInterval', (x: number) => {
    //   console.log('LULULULULULULUL');
    //   console.log(x);
    //   console.log('wut: ' + this.counter);
    //   this.counter = Math.round(x);
    //   console.log('wtf: ' + this.counter);
    // });

    connection.on('TickersUpdated', (tickers: { [key: string]: Ticker }) => {
      this._tickers.next(tickers);
      this.lastUpdated = new Date(tickers.btcisk.lastUpdated);
      console.table(tickers);
    });
  }

  getCounter() {
    return timer(0, 100).pipe(
      map(() => +this.lastUpdated - Date.now())
    );
  }

}
