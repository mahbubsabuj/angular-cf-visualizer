export interface IContestStats {
  contestCount: number | string;
  bestRank: number | string;
  worstRank: number | string;
  bestRankContestId: number | string;
  worstRankContestId: number | string;
  maxUp: number | string;
  maxDown: number | string;
  maxUpContestId: number | string;
  maxDownContestId: number | string;
  currentRating: number | string;
}

export interface ISubmissionStats {
  problemTried: number | string;
  problemSolved: number | string;
  averageAttempts: number | string;
  maxAttempts: number | string;
  maxAttemptsProblemId: string;
  solvedWithSingleSubmission: number | string;
  maxAcceptedSubmissions: number | string;
  maxAcceptedSubmissionsProblemId: string;
}
