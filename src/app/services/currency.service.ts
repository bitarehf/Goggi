import { Injectable } from '@angular/core';
import { HubConnectionBuilder } from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor() { }

  public tada() {
    console.log('Hallo');
    
    let connection = new HubConnectionBuilder()
      .withUrl('http://localhost:5000/currency')
      .build();

    connection.start().catch(err => console.error(err.toSting()));

    connection.on('currenciesUpdated', data => {
      console.log(data);
    });
  }
}
