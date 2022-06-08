import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormControlName,
  Validator,
  Validators,
} from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { IRatedContest } from 'src/app/models/ratedContest.model';
import { IUserSubmission } from 'src/app/models/submission.model';
import { CodeforcesService } from 'src/app/services/codeforces.service';
@Component({
  selector: 'compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss'],
})
export class CompareComponent implements OnInit {
  handle1: string = '';
  handle2: string = '';

  userSubmissions1: IUserSubmission[] | null = null;
  userSubmissions2: IUserSubmission[] | null = null;
  userRatedContestsInfo1: IRatedContest[] | null = null;
  userRatedContestsInfo2: IRatedContest[] | null = null;
  userForm = new FormGroup({
    cfHandle1: new FormControl('', Validators.required),
    cfHandle2: new FormControl('', Validators.required),
  });
  constructor(
    private toast: HotToastService,
    private codeforcesService: CodeforcesService
  ) {}

  ngOnInit(): void {}
  showErrorToast(error: any): void {
    let message = 'Internet error!';
    this.toast.close();
    if (error.error.comment) {
      message = error.error.comment;
    }
    this.toast.error(message);
  }
  showSucessToast(): void {
    this.toast.close();
    this.toast.success('Done!');
  }
  handleSubmit(): void {
    this.userSubmissions1 = null;
    this.userSubmissions2 = null;
    this.userRatedContestsInfo1 = null;
    this.userRatedContestsInfo2 = null;
    if (this.userForm.status === 'VALID') {
      this.handle1 = this.userForm.value.cfHandle1;
      this.handle2 = this.userForm.value.cfHandle2;
      this.toast.loading('Fetching...');
      this.codeforcesService.getUserSubmission(this.handle1).subscribe({
        next: (response: IUserSubmission[]) => {
          this.showSucessToast();
          this.userSubmissions1 = response;
        },
        error: (error) => {
          this.showErrorToast(error);
        },
      });
      this.codeforcesService.getUserSubmission(this.handle2).subscribe({
        next: (response: IUserSubmission[]) => {
          this.showSucessToast();
          this.userSubmissions2 = response;
        },
        error: (error) => {
          this.showErrorToast(error);
        },
      });
      this.codeforcesService.getUserRatedContests(this.handle1).subscribe({
        next: (response: IRatedContest[]) => {
          this.showSucessToast();
          this.userRatedContestsInfo1 = response;
        },
        error: (error) => {
          this.showErrorToast(error);
        },
      });
      this.codeforcesService.getUserRatedContests(this.handle2).subscribe({
        next: (response: IRatedContest[]) => {
          this.showSucessToast();
          this.userRatedContestsInfo2 = response;
        },
        error: (error) => {
          this.showErrorToast(error);
        },
      });
    } else {
      this.toast.warning('Enter both handles');
      this.handle1 = this.handle2 = '';
    }
  }
}
