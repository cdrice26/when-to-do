export interface Event {
  id: string;
  name: string;
  days: boolean[];
  startTime: Date;
  endTime: Date;
  location: string;
}

export interface Task {
  id: string;
  name: string;
  location: string;
  time: number;
  outside: boolean;
  scheduled: boolean;
}

export interface Settings {
  dayStart: Date;
  dayEnd: Date;
  defaultLocation: string;
  thisWeek: boolean;
  rainThreshold: number;
}

export interface EventOrTask {
  name: string;
  location: string;
  startTime: Date;
  endTime: Date;
}
