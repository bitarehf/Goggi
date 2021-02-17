import { formatDate, formatNumber } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { createChart, CrosshairMode } from 'lightweight-charts';
import { BitarApiService } from '../../../services/bitar-api.service';
import { ChartPair } from '../../../services/chartPair';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {

  @ViewChild('one') d1: ElementRef;

  OhlcChart: ChartPair;
  pri: number;
  date: Date = new Date(2001, 20, 3);
  tada: number = 2000;

  container = document.createElement('div');

  chart = createChart(this.container, {
    width: 1000,
    height: 470,
    layout: {
      fontFamily: 'Open Sans'
    },
    localization: {
      locale: 'is',
      timeFormatter (time) {
        let t = new Date(time.year, time.month, time.day);
        return formatDate(t, 'mediumDate', 'is');
      },
      priceFormatter (price) {
        return formatNumber(Math.trunc(price), 'is');
      }
    },
    // priceScale: {
    //   borderColor: 'rgba(197, 203, 206, 1)',
    //   borderVisible: false,
    //   autoScale: true,
    //   entireTextOnly: true,
    // },
    timeScale: {
      borderVisible: false
    },
    grid: {
      horzLines: {
        visible: false,
        color: '#eee',
      },
      vertLines: {
        visible: false,
        color: '#ffffff',
      },
    },
    crosshair: {
      horzLine: {
        visible: true,
        labelVisible: true
      },
      vertLine: {
        visible: true,
        // style: 0,
        // width: 2,
        // color: 'rgba(32, 38, 46, 0.1)',
        labelVisible: true,
      }
    },
  });

  constructor(private renderer: Renderer2, private ngZone: NgZone, private bitar: BitarApiService) {
    window.onresize = (e) => {
      // ngZone.run will help to run change detection.
      this.ngZone.run(() => {
        // console.log("Width: " + window.innerWidth);
        // console.log("Height: " + window.innerHeight);
      });
    };
  }

  ngAfterViewInit() {
    this.bitar.GetChartPair().subscribe(res => {
      this.OhlcChart = res;

      this.renderer.appendChild(this.d1.nativeElement, this.container);

      const series = this.chart.addAreaSeries({
        topColor: 'rgba(33, 150, 243, 0.56)',
        bottomColor: 'rgba(33, 150, 243, 0.04)',
        lineColor: 'rgba(33, 150, 243, 1)',
        lineWidth: 2
      });

      console.log(this.OhlcChart);
      series.setData(this.OhlcChart.chartData);

      // chart.subscribeCrosshairMove(function (param) {

      // });
    });
  }


  ngOnInit() {

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    let width = event.target.innerWidth as number;
    let height = event.target.innerHeight as number;
    let width2 = this.d1.nativeElement.offsetWidth;
    let height2 = this.d1.nativeElement.offsetHeight;
    // console.log('width ' + width2);
    // console.log('height ' + height2);
    this.chart.resize(width2, height2);
  }

}
