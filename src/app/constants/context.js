import { createContext } from 'react';
import randId from '../helper/UUID';

export const EventsContext = createContext();
export const TasksContext = createContext();
export const SettingsContext = createContext();

export const defaultEvent = [
  {
    name: '',
    days: [false, false, false, false, false, false, false],
    startTime: new Date(0, 0, 0, 0, 0),
    endTime: new Date(0, 0, 0, 23, 59),
    location: '',
    id: randId()
  }
];

export const defaultTask = [
  {
    name: '',
    location: '',
    time: 0,
    scheduled: false,
    outside: false,
    id: randId()
  }
];

export const defaultSettings = {
  dayStart: new Date(0, 0, 0, 0, 0),
  dayEnd: new Date(0, 0, 0, 23, 59),
  defaultLocation: '',
  thisWeek: true,
  rainThreshold: 0.5
};
