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
  title: string = '';
  constructor(private preprocessingService: PreprocessingService) {}

  ngOnInit(): void {
    const count = this.preprocessingService.getTagsCount(this.userSubmissions);
    count.forEach((value, key) => {
      this.labels.push(key);
      this.data.push(value);
    });
    this.title = 'Problem tags of ' + this.user;
  }
}
