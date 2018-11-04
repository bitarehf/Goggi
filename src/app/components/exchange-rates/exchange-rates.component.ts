import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.scss']
})
export class ExchangeRatesComponent implements OnInit {

  asdf: number = 2;

  constructor(public stock: StockService) { }

  ngOnInit() {
    this.stock.tada();
    console.log("test");
  }

}
