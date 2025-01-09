import {
  buildDateList,
  getLastSunday
} from '../src/helper/mergeEventsAndTasks';
import { addDays } from 'date-fns';

test('builds date list correctly for the current week', () => {
  const startTime = new Date(2024, 7, 26, 8, 0); // Start time: 8 AM
  const endTime = new Date(2024, 7, 26, 10, 0); // End time: 10 AM
  const day = 0; // Sunday
  const isThisWeek = true;

  const lastSunday = getLastSunday(new Date());
  const dayOfInterest = addDays(lastSunday, day);

  const expected = [
    new Date(
      dayOfInterest.getFullYear(),
      dayOfInterest.getMonth(),
      dayOfInterest.getDate(),
      8,
      0
    ),
    new Date(
      dayOfInterest.getFullYear(),
      dayOfInterest.getMonth(),
      dayOfInterest.getDate(),
      9,
      0
    )
  ];

  const result = buildDateList(startTime, endTime, day, isThisWeek);

  expect(result).toEqual(expected);
});

test('builds date list correctly for the next week', () => {
  const startTime = new Date(2024, 7, 26, 8, 0); // Start time: 8 AM
  const endTime = new Date(2024, 7, 26, 10, 0); // End time: 10 AM
  const day = 0; // Sunday
  const isThisWeek = false;

  const lastSunday = getLastSunday(new Date());
  const nextSunday = addDays(lastSunday, 7);
  const dayOfInterest = addDays(nextSunday, day);

  const expected = [
    new Date(
      dayOfInterest.getFullYear(),
      dayOfInterest.getMonth(),
      dayOfInterest.getDate(),
      8,
      0
    ),
    new Date(
      dayOfInterest.getFullYear(),
      dayOfInterest.getMonth(),
      dayOfInterest.getDate(),
      9,
      0
    )
  ];

  const result = buildDateList(startTime, endTime, day, isThisWeek);

  expect(result).toEqual(expected);
});

test('returns the correct last Sunday date', () => {
  const inputDate = new Date(2024, 7, 26); // Monday, 2024-08-26
  const expected = new Date(2024, 7, 25); // Sunday, 2024-08-25

  const result = getLastSunday(inputDate);

  expect(result).toEqual(expected);
});

test('returns the correct last Sunday when input date is a Sunday', () => {
  const inputDate = new Date(2024, 7, 25); // Sunday, 2024-08-25
  const expected = new Date(2024, 7, 25); // Sunday, 2024-08-25

  const result = getLastSunday(inputDate);

  expect(result).toEqual(expected);
});
