import { View, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { SettingsContext } from './context';

/**
 * One event on the schedule screen
 * @param {Object} props - Object with properties: event, which contains all event details, and container,
 *                         which is a boolean that determines if the event is displayed in a box or nor
 */
const ScheduledEvent = ({ event, container }) => {
  const settings = useContext(SettingsContext);

  return (
    <View style={container ? styles.container : null}>
      <Text style={{ fontWeight: 'bold' }}>
        {event?.name !== '' ? event?.name : 'Unnamed'}
      </Text>
      <Text>
        @
        {event?.location !== ''
          ? event?.location
          : settings.settings.defaultLocation}
      </Text>
      {/* SOURCE: https://stackoverflow.com/questions/17913681/ */}
      {event?.startTime === null ? (
        <Text style={{ color: 'red' }}>There's no time for this today!</Text>
      ) : (
        <Text>
          {event?.startTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}{' '}
          -{' '}
          {event?.endTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'lightgrey',
    marginTop: 10
  }
});

export default ScheduledEvent;
