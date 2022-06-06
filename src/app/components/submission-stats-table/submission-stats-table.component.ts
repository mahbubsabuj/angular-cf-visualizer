import { Component, Input, OnInit } from '@angular/core';
import { IUserSubmission } from 'src/app/models/submission.model';

@Component({
  selector: 'submission-stats-table',
  templateUrl: './submission-stats-table.component.html',
  styleUrls: ['./submission-stats-table.component.scss'],
})
export class SubmissionStatsTableComponent implements OnInit {
  @Input() user: string = '';
  @Input() userSubmissions: IUserSubmission[] | null = null;
  constructor() {}

  ngOnInit(): void {
    console.log(this.user);
    
  }
}
