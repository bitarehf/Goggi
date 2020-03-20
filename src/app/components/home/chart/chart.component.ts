import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { data } from './data';
import { createChart, isBusinessDay } from 'lightweight-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit() {
    //document.body.style.position = 'relative';

    const container = document.createElement('div');
    this.renderer.appendChild(this.el.nativeElement, container);
    //document.body.appendChild(container);

    const width = 600;
    const height = 300;

    const chart = createChart(container, {
      width: width,
      height: height,
      priceScale: {
        scaleMargins: {
          top: 0.2,
          bottom: 0.2,
        },
        position: 'left',
        borderVisible: false,
      },
      timeScale: {
        borderVisible: false,
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

    series.setData(data);

    function businessDayToString(businessDay) {
      return new Date(Date.UTC(businessDay.year, businessDay.month - 1, businessDay.day, 0, 0, 0)).toLocaleDateString();
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
      toolTip.innerHTML = '<div style="color: rgba(0, 120, 255, 0.9)">⬤ Bitcoin</div>' +
        '<div style="font-size: 24px; margin: 4px 0px; color: #20262E">' + price + '</div>' +
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
  }
}
