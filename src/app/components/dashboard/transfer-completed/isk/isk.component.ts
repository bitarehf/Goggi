import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-isk-completed',
  templateUrl: './isk.component.html',
  styleUrls: ['./isk.component.scss']
})
export class IskCompletedComponent implements OnInit {

  txid: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.txid = this.route.snapshot.paramMap.get('txid');
  }

}
