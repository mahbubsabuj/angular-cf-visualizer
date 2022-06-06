import { Component, OnInit } from '@angular/core';
import { IRatedContest } from 'src/app/models/ratedContest.model';
import { IContestStats } from 'src/app/models/stats.models';
import { IUserSubmission } from 'src/app/models/submission.model';
import { CodeforcesService } from 'src/app/services/codeforces.service';
// import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userContests: IRatedContest[] = [];
  userSubmissions: IUserSubmission[] = [];
  contestTableInfo: IContestStats | null = null;
  user: string = '';
  constructor(private codeforcesService: CodeforcesService) {}
  ngOnInit(): void {}
  handleSubmit(cfHandle: string) {
    this.user = cfHandle;
    this.contestTableInfo = null;
    this.codeforcesService.getUserSubmission(cfHandle).subscribe({
      next: (response: IUserSubmission[]) => {
        this.userSubmissions = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.codeforcesService.getUserRatedContests(cfHandle).subscribe({
      next: (response: IRatedContest[]) => {
        this.userContests = response;
        let contestStats: IContestStats = {
          contestCount: 0,
          bestRank: Number.MAX_SAFE_INTEGER,
          worstRank: Number.MIN_SAFE_INTEGER,
          bestRankContestId: Number.MAX_SAFE_INTEGER,
          worstRankContestId: Number.MAX_SAFE_INTEGER,
          maxUp: Number.MIN_SAFE_INTEGER,
          maxDown: Number.MAX_SAFE_INTEGER,
          maxUpContestId: 0,
          maxDownContestId: 0,
          currentRating: 0,
        };
        contestStats.contestCount = this.userContests.length;
        if (this.userContests.length !== 0) {
          contestStats.currentRating =
            this.userContests[this.userContests.length - 1].newRating;
        }
        this.userContests.forEach((contest) => {
          if (contestStats.bestRank > contest.rank) {
            contestStats.bestRank = contest.rank;
            contestStats.bestRankContestId = contest.contestId;
          }
          if (contestStats.worstRank < contest.rank) {
            contestStats.worstRank = contest.rank;
            contestStats.worstRankContestId = contest.contestId;
          }
          const delta = contest.newRating - contest.oldRating;
          if (contestStats.maxUp < delta) {
            contestStats.maxUp = delta;
            contestStats.maxUpContestId = contest.contestId;
          }
          if (contestStats.maxDown > delta) {
            contestStats.maxDown = delta;
            contestStats.maxDownContestId = contest.contestId;
          }
        });
        if (contestStats.contestCount === 0) {
          contestStats.contestCount = 'N/A';
        }
        if (contestStats.bestRank === Number.MAX_SAFE_INTEGER) {
          contestStats.bestRankContestId = contestStats.bestRank = 'N/A';
        }
        if (contestStats.worstRank === Number.MIN_SAFE_INTEGER) {
          contestStats.worstRankContestId = contestStats.worstRank = 'N/A';
        }
        if (contestStats.maxUp === Number.MIN_SAFE_INTEGER) {
          contestStats.maxUp = contestStats.maxUpContestId = 'N/A';
        }
        if (contestStats.maxDown === Number.MAX_SAFE_INTEGER) {
          contestStats.maxDown = contestStats.maxDownContestId = 'N/A';
        }
        this.contestTableInfo = contestStats;
      },
    });
  }
}
