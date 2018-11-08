import { Injectable } from '@angular/core';
import { HubConnectionBuilder } from '@aspnet/signalr';
import { Stock, Symbol } from './stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  public BTC: number;
  Stocks: Stock[];

  constructor() { }

  start() {
    console.log('Stock service started.');
    
    let connection = new HubConnectionBuilder()
      .withUrl('https://api.bitar.is/stocks')
      .build();

    connection.start().catch(err => console.error(err.toSting()));

    connection.on('StocksUpdated', (stocks: Stock[]) => {
      this.Stocks = stocks;
      stocks.forEach(element => {
        if (element.symbol == Symbol.BTC) {
          this.BTC = element.price;
          console.log("Price set to: " + element.price);
        }
        console.log(element);
      });
    });
  }

}
