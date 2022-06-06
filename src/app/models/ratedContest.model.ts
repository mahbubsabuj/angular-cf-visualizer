export interface IRatedContestRoot {
  status: string;
  result: IRatedContest[];
}

export interface IRatedContest {
  contestId: number;
  contestName: string;
  handle: string;
  rank: number;
  ratingUpdateTimeSeconds: number;
  oldRating: number;
  newRating: number;
}
