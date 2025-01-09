import UnscheduledTask from './UnscheduledTask.tsx';
import { TasksContext } from '../../constants/context.tsx';
import { useContext } from 'react';

interface UnscheduledTaskListProps {
  scheduleOnDay: (dayIndex: number, taskId: string) => void;
}

/**
 * List of unscheduled tasks
 * @param {UnscheduledTaskListProps} props - Object with scheduleOnDay function
 */
const UnscheduledTaskList = ({ scheduleOnDay }: UnscheduledTaskListProps) => {
  const [tasks, _setTasks] = useContext(TasksContext);

  return (
    <div className='flex-1 p-[10px] mb-[10px] relative overflow-y-scroll'>
      <strong>Unscheduled Tasks</strong>
      <div className='relative'>
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
