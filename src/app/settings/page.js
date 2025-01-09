'use client';

import TimePicker from '../../components/general/TimePicker';
import { useContext } from 'react';
import { SettingsContext } from '../../constants/context.tsx';

/**
 * Overall component to display the settings screen
 */
const SettingsScreen = () => {
  /**
   * Load settings context to get current settings
   */
  const [settings, setSettings] = useContext(SettingsContext);

  /**
   * Updates the default location in the settings context
   * @param {Object} newLoc - Object with lat and long properties
   */
  const onLocationChange = (newLoc) => {
    setSettings({ ...settings, defaultLocation: newLoc });
  };

  /**
   * Updates the wake-up time in the settings context
   * @param {number} newStart - New wake-up time in minutes since midnight
   */
  const onStartChange = (newStart) => {
    setSettings((oldSettings) => ({
      ...oldSettings,
      dayStart: newStart < oldSettings.dayEnd ? newStart : oldSettings.dayEnd
    }));
  };

  /**
   * Updates the bedtime in the settings context
   * @param {number} newEnd - New bedtime in minutes since midnight
   */
  const onEndChange = (newEnd) => {
    setSettings((oldSettings) => ({
      ...oldSettings,
      dayEnd: newEnd > oldSettings.dayStart ? newEnd : oldSettings.dayStart
    }));
  };

  /**
   * Updates the week setting in the settings context for whether or not you are scheduling for this
   * week (useful in weather predictions only)
   */
  const onWeekChange = () => {
    setSettings((oldSettings) => ({
      ...oldSettings,
      thisWeek: !oldSettings.thisWeek
    }));
  };

  /**
   * Updates the rain threshold in the settings context.
   * @param {string|number} newThreshold - The new rain threshold.
   *   If a string, it is converted to a number. If a number, it is normalized to be between 0 and 1.
   *   If NaN or an empty string, the threshold is set to 0.5.
   */
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
        <div className={styles.timePickers}>
          <span>Default Location: </span>
          <input
            className={styles.textInput}
            value={settings.defaultLocation}
            onInput={(e) => onLocationChange(e.target.value)}
          />
        </div>
        <div className={styles.timePickers}>
          <span>Start Day at Time: </span>
          <TimePicker
            value={settings.dayStart ?? new Date(0, 0, 0, 0, 0)}
            onChange={(selectedTime) =>
              onStartChange(new Date(0, 0, 0, ...selectedTime.split(':')))
            }
          />
        </div>
        <div className={styles.timePickers}>
          <span>End Day at Time: </span>
          <TimePicker
            value={settings.dayEnd ?? new Date(0, 0, 0, 23, 59)}
            onChange={(selectedTime) =>
              onEndChange(new Date(0, 0, 0, ...selectedTime.split(':')))
            }
          />
        </div>
        <div className={styles.timePickers}>
          <span>List is for this week (next week if off):</span>
          <input
            type='checkbox'
            onChange={onWeekChange}
            value={settings.thisWeek}
          />
        </div>
        <div className={styles.timePickers}>
          <span className='max-w-1/2 inline md:block'>
            Do not schedule outdoor tasks when precipitation chance is greater
            than:{' '}
          </span>
          <input
            className={styles.textInput}
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
  timePickers:
    'flex flex-row justify-space-between items-center gap-[5px] p-[5px] px-[10px]',
  textInput: 'h-[40px] bg-gray-300 rounded flex-1 p-[10px] m-[2px]'
};

export default SettingsScreen;
