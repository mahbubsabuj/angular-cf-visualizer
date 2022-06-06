import { Component, Input, OnInit } from '@angular/core';
import { IContest } from 'src/app/models/contest.model';

@Component({
  selector: 'contest-table',
  templateUrl: './contest-table.component.html',
  styleUrls: ['./contest-table.component.scss'],
})
export class ContestTableComponent implements OnInit {
  query: string = '';
  @Input() contests: IContest[] = [];
  @Input() title: string = '';
  constructor() {}

  ngOnInit(): void {
    this.title = this.contests.length + " " + this.title;
    if (this.contests.length === 0 || this.contests.length > 1) {
      this.title += 's';
    }
  }
}
