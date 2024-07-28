const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

/**
 * Component for a day selector, with each day in a circle that can be selected (and deselected)
 * @param {Object} props - Object with onChange function and list of selected days
 */
const DaySelector = ({ daysSelected, onChange }) => {
  return (
    <div className='flex flex-row justify-center'>
      {days.map((day, i) => (
        <button
          key={i}
          className={`m-[10px] rounded-full flex-1 h-[30px] w-[30px] items-center justify-center bg-${
            daysSelected[i] ? 'blue-500' : 'gray-300'
          }`}
          onClick={() => onChange(i)}
        >
          <div className='font-[14px]'>{day}</div>
        </button>
      ))}
    </div>
  );
};

export default DaySelector;
