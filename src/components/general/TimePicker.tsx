import React from 'react';
import { TimePicker as ReactTimePicker } from 'react-time-picker';
import './TimePickerStyles.css';
import { Value } from 'react-time-picker/dist/cjs/shared/types';

interface TimePickerProps {
  label?: string;
  value: Date;
  onChange: (value: Value) => void;
}

/**
 * Time input component for amount of hours and minutes
 * @param {*} props - All props needed for the time input
 * @returns
 */
const TimePicker = (props: TimePickerProps) => {
  return (
    <div className='flex flex-row items-center justify-center gap-[10px]'>
      <span>{props.label}</span>
      <ReactTimePicker
        value={props.value}
        onChange={props.onChange}
        disableClock={true}
        clearIcon={null}
      />
    </div>
  );
};

export default TimePicker;
