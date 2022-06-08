export interface IContestStats {
  contestCount: number | null;
  bestRank: number | null;
  worstRank: number | null;
  bestRankContestId: number | null;
  worstRankContestId: number | null;
  maxUp: number | null;
  maxDown: number | null;
  maxUpContestId: number | null;
  maxDownContestId: number | null;
  currentRating: number | null;
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
