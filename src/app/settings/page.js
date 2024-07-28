'use client';

import TimePicker from '../../components/general/TimePicker';
import { useContext } from 'react';
import { SettingsContext } from '../../constants/context';

/**
 * Overall component to display the settings screen
 */
const SettingsScreen = () => {
  // Load settings context to get current settings
  const [settings, setSettings] = useContext(SettingsContext);

  // Update the default location
  const onLocationChange = (newLoc) => {
    setSettings({ ...settings, defaultLocation: newLoc });
  };

  // Update wake-up time
  const onStartChange = (newStart) => {
    setSettings((oldSettings) => ({
      ...oldSettings,
      dayStart: newStart < oldSettings.dayEnd ? newStart : oldSettings.dayEnd
    }));
  };

  // Update bedtime
  const onEndChange = (newEnd) => {
    setSettings((oldSettings) => ({
      ...oldSettings,
      dayEnd: newEnd > oldSettings.dayStart ? newEnd : oldSettings.dayStart
    }));
  };

  // Update week
  const onWeekChange = () => {
    setSettings((oldSettings) => ({
      ...oldSettings,
      thisWeek: !oldSettings.thisWeek
    }));
  };

  // Update rain threshold
  const onThresholdChange = (newThreshold) => {
    setSettings((oldSettings) => ({
      ...oldSettings,
      rainThreshold:
        newThreshold === ''
          ? 0
          : isNaN(parseInt(newThreshold))
          ? 0.5
          : Math.min(parseInt(newThreshold), 100) / 100
    }));
  };

  return (
    <div className='flex h-full w-full flex-col items-center'>
      <div className='flex w-full md:w-[660px] flex-col'>
        <div style={styles.timePickers}>
          <span>Default Location: </span>
          <input
            style={styles.textInput}
            value={settings.defaultLocation}
            onInput={(e) => onLocationChange(e.target.value)}
          />
        </div>
        <div style={styles.timePickers}>
          <span>Start Day at Time: </span>
          <TimePicker
            value={settings.dayStart ?? new Date(0, 0, 0, 0, 0)}
            onChange={(selectedTime) =>
              onStartChange(new Date(0, 0, 0, ...selectedTime.split(':')))
            }
          />
        </div>
        <div style={styles.timePickers}>
          <span>End Day at Time: </span>
          <TimePicker
            value={settings.dayEnd ?? new Date(0, 0, 0, 23, 59)}
            onChange={(selectedTime) =>
              onEndChange(new Date(0, 0, 0, ...selectedTime.split(':')))
            }
          />
        </div>
        <div style={styles.timePickers}>
          <span>List is for this week (next week if off):</span>
          <input
            type='checkbox'
            onChange={onWeekChange}
            value={settings.thisWeek}
          />
        </div>
        <div style={styles.timePickers}>
          <span className='max-w-1/2 inline md:block'>
            Do not schedule outdoor tasks when precipitation chance is greater
            than:{' '}
          </span>
          <input
            style={styles.textInput}
            value={
              settings.rainThreshold === 0
                ? ''
                : Math.round(settings.rainThreshold * 100).toString()
            }
            onInput={(e) => onThresholdChange(e.target.value)}
            type='number'
          />
          <span> %</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  timePickers: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  textInput: {
    height: 40,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    flex: 1,
    padding: 10,
    margin: 2
  }
};

export default SettingsScreen;
