import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-btc-completed',
  templateUrl: './btc.component.html',
  styleUrls: ['./btc.component.scss']
})
export class BtcCompletedComponent implements OnInit {

  txid: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.txid = this.route.snapshot.paramMap.get('txid');
  }

}
