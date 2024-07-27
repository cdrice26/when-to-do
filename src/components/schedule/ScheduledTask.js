import { View, Button, StyleSheet } from 'react-native';
import ScheduledEvent from './ScheduledEvent';

/**
 * One task on the schedule screen
 * @param {Object} props - Object with properties: task, which is all the task data to display, and
 *                         unscheduleTask function, which is called when the user clicks "unschedule"
 */
const ScheduledTask = ({ task, unscheduleTask }) => {
  return (
    <View style={styles.container}>
      <ScheduledEvent event={task} container={false} />
      <Button title='Unschedule' onPress={() => unscheduleTask(task)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'lightgrey',
    marginTop: 10
  }
});

export default ScheduledTask;
