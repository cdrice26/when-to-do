import { mergeOverlappingEvents } from '../src/helper/mergeEventsAndTasks';

test('merges overlapping events correctly', () => {
  const events = [
    {
      location: 'A',
      startTime: new Date(2024, 7, 26, 8, 0),
      endTime: new Date(2024, 7, 26, 10, 0),
      name: 'Event 1'
    },
    {
      location: 'A',
      startTime: new Date(2024, 7, 26, 9, 0),
      endTime: new Date(2024, 7, 26, 11, 0),
      name: 'Event 2'
    },
    {
      location: 'B',
      startTime: new Date(2024, 7, 26, 12, 0),
      endTime: new Date(2024, 7, 26, 14, 0),
      name: 'Event 3'
    }
  ];

  const expected = [
    {
      location: 'A',
      startTime: new Date(2024, 7, 26, 8, 0),
      endTime: new Date(2024, 7, 26, 11, 0),
      name: 'Event 1 and Event 2'
    },
    {
      location: 'B',
      startTime: new Date(2024, 7, 26, 12, 0),
      endTime: new Date(2024, 7, 26, 14, 0),
      name: 'Event 3'
    }
  ];

  const result = mergeOverlappingEvents(events);

  expect(result).toEqual(expected);
});

test('handles non-overlapping events correctly', () => {
  const events = [
    {
      location: 'A',
      startTime: new Date(2024, 7, 26, 8, 0),
      endTime: new Date(2024, 7, 26, 10, 0),
      name: 'Event 1'
    },
    {
      location: 'B',
      startTime: new Date(2024, 7, 26, 11, 0),
      endTime: new Date(2024, 7, 26, 12, 0),
      name: 'Event 2'
    }
  ];

  const expected = [
    {
      location: 'A',
      startTime: new Date(2024, 7, 26, 8, 0),
      endTime: new Date(2024, 7, 26, 10, 0),
      name: 'Event 1'
    },
    {
      location: 'B',
      startTime: new Date(2024, 7, 26, 11, 0),
      endTime: new Date(2024, 7, 26, 12, 0),
      name: 'Event 2'
    }
  ];

  const result = mergeOverlappingEvents(events);

  expect(result).toEqual(expected);
});

test('returns empty array if no events are provided', () => {
  const events: any = [];

  const expected: any = [];

  const result = mergeOverlappingEvents(events);

  expect(result).toEqual(expected);
});
