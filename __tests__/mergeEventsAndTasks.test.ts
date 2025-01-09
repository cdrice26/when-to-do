import mergeEventsAndTasks from '../src/helper/mergeEventsAndTasks.ts';
import getDrivingTime from '../src/helper/drivingTime.ts';
import getWeather from '../src/helper/getWeather.ts';
import { MockGetDrivingTime, MockGetWeather } from '@/types/testingTypes.ts';
import { Event, Task } from '../src/types/instances.ts';

jest.mock('../src/helper/drivingTime.ts');
jest.mock('../src/helper/getWeather.ts');

beforeEach(() => {
  jest.clearAllMocks();
});

test('merges events and schedules tasks correctly', async () => {
  const events = [
    {
      location: 'A',
      startTime: new Date(2024, 7, 26, 8, 0),
      endTime: new Date(2024, 7, 26, 10, 0),
      name: 'Event 1'
    },
    {
      location: 'B',
      startTime: new Date(2024, 7, 26, 12, 0),
      endTime: new Date(2024, 7, 26, 14, 0),
      name: 'Event 2'
    }
  ] as Event[];
  const tasks = [
    { id: '1', name: 'Task 1', location: 'C', time: 60, outside: true },
    { id: '2', name: 'Task 2', location: 'D', time: 90, outside: true }
  ];
  const settings = {
    dayStart: new Date(2024, 7, 26, 8, 0),
    dayEnd: new Date(2024, 7, 26, 23, 59),
    defaultLocation: 'E',
    thisWeek: true,
    rainThreshold: 0.2
  };
  const dayOfWeekIndex = 0;

  // Mock implementations
  (getDrivingTime as MockGetDrivingTime).mockImplementation(
    (startLocation: string, endLocation: string) => {
      if (startLocation === 'A' && endLocation === 'C')
        return Promise.resolve(15);
      if (startLocation === 'C' && endLocation === 'B')
        return Promise.resolve(20);
      return Promise.resolve(10); // Default driving time
    }
  );

  (getWeather as MockGetWeather).mockImplementation(
    (location: string, times: Date[]) => {
      if (location === 'C')
        return Promise.resolve([
          { time: times[0], precip: 0.1 },
          { time: times[1], precip: 0.3 }
        ]);
      return Promise.resolve([
        { time: times[0], precip: 0.1 },
        { time: times[1], precip: 0.1 }
      ]);
    }
  );

  const result = await mergeEventsAndTasks(
    events,
    tasks as Task[],
    settings,
    dayOfWeekIndex
  );

  expect(result).toEqual([
    {
      location: 'A',
      startTime: new Date(2024, 7, 26, 8, 0),
      endTime: new Date(2024, 7, 26, 10, 0),
      name: 'Event 1'
    },
    {
      id: '2',
      name: 'Task 2',
      location: 'D',
      startTime: new Date(2024, 7, 26, 10, 10),
      endTime: new Date(2024, 7, 26, 11, 40)
    },
    {
      location: 'B',
      startTime: new Date(2024, 7, 26, 12, 0),
      endTime: new Date(2024, 7, 26, 14, 0),
      name: 'Event 2'
    },
    {
      id: '1',
      name: 'Task 1',
      location: 'C',
      startTime: null,
      endTime: null
    }
  ]);
});

test('handles tasks that cannot be scheduled due to rain', async () => {
  const events = [
    {
      id: '0',
      location: 'A',
      startTime: new Date(2024, 7, 26, 8, 0),
      endTime: new Date(2024, 7, 26, 10, 0),
      name: 'Event 1',
      days: [false, false, false, false, false, false, false]
    }
  ];
  const tasks = [
    { id: '1', name: 'Task 1', location: 'C', time: 60, outside: true }
  ];
  const settings = {
    dayStart: new Date(2024, 7, 26, 0, 0),
    dayEnd: new Date(2024, 7, 26, 23, 59),
    defaultLocation: 'E',
    thisWeek: true,
    rainThreshold: 0.2
  };
  const dayOfWeekIndex = 0;

  (getDrivingTime as MockGetDrivingTime).mockResolvedValue(15);
  (getWeather as MockGetWeather).mockResolvedValue([
    { time: new Date(2024, 7, 26, 10, 15), precip: 0.3 }
  ]);

  const result = await mergeEventsAndTasks(
    events,
    tasks as Task[],
    settings,
    dayOfWeekIndex
  );

  expect(result).toEqual([
    {
      id: '0',
      location: 'A',
      startTime: new Date(2024, 7, 26, 8, 0),
      endTime: new Date(2024, 7, 26, 10, 0),
      name: 'Event 1',
      days: [false, false, false, false, false, false, false]
    },
    { id: '1', name: 'Task 1', location: 'C', startTime: null, endTime: null }
  ]);
});
