import React from 'react';
import Button from './general/Button.tsx';

interface TaskProps {
  name: string;
  location: string;
  time: number;
  isOutside: boolean;
  onNameChange: (name: string) => void;
  onLocationChange: (location: string) => void;
  onTimeChange: (time: string) => void;
  onOutsideChange: (isOutside: boolean) => void;
  onDestroy: () => void;
}

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
}: TaskProps) => {
  return (
    <div className='bg-gray-200 rounded-lg my-[10px] pt-[10px] flex-shrink h-[250px] text-center'>
      <div className={styles.timePickers}>
        <span>Name: </span>
        <input
          className={styles.textInput}
          value={name}
          placeholder='New Task'
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            onNameChange(e.target.value)
          }
        />
      </div>
      <div className={styles.timePickers}>
        <span>Location: </span>
        <input
          className={styles.textInput}
          value={location}
          placeholder='Somewhere'
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            onLocationChange(e.target.value)
          }
        />
      </div>
      <div className={styles.timePickers}>
        <span>Time: </span>
        <input
          className={styles.textInput}
          type='number'
          min='0'
          value={time}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onTimeChange(e.target.value)
          }
        />{' '}
        minutes
      </div>
      <div className={styles.timePickers}>
        <span>Is Outside: </span>
        <input
          type='checkbox'
          width={6}
          checked={isOutside}
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
