import React from 'react';
import TimePicker from './general/TimePicker';
import Button from './general/Button';

/**
 * Component to display a task on the tasks screen
 * @param {Object} props - All data necessary to display the task as well as event handlers
 */
const Task = ({
  name,
  location,
  time,
  isOutside,
  onNameChange,
  onLocationChange,
  onTimeChange,
  onOutsideChange,
  onDestroy
}) => {
  return (
    <div className='bg-gray-200 rounded-lg my-[10px] pt-[10px] flex-shrink h-[250px] text-center'>
      <div className={styles.timePickers}>
        <span>Name: </span>
        <input
          className={styles.textInput}
          value={name}
          placeholder='New Task'
          onInput={(e) => onNameChange(e.target.value)}
        />
      </div>
      <div className={styles.timePickers}>
        <span>Location: </span>
        <input
          className={styles.textInput}
          value={location}
          placeholder='Somewhere'
          onInput={(e) => onLocationChange(e.target.value)}
        />
      </div>
      <div className={styles.timePickers}>
        <span>Time: </span>
        <input
          className={styles.textInput}
          type='number'
          min='0'
          value={time}
          onChange={(e) => onTimeChange(e.target.value)}
        />{' '}
        minutes
      </div>
      <div className={styles.timePickers}>
        <span>Is Outside: </span>
        <input
          type='checkbox'
          width={6}
          value={isOutside}
          onChange={(e) => onOutsideChange(e.target.checked)}
        />
      </div>
      <Button text='Delete Task' onClick={onDestroy} />
    </div>
  );
};

const styles = {
  timePickers:
    'flex flex-row justify-center items-center gap-[5px] p-[5px] px-[10px]',
  textInput: 'h-[40px] bg-gray-300 rounded flex-1 p-[10px]'
};

export default Task;
