import { Component, Input, OnInit } from '@angular/core';
import { IRatedContest } from 'src/app/models/ratedContest.model';
import { IContestStats, ISubmissionStats } from 'src/app/models/stats.models';
import { IUserSubmission } from 'src/app/models/submission.model';
import { PreprocessingService } from 'src/app/services/preprocessing.service';

@Component({
  selector: 'compare-table',
  templateUrl: './compare-table.component.html',
  styleUrls: ['./compare-table.component.scss'],
})
export class CompareTableComponent implements OnInit {
  @Input() handle1: string = '';
  @Input() handle2: string = '';
  @Input() userSubmissions1: IUserSubmission[] = [];
  @Input() userSubmissions2: IUserSubmission[] = [];
  @Input() userRatedContestsInfo1: IRatedContest[] = [];
  @Input() userRatedContestsInfo2: IRatedContest[] = [];
  userContestStats1: IContestStats | null = null;
  userContestStats2: IContestStats | null = null;
  userSubmissionStats1: ISubmissionStats | null = null;
  userSubmissionStats2: ISubmissionStats | null = null;
  constructor(private preprocessingService: PreprocessingService) {}

  ngOnInit(): void {
    this.userContestStats1 = this.preprocessingService.getUserContestStats(this.userRatedContestsInfo1);
    this.userContestStats2 = this.preprocessingService.getUserContestStats(this.userRatedContestsInfo2);
    this.userSubmissionStats1 = this.preprocessingService.getUserSubmissionStats(this.userSubmissions1);
    this.userSubmissionStats2 = this.preprocessingService.getUserSubmissionStats(this.userSubmissions2);
  }
}
