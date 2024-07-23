'use client';

import { useContext } from 'react';
import Event from '../../components/Event';
import { EventsContext } from '../../constants/context';
import {
  addToState,
  removeFromState,
  editElementInState
} from '../../helper/stateMutation';
import randId from '../../helper/UUID';
import AddButton from '../../components/AddButton';

/**
 * Component for availability screen (where you create events)
 */
const AvailabilityScreen = () => {
  // Access the events list
  const [events, setEvents] = useContext(EventsContext);

  // Add an event to the list
  const addEvent = () => {
    addToState(events, setEvents, {
      name: '',
      days: [false, false, false, false, false, false, false],
      startTime: new Date(0, 0, 0, 0, 0),
      endTime: new Date(0, 0, 0, 23, 59),
      location: '',
      id: randId()
    });
  };

  // Remove an event from the list
  const deleteEvent = (eventIndex) => {
    removeFromState(events, setEvents, eventIndex);
  };

  // Edit an event in the list
  const editEvent = (eventIndex, parameter, value) => {
    editElementInState(events, setEvents, eventIndex, parameter, value);
  };

  // Toggle a day in an event
  const toggleDay = (eventIndex, dayIndex) => {
    editElementInState(events, setEvents, eventIndex, 'days', [
      ...events[eventIndex].days.slice(0, dayIndex),
      !events[eventIndex].days[dayIndex],
      ...events[eventIndex].days.slice(dayIndex + 1)
    ]);
  };

  return (
    <div className='flex flex-col w-full'>
      <div>Enter the times this week that you are busy:</div>
      <div className='flex-grow flex flex-row flex-wrap w-full gap-5'>
        {events.map((event, i) => (
          <Event
            key={i}
            {...event}
            onNameChange={(value) => {
              editEvent(i, 'name', value);
            }}
            onStartChange={(value) => {
              if (value < event.endTime) editEvent(i, 'startTime', value);
              else editEvent(i, 'startTime', event.endTime);
            }}
            onEndChange={(value) => {
              if (value > event.startTime) editEvent(i, 'endTime', value);
              else editEvent(i, 'endTime', event.startTime);
            }}
            onLocationChange={(value) => {
              editEvent(i, 'location', value);
            }}
            onDayChange={(dayIndex) => toggleDay(i, dayIndex)}
            onDestroy={() => deleteEvent(i)}
          />
        ))}
      </div>
      <AddButton
        onClick={addEvent}
        className='fixed bottom-[100px] right-[15px] sm:bottom-10 sm:right-10'
      />
    </div>
  );
};

export default AvailabilityScreen;
