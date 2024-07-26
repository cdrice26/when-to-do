import { addMinutes, addDays } from 'date-fns';
import getDrivingTime from './drivingTime';
import getWeather from './getWeather';

/*
NOTE: I did use ChatGPT to help me debug these functions in particular. They are not concerned with React
and are just computational, and I did not copy and paste any AI-generated code into this file.
I retuyped all AI-generated code, made sure I understood how it worked, and also significantly refactored it
to better fit the needs of the project. Unless otherwise noted, all other files are written by me.
*/

/**
 * Sorts the events by start time and schedules tasks at the earliest possible time.
 * @param {Array} events - Array of events to be merged and sorted.
 * @param {Array} tasks - Array of tasks to be scheduled.
 * @param {Object} settings - Configuration settings.
 * @param {Number} dayOfWeekIndex - Index of the day of the week (Sunday is zero).
 * @returns {Array} - Array of merged events and scheduled tasks.
 */
const mergeEventsAndTasks = async (
  events,
  tasks,
  { dayStart, dayEnd, defaultLocation, thisWeek, rainThreshold },
  dayOfWeekIndex
) => {
  // Initialize schedule array
  let schedule = [];

  // Add default sleep events
  const eventsWithDefaults = [
    {
      location: defaultLocation,
      startTime: new Date(0, 0, 0, 0, 0),
      endTime: dayStart,
      days: [],
      name: 'Sleep'
    },
    ...events,
    {
      location: defaultLocation,
      startTime: dayEnd,
      endTime: new Date(0, 0, 0, 23, 59),
      days: [],
      name: 'Sleep'
    }
  ];

  // Merge overlapping events
  const mergedEventsWithDefaults = mergeOverlappingEvents(eventsWithDefaults);

  // Iterate over merged events and tasks
  let tasksMutable = tasks;
  for (let i = 0; i < mergedEventsWithDefaults.length - 1; i++) {
    let lastEventOrTask = mergedEventsWithDefaults[i];

    if (i > 0 || lastEventOrTask.endTime !== dayStart) {
      schedule.push(lastEventOrTask);
    }

    for (let j = 0; j < tasksMutable.length; j++) {
      const drivingTimeTo = await getDrivingTime(
        lastEventOrTask.location || defaultLocation,
        tasksMutable[j].location || defaultLocation
      );

      const drivingTimeFrom = await getDrivingTime(
        tasksMutable[j].location || defaultLocation,
        mergedEventsWithDefaults[i + 1].location || defaultLocation
      );

      // Calculate potential task start and end times
      const taskStartTime = addMinutes(lastEventOrTask.endTime, drivingTimeTo);
      const taskEndTime = addMinutes(taskStartTime, tasksMutable[j].time);
      const nextEventStartTime = mergedEventsWithDefaults[i + 1].startTime;

      // Check if the task fits within the available time slot and weather conditions
      const canFit =
        addMinutes(taskEndTime, drivingTimeFrom) <= nextEventStartTime;
      const weatherConditions = await getWeather(
        tasksMutable[j].location || defaultLocation,
        buildDateList(taskStartTime, taskEndTime, dayOfWeekIndex, thisWeek)
      );

      const isWeatherSuitable =
        !tasksMutable[j].outside ||
        weatherConditions.every((hour) => hour.precip <= rainThreshold);

      if (canFit && isWeatherSuitable) {
        schedule.push({
          id: tasksMutable[j].id,
          name: tasksMutable[j].name,
          location: tasksMutable[j].location,
          startTime: taskStartTime,
          endTime: taskEndTime
        });

        lastEventOrTask = schedule[schedule.length - 1];
        tasksMutable = tasksMutable.filter(
          (task) => task.id !== tasksMutable[j].id
        );
        j--; // Adjust index after removal
      }
    }
  }

  // Add remaining tasks that couldn't be scheduled
  for (const task of tasksMutable) {
    schedule.push({
      id: task.id,
      name: task.name,
      location: task.location,
      startTime: null,
      endTime: null
    });
  }

  return schedule;
};

/**
 * Sorts the events by start time and merges the ones that overlap
 * @param {Array} events - Array of events to sort and merge
 * @returns {Array} - Array of merged events
 */
export const mergeOverlappingEvents = (events) => {
  // Sort events by start time
  events.sort((first, second) => first.startTime - second.startTime);
  events = events.filter((event) => event !== undefined);

  if (events.length === 0) return [];

  // Merge events that overlap
  let mergedEvents = [events[0]];
  for (let i = 1; i < events.length; i++) {
    // Current event we are working on
    let currentEvent = events[i];

    // The last event to be added to the list
    let lastMergedEvent = mergedEvents[mergedEvents.length - 1];

    // If there is overlap
    if (currentEvent.startTime < lastMergedEvent.endTime) {
      // Create an event that represents both events to be merged
      let mergedEvent = {
        name:
          (lastMergedEvent.name === ''
            ? 'Unnamed event'
            : lastMergedEvent.name) +
          ' and ' +
          (currentEvent.name === '' ? 'Unnamed event' : currentEvent.name),
        startTime: new Date(
          Math.min(lastMergedEvent.startTime, currentEvent.startTime)
        ),
        endTime: new Date(
          Math.max(lastMergedEvent.endTime, currentEvent.endTime)
        ),
        location: lastMergedEvent.location || currentEvent.location
      };

      // Remove the event that was last added, then replace it with the merged one
      mergedEvents.pop();
      mergedEvents.push(mergedEvent);

      // If there's no overlap, just add the current event
    } else {
      mergedEvents.push(currentEvent);
    }
  }
  return mergedEvents;
};

/**
 * Get all hours a task runs for
 * @param {Date} startTime - Start time of task
 * @param {Date} endTime - End time of task
 * @param {Number} day - Index of day of week (Sunday is 0)
 * @param {Boolean} isThisWeek - Whether of not we are dealing with this week (otherwise next week)
 * @returns {Array} - List of dates corresponding to each hour
 */
export const buildDateList = (startTime, endTime, day, isThisWeek) => {
  const startHr = startTime.getHours();
  const endHr = endTime.getHours();
  const lastSunday = getLastSunday(Date.now());
  const dayOfInterest = isThisWeek
    ? addDays(lastSunday, day)
    : addDays(addDays(lastSunday, day), 7);
  let dateList = [];
  for (let hr = startHr; hr < endHr; hr++) {
    const newHr = new Date(dayOfInterest);
    newHr.setHours(hr);
    newHr.setMinutes(0);
    newHr.setSeconds(0);
    newHr.setMilliseconds(0);
    dateList.push(newHr);
  }
  return dateList;
};

/**
 * Get the date of the last Sunday
 * Source: https://stackoverflow.com/questions/12791378/get-the-most-recently-occurring-sunday
 * @param {Date} d - The date of which to get the last Sunday
 * @returns {Date} - The date of the last Sunday before {d}
 */
export const getLastSunday = (d) => {
  const t = new Date(d);
  t.setDate(t.getDate() - t.getDay());
  return t;
};

export default mergeEventsAndTasks;
