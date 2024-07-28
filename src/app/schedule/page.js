'use client';

import UnscheduledTaskList from '../../components/schedule/UnscheduledTaskList';
import Schedule from '../../components/schedule/Schedule';
import { TasksContext } from '@/constants/context';
import { useState, useContext } from 'react';
import useHydration from '../../hooks/useHydration';

/**
 * Overall component to display the scheduling screen
 */
const ScheduleScreen = () => {
  /**
   * Load tasks context.
   */
  const [_tasks, setTasks] = useContext(TasksContext);

  /**
   * List of events scheduled on each day.
   * Each entry is an array of event ids.
   */
  const [eventsOnDays, setEventsOnDays] = useState([]);

  /**
   * List of tasks on each day.
   * Each entry is an array of task ids.
   */
  const [tasksOnDays, setTasksOnDays] = useState([]);

  const hydrated = useHydration();

  if (!hydrated) {
    return null; // Render a placeholder or nothing during SSR
  }

  /**
   * Schedule a task on a specific day.
   *
   * @param {number} dayIndex - The index of the day in the schedule array.
   * @param {string} taskId - The ID of the task to be scheduled.
   */
  const scheduleOnDay = (dayIndex, taskId) => {
    setTasksOnDays((prevTasksOnDays) => [
      ...prevTasksOnDays.slice(0, dayIndex),
      [...prevTasksOnDays[dayIndex], taskId],
      ...prevTasksOnDays.slice(dayIndex + 1)
    ]);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, scheduled: true } : task
      )
    );
  };

  return (
    <div className='flex flex-col sm:flex-row w-full h-full relative overflow-y-hidden'>
      <UnscheduledTaskList scheduleOnDay={scheduleOnDay} />
      <Schedule
        tasksOnDays={tasksOnDays}
        setTasksOnDays={setTasksOnDays}
        eventsOnDays={eventsOnDays}
        setEventsOnDays={setEventsOnDays}
      />
    </div>
  );
};

export default ScheduleScreen;
