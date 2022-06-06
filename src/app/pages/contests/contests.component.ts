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
  sites: string[] = ['All'];
  contests: IContest[] = [];
  futureContests: IContest[] | null = null;
  runningContests: IContest[] | null = null;
  constructor(private kontestService: KontestsService) {}

  ngOnInit(): void {
    const date = localStorage.getItem('date');
    const currentTimeInMinutes = Date.parse(new Date().toDateString()) / 1000;
    if (date && currentTimeInMinutes - Date.parse(date) / 1000 >= 5) {
      this.getContests();
    } else {
      const data: string | null = localStorage.getItem('contests');
      if (data) {
        this.contests = JSON.parse(data);
      } else {
        this.getContests();
      }
    }
    if (this.contests) {
      this.sites = this.sites.concat(
        this.contests
          .map((contest: IContest) => contest.site)
          .filter((value: string, index: number, self: string[]) => {
            return self.indexOf(value) === index;
          })
      );
      this.futureContests = this.contests.filter((contest: IContest) => {
        return contest.status !== 'CODING';
      });
      this.runningContests = this.contests.filter((contest: IContest) => {
        return contest.status === 'CODING';
      });
    }
  }
  getContests() {
    this.kontestService.getContests().subscribe({
      next: (response: IContest[]) => {
        this.contests = response;
        const date = new Date().toDateString();
        localStorage.setItem('date', date);
        localStorage.setItem('contests', JSON.stringify(response));
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  getSiteContests(event: any) {
    const site = this.sites[event.index];
    if (site === 'All') {
      if (this.contests) {
        this.futureContests = this.contests.filter((contest: IContest) => {
          return contest.status !== 'CODING';
        });
        this.runningContests = this.contests.filter((contest: IContest) => {
          return contest.status === 'CODING';
        });
      }
    } else {
      if (this.contests) {
        this.futureContests = this.contests.filter((contest: IContest) => {
          return contest.status !== 'CODING' && contest.site === site;
        });
        this.runningContests = this.contests.filter((contest: IContest) => {
          return contest.status === 'CODING' && contest.site === site;
        });
      }
    }
  }
}
