import { Component, Input, OnInit } from '@angular/core';
import { IRatedContest } from 'src/app/models/ratedContest.model';
import { IUserSubmission } from 'src/app/models/submission.model';
import { PreprocessingService } from 'src/app/services/preprocessing.service';

@Component({
  selector: 'compare-charts',
  templateUrl: './compare-charts.component.html',
  styleUrls: ['./compare-charts.component.scss'],
})
export class CompareChartsComponent implements OnInit {
  @Input() handle1: string = '';
  @Input() handle2: string = '';
  @Input() userSubmissions1: IUserSubmission[] = [];
  @Input() userSubmissions2: IUserSubmission[] = [];
  @Input() userRatedContestsInfo1: IRatedContest[] = [];
  @Input() userRatedContestsInfo2: IRatedContest[] = [];
  //done
  triedVsSolvedUser1: number[] | null = null;
  triedVsSolvedUser2: number[] | null = null;
  triedVsSolvedLabels: string[] = ['Tried', 'Accepted'];

  unsolvedUser1: number[] | null = null;
  unsolvedUser2: number[] | null = null;
  unsolvedLabel: string[] = ['Unsolved'];
  //done
  avgAttemptsUser1: number[] | null = null;
  avgAttemptsUser2: number[] | null = null;
  avgLabel: string[] = ['Average attempt'];
  //done
  maxTriedCountUser1: number[] | null = null;
  maxTriedCountUser2: number[] | null = null;
  maxTriedLabel: string[] = ['Max tried'];
  //done
  maxAcceptedOnSingleProblemUser1: number[] | null = null;
  maxAcceptedOnSingleProblemUser2: number[] | null = null;
  maxAcceptedLabel: string[] = ['Max accepted'];
  //done
  solvedWithSingleSubmissionUser1: number[] | null = null;
  solvedWithSingleSubmissionUser2: number[] | null = null;
  solvedWithSingleSubmissionLabel: string[] = ['Solved with single submission'];
  
  commonProblemsTriedvSolvedUser1: number[] | null = null;
  commonProblemsTriedvSolvedUser2: number[] | null = null;
  commonProblemsTriedvSolvedLabel: string[] = ['Tried', 'Accepted'];
  constructor(private preprocessingService: PreprocessingService) {}

  ngOnInit(): void {
    const submissionStatUser1 = this.preprocessingService.getUserSubmissionStats(this.userSubmissions1);
    const submissionStatUser2 = this.preprocessingService.getUserSubmissionStats(this.userSubmissions2);
    this.triedVsSolvedUser1 = [submissionStatUser1.problemTried, submissionStatUser1.problemSolved];
    this.triedVsSolvedUser2 = [submissionStatUser2.problemTried, submissionStatUser2.problemSolved];
    this.avgAttemptsUser1 = [submissionStatUser1.averageAttempts];
    this.avgAttemptsUser2 = [submissionStatUser2.averageAttempts];
    this.maxTriedCountUser1 = [submissionStatUser1.maxAttempts];
    this.maxTriedCountUser2 = [submissionStatUser2.maxAttempts];
    this.maxAcceptedOnSingleProblemUser1 = [submissionStatUser1.maxAcceptedSubmissions];
    this.maxAcceptedOnSingleProblemUser2 = [submissionStatUser2.maxAcceptedSubmissions];
    this.solvedWithSingleSubmissionUser1 = [submissionStatUser1.solvedWithSingleSubmission];
    this.solvedWithSingleSubmissionUser2 = [submissionStatUser2.solvedWithSingleSubmission];

  }
}
