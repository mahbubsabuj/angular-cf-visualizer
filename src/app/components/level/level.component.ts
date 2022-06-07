import { Component, OnInit, Input } from '@angular/core';
import { IUserSubmission } from 'src/app/models/submission.model';
import { PreprocessingService } from 'src/app/services/preprocessing.service';

@Component({
  selector: 'level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss'],
})
export class LevelComponent implements OnInit {
  @Input() user: string = '';
  @Input() userSubmissions: IUserSubmission[] = [];
  labels: string[] = [];
  data: number[] = [];
  chartData: Object = {};
  chartOptions: Object = {};
  title: string = '';
  constructor(private preprocessingService: PreprocessingService) {}

  ngOnInit(): void {
    const count = this.preprocessingService.getLevelCount(this.userSubmissions);
    count.forEach((value, key) => {
      this.labels.push(key);
      this.data.push(value);
    });
    this.title = 'Problem Levels of ' + this.user;
  }
}
