import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
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
  contests: IContest[] = [];
  futureContests: IContest[] | null = null;
  runningContests: IContest[] | null = null;
  constructor(
    private kontestService: KontestsService,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    const date = localStorage.getItem('date');
    const currentTimeInMinutes = Date.parse(new Date().toDateString()) / 1000;
    if (date && currentTimeInMinutes - Date.parse(date) / 1000 >= 5) {
      this.getContests();
    } else {
      const data: string | null = localStorage.getItem('contests');
      if (data) {
        this.contests = JSON.parse(data);
        this.setContests();
      } else {
        this.getContests();
      }
    }
  }
  setContests() {
    
    this.sites = [];
    this.sites.push('All');
    
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
    console.log(this.sites)
  }
  getContests() {
    this.toast.loading('Fetching...');
    this.kontestService.getContests().subscribe({
      next: (response: IContest[]) => {
        this.toast.close();
        this.toast.success('Done!');
        this.contests = response;
        const date = new Date().toDateString();
        localStorage.setItem('date', date);
        localStorage.setItem('contests', JSON.stringify(response));
        this.setContests();
      },
      error: (error) => {
        this.toast.close();
        this.toast.error('Error!');
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
