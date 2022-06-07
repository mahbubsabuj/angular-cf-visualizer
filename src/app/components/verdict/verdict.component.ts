import { Component, Input, OnInit } from '@angular/core';
import { IUserSubmission } from 'src/app/models/submission.model';

@Component({
  selector: 'verdict',
  templateUrl: './verdict.component.html',
  styleUrls: ['./verdict.component.scss'],
})
export class VerdictComponent implements OnInit {
  @Input() user: string = '';
  @Input() userSubmissions: IUserSubmission[] = [];
  labels: string[] = [];
  data: number[] = [];
  constructor() {}
  ngOnInit(): void {
    let count = new Map<string, number>();
    this.userSubmissions.forEach((submission) => {
      const verdict =
        submission.verdict === 'OK' ? 'Accepted' : submission.verdict;
      const prevCount = count.get(verdict);
      if (prevCount) {
        count.set(verdict, prevCount + 1);
      } else {
        count.set(verdict, 1);
      }
    });
    count.forEach((value, key) => {
      this.labels.push(key);
      this.data.push(value);
    });
  }
}
