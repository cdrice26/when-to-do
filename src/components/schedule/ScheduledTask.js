import ScheduledEvent from './ScheduledEvent';
import Button from '../general/Button';

/**
 * One task on the schedule screen
 * @param {Object} props - Object with properties: task, which is all the task data to display, and
 *                         unscheduleTask function, which is called when the user clicks "unschedule"
 */
const ScheduledTask = ({ task, unscheduleTask }) => {
  return (
    <div className='p-[10px] rounded-lg bg-gray-300 mt-[10px]'>
      <ScheduledEvent event={task} container={false} />
      <Button text='Unschedule' onClick={() => unscheduleTask(task)} />
    </div>
  );
};

export default ScheduledTask;
