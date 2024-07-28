import UnscheduledTask from './UnscheduledTask';
import { TasksContext } from '../../constants/context';
import { useContext } from 'react';

/**
 * List of unscheduled tasks
 * @param {Object} props - Contains a style object for defining the style of the list
 */
const UnscheduledTaskList = ({ style, scheduleOnDay }) => {
  const [tasks, _setTasks] = useContext(TasksContext);

  return (
    <div className='flex-1 p-[10px] mb-[10px] overflow-hidden'>
      <strong>Unscheduled Tasks</strong>
      <div className='relative overflow-y-auto'>
        {tasks
          .filter((task) => !task.scheduled)
          .map((task, i) => (
            <UnscheduledTask
              key={i}
              task={task}
              scheduleOnDay={scheduleOnDay}
            />
          ))}
      </div>
    </div>
  );
};

export default UnscheduledTaskList;
