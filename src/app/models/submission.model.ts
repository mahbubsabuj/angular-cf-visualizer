export interface IUserSubmissionRoot {
  status: string;
  result: IUserSubmission[];
}

export interface IUserSubmission {
  id: number;
  contestId: number | string;
  creationTimeSeconds: number;
  relativeTimeSeconds: number;
  problem: IProblemInfo;
  author: IAuthorInfo;
  programmingLanguage: string;
  verdict: string;
  testset: string;
  passedTestCount: number;
  timeConsumedMillis: number;
  memoryConsumedBytes: number;
}

export interface IProblemInfo {
  contestId: number;
  index: string;
  name: string;
  type: string;
  points: number;
  rating: string;
  tags: string[];
  
}

export interface IAuthorInfo {
  contestId: number;
  members: {
    handle: string;
  }[];
  participantType: string;
  ghost: boolean;
  startTimeSeconds: number;
}
