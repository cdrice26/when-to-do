import React from 'react';
import { TimePicker as ReactTimePicker } from 'react-time-picker';
import './TimePickerStyles.css';

/**
 * Time input component for amount of hours and minutes
 * @param {*} props - All props needed for the time input
 * @returns
 */
const TimePicker = (props) => {
  return (
    <div style={styles.timePickerContainer}>
      <span style={styles.timePickerLabel}>{props.label}</span>
      <ReactTimePicker
        value={props.value}
        onChange={props.onChange}
        disableClock={true}
        clearIcon={null}
      />
    </div>
  );
};

const styles = {
  timePickerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  }
};

export default TimePicker;
