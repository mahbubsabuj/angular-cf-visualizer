import { Component, Input, OnInit } from '@angular/core';
import { IUserSubmission } from 'src/app/models/submission.model';

@Component({
  selector: 'language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit {
  @Input() user: string = '';
  @Input() userSubmissions: IUserSubmission[] = [];
  labels: string[] = [];
  data: number[] = [];
  constructor() {}

  ngOnInit(): void {
    let count: Map<string, number> = new Map<string, number>();
    this.userSubmissions.forEach((submission) => {
      const language: string = submission.programmingLanguage;
      const prevCount = count.get(language);
      if (prevCount) {
        count.set(language, prevCount + 1);
      } else {
        count.set(language, 1);
      }
    });
    count.forEach((value, key) => {
      this.labels.push(key);
      this.data.push(value);
    });
    console.log(this.labels, this.data);
  }
}
