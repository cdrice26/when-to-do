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
    <div style={container ? styles.container : null}>
      <div style={{ fontWeight: 'bold' }}>
        {event?.name !== '' ? event?.name : 'Unnamed'}
      </div>
      <div>
        @{event?.location !== '' ? event?.location : settings.defaultLocation}
      </div>
      {/* SOURCE: https://stackoverflow.com/questions/17913681/ */}
      {event?.startTime === null ? (
        <div style={{ color: 'red' }}>There&apos;s no time for this today!</div>
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

const styles = {
  container: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'lightgrey',
    marginTop: 10
  }
};

export default ScheduledEvent;
