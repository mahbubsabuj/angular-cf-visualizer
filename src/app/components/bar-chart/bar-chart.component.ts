import { Component, Input, OnInit } from '@angular/core';

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
  @Input() title: string = '';
  @Input() user: string = '';
  constructor() {}

  ngOnInit(): void {
    this.chartData = {
      labels: this.labels,
      datasets: [
        {
          label: this.user,
          backgroundColor: [
            '#EC407A',
            '#AB47BC',
            '#42A5F5',
            '#7E57C2',
            '#66BB6A',
            '#FFCA28',
            '#26A69A',
          ],
          yAxisID: 'y',
          data: this.data,
        },
      ],
    };
    this.chartOptions = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: this.title,
          color: 'var(--text-color)',
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
      // plugins: {
      //   title: {
      //     display: true,
      //     text: title,
      //     color: color,
      //   },
      //   legend: {
      //     display: true,
      //     position: "bottom",
      //     labels: {
      //       color: color,
      //     },
      //   },
      // },
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
