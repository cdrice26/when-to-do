import DaySelector from './DaySelector';
//import TimePicker from './TimePicker';

/**
 * One event on the availablility screen, with controls for editing and deleting
 * @param {Object} props - Object with function for editing and deleting event, and all event properties to display
 */
const Event = ({
  name = 'New Event',
  days = [false, false, false, false, false, false, false],
  startTime = new Date(0, 0, 0, 0, 0),
  endTime = new Date(0, 0, 0, 23, 59),
  location = 'Somewhere',
  onDayChange,
  onNameChange,
  onStartChange,
  onEndChange,
  onLocationChange,
  onDestroy
}) => {
  return (
    <div style={styles.container}>
      <div style={styles.timePickers}>
        <div>Name: </div>
        <input
          style={styles.textInput}
          value={name}
          placeholder='New Event'
          onInput={onNameChange}
        />
      </div>
      <DaySelector daysSelected={days} onChange={onDayChange} />
      <div style={styles.timePickers}>
        {/* <TimePicker
          label='Start: '
          value={startTime}
          onChange={(_e, selectedTime) => onStartChange(selectedTime)}
        />
        <TimePicker
          label='End: '
          value={endTime}
          onChange={(_e, selectedTime) => onEndChange(selectedTime)}
        /> */}
      </div>
      <div style={styles.timePickers}>
        <div>Location: </div>
        <input
          style={styles.textInput}
          value={location}
          placeholder='Somewhere'
          onInput={onLocationChange}
        />
      </div>
      <button onClick={onDestroy}>Delete Event</button>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'rgb(235, 235, 235)',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 5
  },
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
    padding: 10
  }
};

export default Event;
