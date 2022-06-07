import { Component, Input, OnInit } from '@angular/core';
import { IUserSubmission } from 'src/app/models/submission.model';
import { PreprocessingService } from 'src/app/services/preprocessing.service';

@Component({
  selector: 'tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit {
  @Input() user: string = '';
  @Input() userSubmissions: IUserSubmission[] = [];
  labels: string[] = [];
  data: number[] = [];
  chartData: Object = {};
  chartOptions: Object = {};
  constructor(private preprocessingService: PreprocessingService) {}

  ngOnInit(): void {
    const count = this.preprocessingService.getTagsCount(this.userSubmissions);
    count.forEach((value, key) => {
      this.labels.push(key);
      this.data.push(value);
    });
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
        legend: {
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
