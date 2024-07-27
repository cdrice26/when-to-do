'use client';

import UnscheduledTaskList from '../../components/schedule/UnscheduledTaskList';
//import Schedule from '../../components/schedule/Schedule';

/**
 * Overall component to display the scheduling screen
 */
const ScheduleScreen = () => {
  const scheduleOnDay = () => {};

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        paddingBottom: 20
      }}
    >
      <UnscheduledTaskList
        style={{ flex: 1, padding: 10, marginBottom: 10 }}
        scheduleOnDay={scheduleOnDay}
      />
      {/* <Schedule style={{ flex: 1, padding: 10, marginBottom: 10 }} /> */}
    </div>
  );
};

export default ScheduleScreen;
