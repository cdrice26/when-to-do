import { useContext } from 'react';
import { SettingsContext } from '../../constants/context';

/**
 * One event on the schedule screen
 * @param {Object} props - Object with properties: event, which contains all event details, and container,
 *                         which is a boolean that determines if the event is displayed in a box or nor
 */
const ScheduledEvent = ({ event, container }) => {
  const [settings, _setSettings] = useContext(SettingsContext);

  return (
    <div
      className={container ? 'p-[10px] rounded-lg bg-gray-300 mt-[10px]' : null}
    >
      <div className='font-bold'>
        {event?.name !== '' ? event?.name : 'Unnamed'}
      </div>
      <div>
        @{event?.location !== '' ? event?.location : settings.defaultLocation}
      </div>
      {/* SOURCE: https://stackoverflow.com/questions/17913681/ */}
      {event?.startTime === null ? (
        <div className='text-red-500'>There&apos;s no time for this today!</div>
      ) : (
        <div>
          {event?.startTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}{' '}
          -{' '}
          {event?.endTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      )}
    </div>
  );
};

export default ScheduledEvent;
