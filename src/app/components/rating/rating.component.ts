import { Component, Input, OnInit } from '@angular/core';
import { IUserSubmission } from 'src/app/models/submission.model';
import { PreprocessingService } from 'src/app/services/preprocessing.service';

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  @Input() user: string = '';
  @Input() userSubmissions: IUserSubmission[] = [];
  labels: string[] = [];
  data: number[] = [];
  title: string = '';
  constructor(private preprocessingService: PreprocessingService) {}

  ngOnInit(): void {
    const count = this.preprocessingService.getRatingsCount(
      this.userSubmissions
    );
    count.forEach((value, key) => {
      this.labels.push(key);
      this.data.push(value);
    });
    this.title = 'Problem ratings of ' + this.user;
  }
}
