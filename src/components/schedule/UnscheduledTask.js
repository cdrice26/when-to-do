import { SettingsContext } from '../../constants/context';
import { useContext } from 'react';
import DaySelector from '../general/DaySelector';

/**
 * One task in the unscheduled tasks list
 * @param {Object} props - Includes a task property with an object containing all
 *                         the information necessary to display the task, as well as a
 *                         scheduleOnDay function which will be called when the user clicks
 *                         on the day selector
 */
const UnscheduledTask = ({ task, scheduleOnDay }) => {
  const [settings, _setSettings] = useContext(SettingsContext);

  return (
    <div>
      <div className='p-[10px] rounded-lg bg-gray-200 mt-[10px]'>
        <div className='font-bold'>
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

export default UnscheduledTask;
