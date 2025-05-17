'use client';

import { createContext } from 'react';
import usePersistentState from '../hooks/usePersistentState.ts';
import randId from '../helper/UUID.ts';
import { Event, Task, Settings } from '../types/instances';

export const EventsContext = createContext<
  [Event[], React.Dispatch<React.SetStateAction<Event[]>>]
>([
  [
    {
      name: '',
      days: [false, false, false, false, false, false, false],
      startTime: new Date(0, 0, 0, 0, 0), // fixed value for hydration
      endTime: new Date(0, 0, 0, 0, 0),   // fixed value for hydration
      location: '',
      id: 'default-event-id' // fixed value for hydration
    }
  ],
  () => {}
]);

export const TasksContext = createContext<
  [Task[], React.Dispatch<React.SetStateAction<Task[]>>]
>([
  [
    {
      name: '',
      location: '',
      time: 0,
      scheduled: false,
      outside: false,
      id: 'default-task-id' // fixed value for hydration
    }
  ],
  () => {}
]);

export const SettingsContext = createContext<
  [Settings, React.Dispatch<React.SetStateAction<Settings>>]
>([
  {
    dayStart: new Date(0, 0, 0, 7, 0), // fixed value for hydration
    dayEnd: new Date(0, 0, 0, 22, 0),  // fixed value for hydration
    defaultLocation: '',
    thisWeek: true,
    rainThreshold: 0.5
  },
  () => {}
]);

/**
 * Default list of events
 */
const defaultEvent = [
  {
    name: '',
    days: [false, false, false, false, false, false, false],
    startTime: new Date(0, 0, 0, 0, 0), // fixed value for hydration
    endTime: new Date(0, 0, 0, 0, 0),   // fixed value for hydration
    location: '',
    id: 'default-event-id' // fixed value for hydration
  }
];

/**
 * Default list of tasks
 */
const defaultTask = [
  {
    name: '',
    location: '',
    time: 0,
    scheduled: false,
    outside: false,
    id: 'default-task-id' // fixed value for hydration
  }
];

interface ProviderProps {
  children: React.ReactNode;
}

/**
 * Default settings
 */
const defaultSettings = {
  dayStart: new Date(0, 0, 0, 7, 0), // fixed value for hydration
  dayEnd: new Date(0, 0, 0, 22, 0),  // fixed value for hydration
  defaultLocation: '',
  thisWeek: true,
  rainThreshold: 0.5
};

/**
 * Provider for the events context
 * @param {*} param0 - {children}
 * @returns JSX for the provider
 */
const EventsProvider = ({ children }: ProviderProps) => {
  const [events, setEvents] = usePersistentState('events', defaultEvent);
  return (
    <EventsContext.Provider value={[events, setEvents]}>
      {children}
    </EventsContext.Provider>
  );
};

/**
 * Provider for the tasks context
 * @param {*} param0 - {children}
 * @returns JSX for the provider
 */
const TasksProvider = ({ children }: ProviderProps) => {
  const [tasks, setTasks] = usePersistentState('tasks', defaultTask);
  return (
    <TasksContext.Provider value={[tasks, setTasks]}>
      {children}
    </TasksContext.Provider>
  );
};

/**
 * Provider for the settings context
 * @param {*} param0 - {children}
 * @returns JSX for the provider
 */
const SettingsProvider = ({ children }: ProviderProps) => {
  const [settings, setSettings] = usePersistentState(
    'settings',
    defaultSettings
  );
  return (
    <SettingsContext.Provider value={[settings, setSettings]}>
      {children}
    </SettingsContext.Provider>
  );
};

/**
 * Provider for all contexts
 * @param {*} param0 - {children}
 * @returns JSX for the provider
 */
export const ContextProvider = ({ children }: ProviderProps) => {
  return (
    <EventsProvider>
      <TasksProvider>
        <SettingsProvider>{children}</SettingsProvider>
      </TasksProvider>
    </EventsProvider>
  );
};
