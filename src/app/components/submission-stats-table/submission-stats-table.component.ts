import { Component, Input, OnInit } from '@angular/core';
import { ISubmissionStats } from 'src/app/models/stats.models';
import { IUserSubmission } from 'src/app/models/submission.model';

@Component({
  selector: 'submission-stats-table',
  templateUrl: './submission-stats-table.component.html',
  styleUrls: ['./submission-stats-table.component.scss'],
})
export class SubmissionStatsTableComponent implements OnInit {
  submissionTableInfo: ISubmissionStats | null = null;
  @Input() user: string = '';
  @Input() userSubmissions: IUserSubmission[] = [];
  constructor() {}

  ngOnInit(): void {
    let submissionStats: ISubmissionStats = {
      problemTried: 0,
      problemSolved: 0,
      averageAttempts: 0,
      maxAcceptedSubmissions: 0,
      maxAcceptedSubmissionsProblemId: '',
      maxAttempts: 0,
      maxAttemptsProblemId: '',
      solvedWithSingleSubmission: 0,
    };
    let count = new Map<string, number>();
    let solved = new Map<string, number>();
    this.userSubmissions.forEach((submission) => {
      const id: string = submission.contestId + submission.problem.index;
      const cnt = count.get(id);
      const verdict = submission.verdict;
      if (verdict === 'OK') {
        const solveCount = solved.get(id);
        if (solveCount === undefined) {
          solved.set(id, 1);
        } else {
          solved.set(id, solveCount + 1);
        }
      }
      if (cnt === undefined) {
        count.set(id, 1);
        if (verdict === 'OK') {
          solved.set(id, 1);
        }
      } else {
        count.set(id, cnt + 1);
      }
    });
    submissionStats.problemTried = count.size;
    submissionStats.problemSolved = solved.size;
    submissionStats.averageAttempts =
      solved.size === 0
        ? this.userSubmissions.length
        : this.userSubmissions.length / solved.size;
    count.forEach((value, key) => {
      // console.log(key, value);
      if (value > submissionStats.maxAttempts) {
        submissionStats.maxAttempts = value;
        submissionStats.maxAttemptsProblemId = key;
      }
      if (value === 1 && solved.has(key)) {
        submissionStats.solvedWithSingleSubmission++;
      }
    });
    solved.forEach((value, key) => {
      if (value > submissionStats.maxAcceptedSubmissions) {
        submissionStats.maxAcceptedSubmissions = value;
        submissionStats.maxAcceptedSubmissionsProblemId = key;
      }
    });
    this.submissionTableInfo = submissionStats;
  }
}
