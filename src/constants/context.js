'use client';

import { createContext } from 'react';
import usePersistentState from '../hooks/usePersistentState';
import randId from '../helper/UUID';

export const EventsContext = createContext();
export const TasksContext = createContext();
export const SettingsContext = createContext();

/**
 * Default list of events
 */
const defaultEvent = [
  {
    name: '',
    days: [false, false, false, false, false, false, false],
    startTime: null,
    endTime: null,
    location: '',
    id: randId()
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
    id: randId()
  }
];

/**
 * Default settings
 */
const defaultSettings = {
  dayStart: null,
  dayEnd: null,
  defaultLocation: '',
  thisWeek: true,
  rainThreshold: 0.5
};

/**
 * Provider for the events context
 * @param {*} param0 - {children}
 * @returns JSX for the provider
 */
const EventsProvider = ({ children }) => {
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
const TasksProvider = ({ children }) => {
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
const SettingsProvider = ({ children }) => {
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
export const ContextProvider = ({ children }) => {
  return (
    <EventsProvider>
      <TasksProvider>
        <SettingsProvider>{children}</SettingsProvider>
      </TasksProvider>
    </EventsProvider>
  );
};
