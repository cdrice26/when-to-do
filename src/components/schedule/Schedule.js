import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { DraxView, DraxScrollView } from 'react-native-drax';
import ScheduledEvent from './ScheduledEvent';
import ScheduledTask from './ScheduledTask';
import { useState, useEffect, useContext } from 'react';
import { SettingsContext, TasksContext, EventsContext } from './context';
import mergeEventsAndTasks from './mergeEventsAndTasks';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
const Schedule = ({ style }) => {
  // Stores the scheduled events and tasks in the correct order
  const [scheduled, setScheduled] = useState(new Array(days.length).fill([]));

  // Load all contexts to get events, tasks, and settings
  const settings = useContext(SettingsContext);
  const tasks = useContext(TasksContext);
  const events = useContext(EventsContext);

  // List of events on each day
  const [eventsOnDays, setEventsOnDays] = useState([]);

  // List of tasks on each day
  const [tasksOnDays, setTasksOnDays] = useState([]);

  // Keep track of loading status
  const [isLoading, setIsLoading] = useState(false);

  /**
   * When dropping a task, add it to the day in tasksOnDays that it was dropped on and mark it as scheduled
   * @param {String} payload - the id of the task that was dropped
   * @param {Number} i - the index of the day the task was dropped on
   */
  const onDrop = (payload, i) => {
    setTasksOnDays((prevTasksOnDays) => [
      ...prevTasksOnDays.slice(0, i),
      [...prevTasksOnDays[i], payload],
      ...prevTasksOnDays.slice(i + 1)
    ]);
    tasks.setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === payload.payload ? { ...task, scheduled: true } : task
      )
    );
  };

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
          events.events.find((item) => item.id === event.payload)
        ),
        tasksOnDays[i].map((task) =>
          tasks.tasks.find((item) => item.id === task.payload)
        ),
        settings.settings,
        i
      );
      newSchedule.push(merged);
    }
    setScheduled(newSchedule);
  };

  // Load events and tasks on each day
  useEffect(() => {
    (async () => {
      const newEventsOnDays = JSON.parse(
        await AsyncStorage.getItem('eventsOnDays')
      );
      const newTasksOnDays = JSON.parse(
        await AsyncStorage.getItem('tasksOnDays')
      );
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
            tasks.tasks.find(
              (item) => item.id === event.payload && item.scheduled
            ) !== undefined
        )
      )
    );
  }, [tasks.tasks]);

  // Update events on each day by putting all events assigned to each day
  // in the correct slot in eventsOnDays
  useEffect(() => {
    setEventsOnDays(
      days.map((_day, i) =>
        events.events
          .filter((event) => event.days[i])
          .map((event) => ({ type: 'event', payload: event.id }))
      )
    );
  }, [events.events]);

  // Set the loading indicator when something changes
  useEffect(() => {
    setIsLoading(true);
  }, [tasks.tasks, events.events, eventsOnDays, tasksOnDays]);

  // Reset the loading indicator when the schedule changes
  useEffect(() => {
    setIsLoading(false);
  }, [scheduled]);

  // Refresh the schedule when settings change or additional tasks or events are assigned
  // to a day
  useEffect(() => {
    if (tasksOnDays.length == 0) return;
    refreshSchedule();
  }, [eventsOnDays, tasksOnDays, settings.settings]);

  // Store scheduled events in storage
  useEffect(() => {
    if (eventsOnDays.length == 0) return;
    (async () => {
      await AsyncStorage.setItem('eventsOnDays', JSON.stringify(eventsOnDays));
    })();
  }, [eventsOnDays]);

  // Store scheduled tasks in storage
  useEffect(() => {
    if (tasksOnDays.length == 0) return;
    (async () => {
      await AsyncStorage.setItem('tasksOnDays', JSON.stringify(tasksOnDays));
    })();
  }, [tasksOnDays]);

  return (
    <View style={style}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Text style={{ fontWeight: 'bold' }}>Scheduled Events and Tasks</Text>
          <DraxScrollView>
            {days.map((day, i) => (
              <DraxView
                key={i}
                onReceiveDragDrop={({ dragged: { payload } }) =>
                  onDrop(payload, i)
                }
              >
                <View style={styles.container}>
                  <Text style={styles.dayTitle}>{day}</Text>
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
                </View>
              </DraxView>
            ))}
          </DraxScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Schedule;
