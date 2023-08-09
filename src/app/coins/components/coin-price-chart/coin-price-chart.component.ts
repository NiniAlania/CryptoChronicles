import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChange, ViewChild } from '@angular/core';
import { ChartOptions, ColorType, createChart, DeepPartial, IChartApi, ISeriesApi, SingleValueData, Time } from 'lightweight-charts';
import { CoinPrice } from '../../models/coin-chart.model';

@Component({
  selector: 'cc-coin-price-chart',
  templateUrl: './coin-price-chart.component.html',
  styleUrls: ['./coin-price-chart.component.scss']
})
export class CoinPriceChartComponent implements OnChanges {
  @Input() coinPrices: CoinPrice[] | null | undefined;

  @ViewChild('container', {static: true}) container: ElementRef | undefined;

  chart: IChartApi | undefined;
  baselineSeries: ISeriesApi<"Baseline"> | undefined;

  ngOnInit() {
    const chartOptions: DeepPartial<ChartOptions> = {
        layout: { textColor: 'black',
                  background: { type: ColorType.Solid, color: 'white' }},
        autoSize: true,
        handleScale: false,
        handleScroll: false
        };
    this.chart = createChart(this.container?.nativeElement, chartOptions);
    this.baselineSeries = this.chart?.addBaselineSeries({
       baseValue: 
       { type: 'price', price: 0 }, 
       topLineColor: 'rgba( 38, 166, 154, 1)', 
       topFillColor1: 'rgba( 38, 166, 154, 0.28)', 
       topFillColor2: 'rgba( 38, 166, 154, 0.05)', 
       bottomLineColor: 'rgba( 239, 83, 80, 1)', 
       bottomFillColor1: 'rgba( 239, 83, 80, 0.05)',
        bottomFillColor2: 'rgba( 239, 83, 80, 0.28)' 
    });
  }

  ngOnChanges() {
    // this.chart?.resize(width: 100%, height: 100%) {}
    if (this.coinPrices) {
      if (this.baselineSeries) {
        this.chart?.removeSeries(this.baselineSeries);
      }
      this.baselineSeries = this.chart?.addBaselineSeries({ 
        baseValue: 
          { type: 'price', price: this.coinPrices[0].value }, 
          topLineColor: 'rgba( 38, 166, 154, 1)', 
          topFillColor1: 'rgba( 38, 166, 154, 0.28)',
          topFillColor2: 'rgba( 38, 166, 154, 0.05)', 
          bottomLineColor: 'rgba( 239, 83, 80, 1)', 
          bottomFillColor1: 'rgba( 239, 83, 80, 0.05)', 
          bottomFillColor2: 'rgba( 239, 83, 80, 0.28)' 
      });
      const data: SingleValueData[] = this.coinPrices;

      this.baselineSeries?.setData(data.map(x => ({value: x.value, time: (Number(x.time) / 1000) as Time})));

      this.chart?.timeScale().fitContent();
    }
  }
}
