import { Component, Input, OnInit } from '@angular/core';
import { PreprocessingService } from 'src/app/services/preprocessing.service';
import { IRatedContest } from '../../models/ratedContest.model';
import { IContestStats } from '../../models/stats.models';

@Component({
  selector: 'contest-stats-table',
  templateUrl: './contest-stats-table.component.html',
  styleUrls: ['./contest-stats-table.component.scss'],
})
export class ContestStatsTableComponent implements OnInit {
  contestTableInfo: IContestStats | null = null;
  @Input() userContests: IRatedContest[] = [];
  @Input() user: string = '';
  constructor(private preprocessingService: PreprocessingService) {}

  ngOnInit(): void {
    this.contestTableInfo = this.preprocessingService.getUserContestStats(
      this.userContests
    );
  }
}
