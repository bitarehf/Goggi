import { Component, OnInit, Renderer2, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { createChart } from 'lightweight-charts';
import { BitarApiService } from '../../../services/bitar-api.service';
import { ChartPair } from '../../../services/chartPair';
import { formatDate, formatNumber } from '@angular/common';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {

  OhlcChart: ChartPair;
  pri: number;
  date: Date = new Date(2001, 20, 3);
  tada: number = 2000;

  @ViewChild('one') d1: ElementRef;

  constructor(private renderer: Renderer2, private bitar: BitarApiService) { }

  ngAfterViewInit() {
    this.bitar.GetChartPair().subscribe(res => {
      this.OhlcChart = res;

      const container = document.createElement('div');
      this.renderer.appendChild(this.d1.nativeElement, container);

      const chart = createChart(container, {
        width: 1200,
        height: 600,
        layout: {
          fontFamily: 'Open Sans'
        },
        localization: {
          locale: 'is',
          timeFormatter: function (time) {
            var t = new Date(time.year, time.month, time.day);
            return formatDate(t, 'mediumDate', 'is');
          },
          priceFormatter: function (price) {
            return formatNumber(Math.trunc(price), 'is');
          }
        },
        priceScale: {
          borderColor: 'rgba(197, 203, 206, 1)',
          borderVisible: false,
          autoScale: true,
          entireTextOnly: true,
        },
        timeScale: {
          borderVisible: false
        },
        grid: {
          horzLines: {
            color: '#eee',
          },
          vertLines: {
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
            style: 0,
            width: 2,
            color: 'rgba(32, 38, 46, 0.1)',
            labelVisible: true,
          }
        },
      });

      const series = chart.addAreaSeries({
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
}
