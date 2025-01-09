import ScheduledEvent from './ScheduledEvent.tsx';
import Button from '../general/Button.tsx';
import { EventOrTask } from '@/types/instances.ts';

interface ScheduledTaskProps {
  task: EventOrTask;
  unscheduleTask: (task: any) => void;
}

/**
 * One task on the schedule screen
 * @param {Object} props - Object with properties: task, which is all the task data to display, and
 *                         unscheduleTask function, which is called when the user clicks "unschedule"
 */
const ScheduledTask = ({ task, unscheduleTask }: ScheduledTaskProps) => {
  return (
    <div className='p-[10px] rounded-lg bg-gray-300 mt-[10px]'>
      <ScheduledEvent event={task} container={false} />
      <Button text='Unschedule' onClick={() => unscheduleTask(task)} />
    </div>
  );
};

export default ScheduledTask;
