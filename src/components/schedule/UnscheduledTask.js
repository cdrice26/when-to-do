import { SettingsContext } from '../../constants/context';
import { useContext } from 'react';
import DaySelector from '../general/DaySelector';

/**
 * One task in the unscheduled tasks list
 * Note this uses a <DraxView /> so it is draggable...
 *   it will send its id along with its type (always 'task')
 * @param {Object} props - Includes a task property with an object containing all
 *                         the information necessary to display the task
 */
const UnscheduledTask = ({ task, scheduleOnDay }) => {
  const [settings, _setSettings] = useContext(SettingsContext);

  return (
    <div>
      <div style={styles.container}>
        <div style={{ fontWeight: 'bold' }}>
          {task.name !== '' ? task.name : 'Unnamed'}
        </div>
        <div>
          @{task.location !== '' ? task.location : settings.defaultLocation}
        </div>
        <div>{task.time} minutes</div>
        <DaySelector
          daysSelected={new Array(7).fill(false)}
          onChange={(dayIndex) => scheduleOnDay(dayIndex, task.id)}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'rgb(235, 235, 235)',
    marginTop: 10
  }
};

export default UnscheduledTask;
