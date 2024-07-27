import { useContext } from 'react';
import { SettingsContext } from '../../constants/context';

/**
 * One event on the schedule screen
 * @param {Object} props - Object with properties: event, which contains all event details, and container,
 *                         which is a boolean that determines if the event is displayed in a box or nor
 */
const ScheduledEvent = ({ event, container }) => {
  const settings = useContext(SettingsContext);

  return (
    <div style={container ? styles.container : null}>
      <span style={{ fontWeight: 'bold' }}>
        {event?.name !== '' ? event?.name : 'Unnamed'}
      </span>
      <span>
        @{event?.location !== '' ? event?.location : settings.defaultLocation}
      </span>
      {/* SOURCE: https://stackoverflow.com/questions/17913681/ */}
      {event?.startTime === null ? (
        <span style={{ color: 'red' }}>
          There&apos;s no time for this today!
        </span>
      ) : (
        <span>
          {event?.startTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}{' '}
          -{' '}
          {event?.endTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'lightgrey',
    marginTop: 10
  }
};

export default ScheduledEvent;
