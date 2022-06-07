import { Component, OnInit, Input } from '@angular/core';
import { IUserSubmission } from 'src/app/models/submission.model';

@Component({
  selector: 'level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss']
})
export class LevelComponent implements OnInit {
  @Input() user: string = '';
  @Input() userSubmissions: IUserSubmission[] = [];
  labels: string[] = [];
  data: number[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
