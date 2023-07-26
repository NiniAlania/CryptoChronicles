import { Pipe, PipeTransform } from '@angular/core';
import ChartjsToImage from 'chartjs-to-image';

@Pipe({
  name: 'sparkline'
})
export class SparklinePipe implements PipeTransform {

  transform(data: number[] | undefined, size: 'small' | 'large' = 'large') {
    const chart = new ChartjsToImage();
    chart.setChartJsVersion('4.1.1');

    if (!data) {
        return '';
    }

    const points = data.map((price, index) => ({
        x: index,
        y: price,
    }));

    const startPrice = data[0];
    const endPrice = data[data.length - 1];

    console.log('startPrice', startPrice);
    console.log('endPrice', endPrice);

    const chartColors = {
        red: "rgb(255, 82, 65)",
        green: "rgb(78, 175, 10)",
    };

    const chartColour =
        endPrice > startPrice ? chartColors.green : chartColors.red;

    const config = {
        type: 'line',
        data: {
            datasets: [
                {
                    borderColor: chartColour,
                    borderWidth: 1,
                    data: points,
                    label: 'Large Dataset',
                    radius: 0,
                }
            ]
        },
        options: {
            animation: false,
            parsing: false,
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            },
            plugins: {
                decimation: {
                    enabled: false,
                    algorithm: 'min-max',
                },
                legend: {
                    display: false
                },
            },
            scales: {
                x: {
                    type: 'time',
                    ticks: {
                        source: 'auto',
                        // Disabled rotation for performance
                        maxRotation: 0,
                        autoSkip: true,
                    },
                    display: false,
                },
                y: {
                    display: false,
                }
            }
        }
        };

    chart.setConfig(config);
    if (size === 'large') {
        chart.setWidth(152).setHeight(48);
    } else {
        chart.setWidth(48).setHeight(24);
    }

    chart.setBackgroundColor('transparent');

    return chart.getUrl();

}
}
