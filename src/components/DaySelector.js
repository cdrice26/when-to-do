const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

/**
 * Component for a day selector, with each day in a circle that can be selected (and deselected)
 * @param {Object} props - Object with onChange function and list of selected days
 */
const DaySelector = ({ daysSelected, onChange }) => {
  return (
    <div style={styles.container}>
      {days.map((day, i) => (
        <button
          key={i}
          style={styles.button(daysSelected[i])}
          onClick={() => onChange(i)}
        >
          <div style={styles.text}>{day}</div>
        </button>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: (selected) => ({
    margin: 10,
    borderRadius: 15,
    flex: 1,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: selected ? 'rgb(50, 150, 255)' : 'lightgrey'
  }),
  text: {
    fontSize: 14
  }
};

export default DaySelector;
