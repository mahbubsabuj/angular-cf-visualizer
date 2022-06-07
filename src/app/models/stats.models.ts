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
  problemTried: number;
  problemSolved: number;
  averageAttempts: number;
  maxAttempts: number;
  maxAttemptsProblemId: string;
  solvedWithSingleSubmission: number;
  maxAcceptedSubmissions: number;
  maxAcceptedSubmissionsProblemId: string;
}
