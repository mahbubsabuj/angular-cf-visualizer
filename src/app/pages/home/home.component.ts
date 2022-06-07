import { Component, OnInit } from '@angular/core';
import { IRatedContest } from 'src/app/models/ratedContest.model';
import { IUserSubmission } from 'src/app/models/submission.model';
import { CodeforcesService } from 'src/app/services/codeforces.service';
// import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userContests: IRatedContest[] | null = null;
  userSubmissions: IUserSubmission[] | null = null;
  user: string = '';
  constructor(private codeforcesService: CodeforcesService) {}
  ngOnInit(): void {}
  handleSubmit(cfHandle: string) {
    this.userContests = null;
    this.userSubmissions = null;
    this.user = cfHandle;
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
      },
    });
  }
}
