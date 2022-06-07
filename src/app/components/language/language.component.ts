import { Component, Input, OnInit } from '@angular/core';
import { IUserSubmission } from 'src/app/models/submission.model';
import { PreprocessingService } from 'src/app/services/preprocessing.service';

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
  title: string = '';
  constructor(private preprocessingService: PreprocessingService) {}

  ngOnInit(): void {
    const count = this.preprocessingService.getLanguageCount(
      this.userSubmissions
    );
    count.forEach((value, key) => {
      this.labels.push(key);
      this.data.push(value);
    });
    this.title = 'Languages used by ' + this.user;
  }
}
