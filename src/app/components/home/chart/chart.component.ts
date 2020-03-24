import { Component, OnInit, Renderer2, ElementRef, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { data } from './data';
import { createChart, isBusinessDay, isUTCTimestamp } from 'lightweight-charts';
import { BitarApiService } from '../../../services/bitar-api.service';
import { ChartPair } from '../../../services/chartPair';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {

  OhlcChart: ChartPair;

  @ViewChild('one') d1: ElementRef;

  constructor(private renderer: Renderer2, private bitar: BitarApiService) { }

  ngAfterViewInit() {
    this.bitar.GetChartPair().subscribe(res => {
      this.OhlcChart = res;

      const container = document.createElement('div');
      this.renderer.appendChild(this.d1.nativeElement, container);

      const width = 600;
      const height = 350;

      const chart = createChart(container, {
        width: width,
        height: height,
        priceScale: {
          position: 'left',
          borderVisible: false,
        },
        timeScale: {
          borderVisible: false,
          rightOffset: 2
          
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
            visible: false,
            labelVisible: false
          },
          vertLine: {
            visible: true,
            style: 0,
            width: 2,
            color: 'rgba(32, 38, 46, 0.1)',
            labelVisible: false,
          }
        },
      });

      const series = chart.addAreaSeries({
        topColor: 'rgba(0, 120, 255, 0.2)',
        bottomColor: 'rgba(0, 120, 255, 0.0)',
        lineColor: 'rgba(0, 120, 255, 1)',
        lineWidth: 3
      });

      console.log(this.OhlcChart);
      series.setData(this.OhlcChart.chartData);

      function businessDayToString(businessDay) {
        return businessDay.day + '/' + businessDay.month + '/' + businessDay.year;
      }

      var toolTipWidth = 96;
      var toolTipHeight = 80;
      var toolTipMargin = 15;
      var priceScaleWidth = 50;

      var toolTip = document.createElement('div');
      toolTip.className = 'floating-tooltip-2';
      container.appendChild(toolTip);

      // update tooltip
      chart.subscribeCrosshairMove(function (param) {
        if (!param.time || param.point.x < 0 || param.point.x > width || param.point.y < 0 || param.point.y > height) {
          toolTip.style.display = 'block';
          return;
        }

        var dateStr = isBusinessDay(param.time)
          ? businessDayToString(param.time)
          : new Date(param.time * 1000).toLocaleDateString();

        toolTip.style.display = 'block';
        var price = param.seriesPrices.get(series);
        toolTip.innerHTML = '<div style="color: rgba(0, 120, 255, 0.9)">⬤ BTCEUR</div>' +
          '<div style="font-size: 24px; margin: 4px 0px; color: #20262E">' + Math.round(<number>price) + '</div>' +
          '<div>' + dateStr + '</div>';

        var left = param.point.x;


        if (left > width - toolTipWidth - toolTipMargin) {
          this.left = width - toolTipWidth;
        } else if (left < toolTipWidth / 2) {
          this.left = priceScaleWidth;
        }

        toolTip.style.left = left + 'px';
        toolTip.style.top = 0 + 'px';
      });
    });
  }


  ngOnInit() {

  }
}
