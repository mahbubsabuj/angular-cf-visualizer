import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IContest } from '../models/contest.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class KontestsService {
  constructor(private httpClient: HttpClient) {}
  getContests(): Observable<IContest[]> {
    return this.httpClient.get<IContest[]>(environment.kontestBaseURL);
  }
}
