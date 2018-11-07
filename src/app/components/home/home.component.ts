import { Component, OnInit } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let options = {
      strings: ["einfaldan hátt?", "ódýran hátt?", "öruggan hátt?"],
      typeSpeed: 60,
      loop: true,
      backSpeed: 25,
      backDelay: 1500
    }

    let typed = new Typed(".writer", options);
  }

}
