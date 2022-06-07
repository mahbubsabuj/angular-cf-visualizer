import { Component, Input, OnInit } from '@angular/core';
import { IUserSubmission } from 'src/app/models/submission.model';
import { PreprocessingService } from 'src/app/services/preprocessing.service';

@Component({
  selector: 'verdict',
  templateUrl: './verdict.component.html',
  styleUrls: ['./verdict.component.scss'],
})
export class VerdictComponent implements OnInit {
  @Input() user: string = '';
  @Input() userSubmissions: IUserSubmission[] = [];
  labels: string[] = [];
  data: number[] = [];
  title: string = '';
  constructor(private preprocessingService: PreprocessingService) {}
  ngOnInit(): void {
    const count = this.preprocessingService.getVerdictCount(
      this.userSubmissions
    );
    count.forEach((value, key) => {
      this.labels.push(key);
      this.data.push(value);
    });
    this.title = 'Verdicts of ' + this.user;
  }
}
