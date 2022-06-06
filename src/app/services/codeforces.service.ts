import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of, switchMap } from 'rxjs';
import {
  IUserSubmission,
  IUserSubmissionRoot,
} from '../models/submission.model';
@Injectable({
  providedIn: 'root',
})
export class CodeforcesService {
  constructor(private httpClient: HttpClient) {}
  getUserSubmission(cfHandle: string): Observable<IUserSubmission[]> {
    return this.httpClient
      .get<IUserSubmissionRoot>(`${environment.cfBaseURL}/user.status`, {
        params: new HttpParams().set('handle', cfHandle).set('from', 1),
      })
      .pipe(
        switchMap((response: IUserSubmissionRoot) => {
          return of(response.result);
        })
      );
  }

}
