import { Component, OnInit } from '@angular/core';
import { IContest } from 'src/app/models/contest.model';
import { KontestsService } from 'src/app/services/kontests.service';

@Component({
  selector: 'contests',
  templateUrl: './contests.component.html',
  styleUrls: ['./contests.component.scss'],
})
export class ContestsComponent implements OnInit {
  query: string = '';
  sites: string[] = [];
  contests: IContest[] | null = null;
  futureContests: IContest[] = [];
  runningContests: IContest[] = [];
  constructor(private kontestService: KontestsService) {}

  ngOnInit(): void {
    this.kontestService.getContests().subscribe({
      next: (response: IContest[]) => {
        this.contests = response;
        this.sites = response
          .map((contest: IContest) => contest.site)
          .filter((value: string, index: number, self: string[]) => {
            return self.indexOf(value) === index;
          });
          this.futureContests = response.filter((contest: IContest) => {
            return contest.status !== "CODING";
          });
          this.runningContests = response.filter((contest: IContest) => {
            return contest.status === "CODING";
          })
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
