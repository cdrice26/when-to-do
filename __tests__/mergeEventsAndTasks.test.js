import mergeEventsAndTasks from '../src/helper/mergeEventsAndTasks';
import getDrivingTime from '../src/helper/drivingTime';
import getWeather from '../src/helper/getWeather';

jest.mock('../src/helper/drivingTime');
jest.mock('../src/helper/getWeather');

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
  ];
  const tasks = [
    { id: 1, name: 'Task 1', location: 'C', time: 60, outside: true },
    { id: 2, name: 'Task 2', location: 'D', time: 90, outside: true }
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
  getDrivingTime.mockImplementation((startLocation, endLocation) => {
    if (startLocation === 'A' && endLocation === 'C')
      return Promise.resolve(15);
    if (startLocation === 'C' && endLocation === 'B')
      return Promise.resolve(20);
    return Promise.resolve(10); // Default driving time
  });

  getWeather.mockImplementation((location, times) => {
    if (location === 'C')
      return Promise.resolve([
        { time: times[0], precip: 0.1 },
        { time: times[1], precip: 0.3 }
      ]);
    return Promise.resolve([
      { time: times[0], precip: 0.1 },
      { time: times[1], precip: 0.1 }
    ]);
  });

  const result = await mergeEventsAndTasks(
    events,
    tasks,
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
      id: 2,
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
      id: 1,
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
      location: 'A',
      startTime: new Date(2024, 7, 26, 8, 0),
      endTime: new Date(2024, 7, 26, 10, 0),
      name: 'Event 1'
    }
  ];
  const tasks = [
    { id: 1, name: 'Task 1', location: 'C', time: 60, outside: true }
  ];
  const settings = {
    dayStart: new Date(2024, 7, 26, 0, 0),
    dayEnd: new Date(2024, 7, 26, 23, 59),
    defaultLocation: 'E',
    thisWeek: true,
    rainThreshold: 0.2
  };
  const dayOfWeekIndex = 0;

  getDrivingTime.mockResolvedValue(15);
  getWeather.mockResolvedValue([
    { time: new Date(2024, 7, 26, 10, 15), precip: 0.3 }
  ]);

  const result = await mergeEventsAndTasks(
    events,
    tasks,
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
    { id: 1, name: 'Task 1', location: 'C', startTime: null, endTime: null }
  ]);
});
