import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs';
import { IRatedContest } from '../models/ratedContest.model';
import { IContestStats, ISubmissionStats } from '../models/stats.models';
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
  getUserContestStats(userContests: IRatedContest[]) {
    let contestStats: IContestStats = {
      contestCount: 0,
      bestRank: Number.MAX_SAFE_INTEGER,
      worstRank: Number.MIN_SAFE_INTEGER,
      bestRankContestId: Number.MAX_SAFE_INTEGER,
      worstRankContestId: Number.MAX_SAFE_INTEGER,
      maxUp: Number.MIN_SAFE_INTEGER,
      maxDown: Number.MAX_SAFE_INTEGER,
      maxUpContestId: 0,
      maxDownContestId: 0,
      currentRating: 0,
    };
    contestStats.contestCount = userContests.length;
    if (userContests.length !== 0) {
      contestStats.currentRating =
        userContests[userContests.length - 1].newRating;
    }
    userContests.forEach((contest) => {
      if (contestStats.bestRank && contestStats.bestRank > contest.rank) {
        contestStats.bestRank = contest.rank;
        contestStats.bestRankContestId = contest.contestId;
      }
      if (contestStats.worstRank && contestStats.worstRank < contest.rank) {
        contestStats.worstRank = contest.rank;
        contestStats.worstRankContestId = contest.contestId;
      }
      const delta = contest.newRating - contest.oldRating;
      if (contestStats.maxUp && contestStats.maxUp < delta) {
        contestStats.maxUp = delta;
        contestStats.maxUpContestId = contest.contestId;
      }
      if (contestStats.maxDown && contestStats.maxDown > delta) {
        contestStats.maxDown = delta;
        contestStats.maxDownContestId = contest.contestId;
      }
    });
    if (contestStats.contestCount === 0) {
      contestStats.contestCount = null;
    }
    if (contestStats.bestRank === Number.MAX_SAFE_INTEGER) {
      contestStats.bestRankContestId = contestStats.bestRank = null;
    }
    if (contestStats.worstRank === Number.MIN_SAFE_INTEGER) {
      contestStats.worstRankContestId = contestStats.worstRank = null;
    }
    if (contestStats.maxUp === Number.MIN_SAFE_INTEGER) {
      contestStats.maxUp = contestStats.maxUpContestId = null;
    }
    if (contestStats.maxDown === Number.MAX_SAFE_INTEGER) {
      contestStats.maxDown = contestStats.maxDownContestId = null;
    }
    return contestStats;
  }
  getUserSubmissionStats(userSubmissions: IUserSubmission[]) {
    let submissionStats: ISubmissionStats = {
      problemTried: 0,
      problemSolved: 0,
      averageAttempts: 0,
      maxAcceptedSubmissions: 0,
      maxAcceptedSubmissionsProblemId: '',
      maxAttempts: 0,
      maxAttemptsProblemId: '',
      solvedWithSingleSubmission: 0,
    };
    let count = new Map<string, number>();
    let solved = new Map<string, number>();
    userSubmissions.forEach((submission) => {
      const id: string = submission.contestId + submission.problem.index;
      const cnt = count.get(id);
      const verdict = submission.verdict;
      if (verdict === 'OK') {
        const solveCount = solved.get(id);
        if (solveCount === undefined) {
          solved.set(id, 1);
        } else {
          solved.set(id, solveCount + 1);
        }
      }
      if (cnt === undefined) {
        count.set(id, 1);
        if (verdict === 'OK') {
          solved.set(id, 1);
        }
      } else {
        count.set(id, cnt + 1);
      }
    });
    submissionStats.problemTried = count.size;
    submissionStats.problemSolved = solved.size;
    submissionStats.averageAttempts =
      solved.size === 0
        ? userSubmissions.length
        : userSubmissions.length / solved.size;
    count.forEach((value, key) => {
      // console.log(key, value);
      if (value > submissionStats.maxAttempts) {
        submissionStats.maxAttempts = value;
        submissionStats.maxAttemptsProblemId = key;
      }
      if (value === 1 && solved.has(key)) {
        submissionStats.solvedWithSingleSubmission++;
      }
    });
    solved.forEach((value, key) => {
      if (value > submissionStats.maxAcceptedSubmissions) {
        submissionStats.maxAcceptedSubmissions = value;
        submissionStats.maxAcceptedSubmissionsProblemId = key;
      }
    });
    return submissionStats;
  }
}
