import DaySelector from './general/DaySelector.tsx';
import TimePicker from './general/TimePicker.tsx';
import Button from './general/Button.tsx';
import React from 'react';
import { Value } from 'react-time-picker/dist/cjs/shared/types';

interface EventProps {
  name: string;
  days: boolean[];
  startTime: Date;
  endTime: Date;
  location: string;
  onDayChange: (index: number) => void;
  onNameChange: (name: string) => void;
  onStartChange: (time: Date) => void;
  onEndChange: (time: Date) => void;
  onLocationChange: (location: string) => void;
  onDestroy: () => void;
}

/**
 * One event on the availablility screen, with controls for editing and deleting
 * @param {Object} props - Object with function for editing and deleting event, and all event properties to display
 */
const Event = ({
  name = 'New Event',
  days = [false, false, false, false, false, false, false],
  startTime = new Date(0, 0, 0, 0, 0),
  endTime = new Date(0, 0, 0, 23, 59),
  location = 'Somewhere',
  onDayChange,
  onNameChange,
  onStartChange,
  onEndChange,
  onLocationChange,
  onDestroy
}: EventProps) => {
  return (
    <div className='bg-gray-200 rounded-lg my-[10px] pt-[10px] flex-shrink h-[250px] text-center'>
      <div className={styles.timePickers}>
        <div>Name: </div>
        <input
          className={styles.textInput}
          value={name}
          placeholder='New Event'
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            onNameChange(e.target.value)
          }
        />
      </div>
      <DaySelector daysSelected={days} onChange={onDayChange} />
      <div className={styles.timePickers}>
        <TimePicker
          label='Start: '
          value={startTime ?? new Date(0, 0, 0, 0, 0)}
          onChange={(selectedTime: Value) =>
            onStartChange(
              new Date(
                0,
                0,
                0,
                ...(selectedTime?.split(':').map(Number) ?? [0, 0])
              )
            )
          }
        />
        <TimePicker
          label='End: '
          value={endTime ?? new Date(0, 0, 0, 23, 59)}
          onChange={(selectedTime: Value) =>
            onEndChange(
              new Date(
                0,
                0,
                0,
                ...(selectedTime?.split(':').map(Number) ?? [23, 59])
              )
            )
          }
        />
      </div>
      <div className={styles.timePickers}>
        <div>Location: </div>
        <input
          className={styles.textInput}
          value={location}
          placeholder='Somewhere'
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            onLocationChange(e.target.value)
          }
        />
      </div>
      <div className='flex justify-center items-center w-full p-2'>
        <Button onClick={onDestroy} text='Delete Event' />
      </div>
    </div>
  );
};

const styles = {
  timePickers:
    'flex flex-row justify-center items-center gap-[5px] p-[5px] px-[10px]',
  textInput: 'h-[40px] bg-gray-300 rounded flex-1 p-[10px]'
};

export default Event;
