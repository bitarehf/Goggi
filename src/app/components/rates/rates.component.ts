import { Component, OnInit } from '@angular/core';
import { Symbol } from 'src/app/services/stock';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss']
})
export class RatesComponent implements OnInit {

  countdown;

  constructor(public stock: StockService) { }

  ngOnInit() {
    this.countdown = this.stock.getCounter();
  }

}
