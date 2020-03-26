import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {

  a1: boolean = true;
  a2: boolean = true;
  a3: boolean = true;
  a4: boolean = true;
  b1: boolean = true;
  b2: boolean = true;
  b3: boolean = true;
  c1: boolean = true;
  c2: boolean = true;
  c3: boolean = true;
  c4: boolean = true;
  d1: boolean = true;
  d2: boolean = true;
  d3: boolean = true;
  d4: boolean = true;

  constructor() { }

  a1c() {
    this.a1 = !this.a1;
  }

  a2c() {
    this.a2 = !this.a2;
  }

  a3c() {
    this.a3 = !this.a3;
  }

  a4c() {
    this.a4 = !this.a4;
  }

  b1c() {
    this.b1 = !this.b1;
  }

  b2c() {
    this.b2 = !this.b2;
  }

  b3c() {
    this.b3 = !this.b3;
  }

  c1c() {
    this.c1 = !this.c1;
  }

  c2c() {
    this.c2 = !this.c2;
  }

  c3c() {
    this.c3 = !this.c3;
  }

  c4c() {
    this.c4 = !this.c4;
  }

  d1c() {
    this.d1 = !this.d1;
  }

  d2c() {
    this.d2 = !this.d2;
  }

  d3c() {
    this.d3 = !this.d3;
  }

  d4c() {
    this.d4 = !this.d4;
  }

}
