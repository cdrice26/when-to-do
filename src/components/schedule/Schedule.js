import ScheduledEvent from './ScheduledEvent';
import ScheduledTask from './ScheduledTask';
import { useState, useEffect, useContext } from 'react';
import {
  SettingsContext,
  TasksContext,
  EventsContext
} from '../../constants/context';
import mergeEventsAndTasks from '../../helper/mergeEventsAndTasks';

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

/**
 *
 * @param {Object} props - Object with style prop for setting style of overall container
 */
const Schedule = ({
  style,
  tasksOnDays,
  eventsOnDays,
  setTasksOnDays,
  setEventsOnDays
}) => {
  // Stores the scheduled events and tasks in the correct order
  const [scheduled, setScheduled] = useState(new Array(days.length).fill([]));

  // Load all contexts to get events, tasks, and settings
  const [settings, _setSettings] = useContext(SettingsContext);
  const [tasks, _setTasks] = useContext(TasksContext);
  const [events, _setevents] = useContext(EventsContext);

  // Keep track of loading status
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Set the scheduled property of a task to false
   * @param {Object} task - the task to unschedule, as long as the id property is the same, it will work
   */
  const unscheduleTask = (task) => {
    tasks.setTasks((prevTasks) =>
      prevTasks.map((item) =>
        item.id == task.id ? { ...item, scheduled: false } : item
      )
    );
  };

  /**
   * Refresh the schedule by merging events and tasks on each day and putting them in order
   */
  const refreshSchedule = async () => {
    let newSchedule = [];
    for (const day of days) {
      const i = days.indexOf(day);
      const merged = await mergeEventsAndTasks(
        eventsOnDays[i].map((event) =>
          events.find((item) => item.id === event.payload)
        ),
        tasksOnDays[i].map((task) => tasks.find((item) => item.id === task)),
        settings,
        i
      );
      newSchedule.push(merged);
    }
    setScheduled(newSchedule);
  };

  // Load events and tasks on each day
  useEffect(() => {
    (async () => {
      const newEventsOnDays = JSON.parse(localStorage.getItem('eventsOnDays'));
      const newTasksOnDays = JSON.parse(localStorage.getItem('tasksOnDays'));
      if (newEventsOnDays) {
        setEventsOnDays(newEventsOnDays);
      } else {
        setEventsOnDays(new Array(days.length).fill([]));
      }
      if (newTasksOnDays) {
        setTasksOnDays(newTasksOnDays);
      } else {
        setTasksOnDays(new Array(days.length).fill([]));
      }
    })();
  }, []);

  // Update tasks on each day by putting all tasks assigned to each day
  // in the correct slot in tasksOnDays
  useEffect(() => {
    if (tasksOnDays.length == 0) return;
    setTasksOnDays((prevTasks) =>
      days.map((_day, i) =>
        prevTasks[i].filter(
          (event) =>
            tasks.find(
              (item) => item.id === event.payload && item.scheduled
            ) !== undefined
        )
      )
    );
  }, [tasks, tasksOnDays.length]);

  // Update events on each day by putting all events assigned to each day
  // in the correct slot in eventsOnDays
  useEffect(() => {
    setEventsOnDays(
      days.map((_day, i) =>
        events
          .filter((event) => event.days[i])
          .map((event) => ({ type: 'event', payload: event.id }))
      )
    );
  }, [events]);

  // Set the loading indicator when something changes
  useEffect(() => {
    setIsLoading(true);
  }, [tasks, events, eventsOnDays, tasksOnDays]);

  // Reset the loading indicator when the schedule changes
  useEffect(() => {
    setIsLoading(false);
  }, [scheduled]);

  // Refresh the schedule when settings change or additional tasks or events are assigned
  // to a day
  useEffect(() => {
    if (tasksOnDays.length == 0) return;
    refreshSchedule();
  }, [eventsOnDays, tasksOnDays, settings]);

  // Store scheduled events in storage
  useEffect(() => {
    if (eventsOnDays.length == 0) return;
    localStorage.setItem('eventsOnDays', JSON.stringify(eventsOnDays));
  }, [eventsOnDays]);

  // Store scheduled tasks in storage
  useEffect(() => {
    if (tasksOnDays.length == 0) return;
    localStorage.setItem('tasksOnDays', JSON.stringify(tasksOnDays));
  }, [tasksOnDays]);

  return (
    <div style={style}>
      {isLoading ? (
        <progress value={null} />
      ) : (
        <div>
          <span style={{ fontWeight: 'bold' }}>Scheduled Events and Tasks</span>
          <div
            style={{ paddingTop: 10, position: 'relative', overflowY: 'auto' }}
          >
            {days.map((day, i) => (
              <div key={i}>
                <div style={styles.container}>
                  <span style={styles.dayTitle}>{day}</span>
                  {scheduled[i].map((event, j) =>
                    Object.keys(event).includes('days') ? (
                      <ScheduledEvent event={event} key={j} container={true} />
                    ) : (
                      <ScheduledTask
                        task={event}
                        key={j}
                        unscheduleTask={unscheduleTask}
                      />
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: 10,
    backgroundColor: 'rgb(235, 235, 235)',
    marginBottom: 10,
    borderRadius: 5
  },
  dayTitle: {
    fontWeight: 'bold',
    fontSize: 24
  }
};

export default Schedule;
