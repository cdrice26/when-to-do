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
    <div style={style}>
      <span style={{ fontWeight: 'bold' }}>Unscheduled Tasks</span>
      <div>
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
