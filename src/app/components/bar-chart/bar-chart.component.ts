import { Component, Input, OnInit } from '@angular/core';
import { colors1, colors2 } from 'src/app/constants/colors.constant';

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  chartData: Object = {};
  chartOptions: Object = {};
  @Input() labels: string[] = [];
  @Input() data: number[] = [];
  @Input() data2: number[] = [];
  @Input() title: string = '';
  @Input() user: string = '';
  @Input() user2: string = '';
  constructor() {}

  ngOnInit(): void {
    let datasets = [
      {
        label: this.user,
        backgroundColor: colors2,
        yAxisID: 'y',
        data: this.data,
      },
    ];
    if (this.data2.length) {
      datasets.push({
        label: this.user2,
        backgroundColor: colors1,
        yAxisID: 'y',
        data: this.data2,
      });
    }
    this.chartData = {
      labels: this.labels,
      datasets: datasets,
    };
    this.chartOptions = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: this.title,
          // color: 'var(--text-color)',
        },
        legend: {
          display: false,
          position: 'bottom',
          labels: {
            color: '#495057',
          },
        },

        tooltips: {
          mode: 'index',
          intersect: true,
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            min: 0,
            max: 100,
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
        y1: {
          type: 'linear',
          display: false,
          position: 'right',
          grid: {
            drawOnChartArea: false,
            color: '#ebedef',
          },
          ticks: {
            min: 0,
            max: 100,
            color: '#495057',
          },
        },
      },
    };
  }
}
