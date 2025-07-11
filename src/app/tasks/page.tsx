'use client';

import { useContext } from 'react';
import Task from '../../components/Task.tsx';
import { TasksContext } from '../../constants/context.tsx';
import {
  addToState,
  removeFromState,
  editElementInState
} from '../../helper/stateMutation.ts';
import randId from '../../helper/UUID.ts';
import AddButton from '../../components/general/AddButton.tsx';

/**
 * Overall component for displaying the task editing screen
 */
const TasksScreen = () => {
  /** Load in list of tasks */
  const [tasks, setTasks] = useContext(TasksContext);

  /**
   * Add a task to the state array
   */
  const addTask = () => {
    addToState(tasks, setTasks, {
      name: '',
      location: '',
      time: 0,
      scheduled: false,
      outside: false,
      id: randId()
    });
  };

  /**
   * Delete a task from the state array
   * @param {Number} taskIndex - The index of the task to remove
   */
  const deleteTask = (taskIndex: number) => {
    removeFromState(tasks, setTasks, taskIndex);
  };

  /**
   * Edit a task in the state array
   * @param {Number} taskIndex - The index of the task to edit
   * @param {String} parameter - The key to edit the value of
   * @param {*} value - The value to update the value to
   */
  const editTask = <T,>(taskIndex: number, parameter: string, value: T) => {
    editElementInState(tasks, setTasks, taskIndex, parameter, value);
  };

  return (
    <div className='flex-grow flex flex-row flex-wrap w-full gap-5 justify-center'>
      {tasks.map((task, i) => (
        <Task
          key={i}
          name={task.name}
          location={task.location}
          time={task.time}
          isOutside={task.outside}
          onDestroy={() => deleteTask(i)}
          onNameChange={(value) => editTask(i, 'name', value)}
          onLocationChange={(value) => editTask(i, 'location', value)}
          onTimeChange={(value) => editTask(i, 'time', value)}
          onOutsideChange={() => editTask(i, 'outside', !task.outside)}
        />
      ))}
      <AddButton
        onClick={addTask}
        className='fixed bottom-[100px] right-[15px] sm:bottom-10 sm:right-10'
      />
    </div>
  );
};

export default TasksScreen;
