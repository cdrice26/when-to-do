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
    <div style={styles.container}>
      <div style={styles.timePickers}>
        <span>Name: </span>
        <input
          style={styles.textInput}
          value={name}
          placeholder='New Task'
          onInput={(e) => onNameChange(e.target.value)}
        />
      </div>
      <div style={styles.timePickers}>
        <span>Location: </span>
        <input
          style={styles.textInput}
          value={location}
          placeholder='Somewhere'
          onInput={(e) => onLocationChange(e.target.value)}
        />
      </div>
      <div style={styles.timePickers}>
        <span>Time: </span>
        <input
          style={styles.textInput}
          type='number'
          min='0'
          value={time}
          onChange={(e) => onTimeChange(e.target.value)}
        />{' '}
        minutes
      </div>
      <div style={styles.timePickers}>
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
  container: {
    backgroundColor: 'rgb(235, 235, 235)',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 5,
    flexShrink: 1,
    height: 250,
    textAlign: 'center'
  },
  timePickers: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  textInput: {
    height: 40,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    flex: 1,
    padding: 10
  }
};

export default Task;
