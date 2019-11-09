import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-completed',
  templateUrl: './order-completed.component.html',
  styleUrls: ['./order-completed.component.scss']
})
export class OrderCompletedComponent implements OnInit {

  txid: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.txid = this.route.snapshot.paramMap.get('txid');
  }

}