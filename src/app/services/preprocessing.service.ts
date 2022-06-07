import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs';
import { IUserSubmission } from '../models/submission.model';

@Injectable({
  providedIn: 'root',
})

export class PreprocessingService {
  constructor() {}
  getAcceptedProblems(userSubmissions: IUserSubmission[]) {
    const solved = userSubmissions.reduce((mp, submission) => {
      const problemId: string =
        (submission.contestId === undefined
          ? 'undefined'
          : submission.contestId) + submission.problem.index.toString();
      if (!mp.has(problemId) && submission.verdict === 'OK') {
        mp.set(problemId, true);
      }
      return mp;
    }, new Map<string, boolean>());
    const filtered = userSubmissions.filter((submission) => {
      const problemId: string =
        (submission.contestId === undefined
          ? 'undefined'
          : submission.contestId) + submission.problem.index.toString();
      if (submission.verdict === 'OK' && solved.has(problemId)) {
        solved.delete(problemId);
        return true;
      } else {
        return false;
      }
    });
    return filtered;
  }

  getTagsCount(userSubmissions: IUserSubmission[]): Map<string, number> {
    const filtered = this.getAcceptedProblems(userSubmissions);
    const count = filtered.reduce((mp, submission) => {
      submission.problem.tags.forEach((tag) => {
        const prevCount = mp.get(tag);
        if (prevCount) {
          mp.set(tag, prevCount + 1);
        } else {
          mp.set(tag, 1);
        }
      });
      return mp;
    }, new Map<string, number>());
    return count;
  }
  getRatingsCount(userSubmissions: IUserSubmission[]): Map<string, number> {
    const filtered = this.getAcceptedProblems(userSubmissions);
    const count = filtered.reduce((mp, submission) => {
      const prevCount = mp.get(submission.problem.rating);
      if (prevCount) {
        mp.set(submission.problem.rating, prevCount + 1);
      } else {
        mp.set(submission.problem.rating, 1);
      }
      return mp;
    }, new Map<string, number>());
    return count;
  }
  getVerdictCount(userSubmissions: IUserSubmission[]): Map<string, number> {
    const count = userSubmissions.reduce((mp, submission) => {
      const verdict = submission.verdict === "OK" ? "ACCEPTED" : submission.verdict;
      const prevCount = mp.get(verdict);
      if (prevCount) {
        mp.set(verdict, prevCount + 1);
      } else {
        mp.set(verdict, 1);
      }
      return mp;
    }, new Map<string, number>());
    return count;
  }
  getLanguageCount(userSubmissions: IUserSubmission[]): Map<string, number> {
    const count = userSubmissions.reduce((mp, submission) => {
      const language = submission.programmingLanguage;
      const prevCount = mp.get(language);
      if (prevCount) {
        mp.set(language, prevCount + 1);
      } else {
        mp.set(language, 1);
      }
      return mp;
    }, new Map<string, number>())
    return count;
  }
  getLevelCount(userSubmissions: IUserSubmission[]): Map<string, number> {
    const filtered = this.getAcceptedProblems(userSubmissions);
    const count = filtered.reduce((mp, submission) => {
      const level = submission.problem.index;
      const prevCount = mp.get(level);
      if (prevCount) {
        mp.set(level, prevCount + 1);
      } else {
        mp.set(level, 1);
      }
      return mp;
    }, new Map<string, number>());
    return count;
  }
}
