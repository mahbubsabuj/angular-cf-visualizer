export interface IUserSubmissionRoot {
  status: string;
  result: [];
}

export interface IUserSubmission {
  id: number;
  contestId: number;
  creationTimeSeconds: number;
  relativeTimeSeconds: number;
}

export interface IProblemInfo {
  contestId: number;
  index: string;
  name: string;
  type: string;
  points: number;
  rating: number;
  tags: string[];
  author: IAuthor;
  programmingLanguage: string;
  verdict: string;
  testset: string;
  passedTestCount: number;
  timeConsumedMillis: number;
  memoryConsumedBytes: number;
}

export interface IAuthor {
  contestId: number;
  members: {
    handle: string;
  }[];
  participantType: string;
  ghost: boolean;
  startTimeSeconds: number;
}
