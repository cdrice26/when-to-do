import DaySelector from './general/DaySelector';
import TimePicker from './general/TimePicker';
import Button from './general/Button';
import React from 'react';

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
}) => {
  return (
    <div className='bg-gray-200 rounded-lg my-[10px] pt-[10px] flex-shrink h-[250px] text-center'>
      <div className={styles.timePickers}>
        <div>Name: </div>
        <input
          className={styles.textInput}
          value={name}
          placeholder='New Event'
          onInput={(e) => onNameChange(e.target.value)}
        />
      </div>
      <DaySelector daysSelected={days} onChange={onDayChange} />
      <div className={styles.timePickers}>
        <TimePicker
          label='Start: '
          value={startTime}
          onChange={(selectedTime) =>
            onStartChange(new Date(0, 0, 0, ...selectedTime.split(':')))
          }
        />
        <TimePicker
          label='End: '
          value={endTime}
          onChange={(selectedTime) =>
            onEndChange(new Date(0, 0, 0, ...selectedTime.split(':')))
          }
        />
      </div>
      <div className={styles.timePickers}>
        <div>Location: </div>
        <input
          className={styles.textInput}
          value={location}
          placeholder='Somewhere'
          onInput={(e) => onLocationChange(e.target.value)}
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
