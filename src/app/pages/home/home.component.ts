import { Component, OnInit } from '@angular/core';
import { IUserSubmission } from 'src/app/models/submission.model';
import { CodeforcesService } from 'src/app/services/codeforces.service';
// import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private codeforcesService: CodeforcesService) {}
  ngOnInit(): void {}
  handleSubmit(cfHandle: string) {
    this.codeforcesService.getUserSubmission(cfHandle).subscribe({
      next: (response: IUserSubmission[]) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
