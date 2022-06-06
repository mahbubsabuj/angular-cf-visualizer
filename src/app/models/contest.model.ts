export interface IContest {
  name: string;
  url: string;
  start_time: Date;
  end_time: Date;
  site: string;
  in_24_hours: string;
  status: string;
  duration: string | null;
}
