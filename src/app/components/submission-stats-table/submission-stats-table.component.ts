import { Component, Input, OnInit } from '@angular/core';
import { ISubmissionStats } from 'src/app/models/stats.models';
import { IUserSubmission } from 'src/app/models/submission.model';
import { PreprocessingService } from 'src/app/services/preprocessing.service';

@Component({
  selector: 'submission-stats-table',
  templateUrl: './submission-stats-table.component.html',
  styleUrls: ['./submission-stats-table.component.scss'],
})
export class SubmissionStatsTableComponent implements OnInit {
  submissionTableInfo: ISubmissionStats | null = null;
  @Input() user: string = '';
  @Input() userSubmissions: IUserSubmission[] = [];
  constructor(private preprocessingService : PreprocessingService) {}

  ngOnInit(): void {
    this.submissionTableInfo = this.preprocessingService.getUserSubmissionStats(this.userSubmissions);
  }
}
