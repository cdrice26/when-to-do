const Home: React.FC = () => {
  return (
    <>
      <h1>Welcome to WhenToDo!</h1>
      <p>
        Get started by adding some events on the events screen and some tasks on
        the task screen. You&apos;ll also want to set your settings on the
        settings screen. Then, when you're ready, go the the schedule screen and
        start assigning your tasks to days, and we'll do the scheduling!
        <br />
        <br />
        WhenToDo uses{' '}
        <a
          href='https://openrouteservice.org'
          className='text-blue-500 underline'
        >
          OpenRouteService
        </a>{' '}
        to calculate driving times between locations and{' '}
        <a href='https://open-meteo.com' className='text-blue-500 underline'>
          OpenMeteo
        </a>{' '}
        to get weather data. It also uses icons from react-icons, specifically{' '}
        <a
          href='https://icons8.com/line-awesome'
          className='text-blue-500 underline'
        >
          Icons8 Line Awesome
        </a>{' '}
        and{' '}
        <a href='https://ionicons.com/' className='text-blue-500 underline'>
          Ionicons
        </a>
        . It is built on Next.js and uses React. It also uses{' '}
        <a
          href='https://www.npmjs.com/package/uuid-js'
          className='text-blue-500 underline'
        >
          uuid-js
        </a>
        ,{' '}
        <a
          href='https://www.npmjs.com/package/react-time-picker'
          className='text-blue-500 underline'
        >
          react-time-picker
        </a>
        , and{' '}
        <a
          href='https://www.npmjs.com/package/date-fns'
          className='text-blue-500 underline'
        >
          date-fns
        </a>
        . WhenToDo is licensed under the{' '}
        <a
          href='https://opensource.org/license/MIT'
          className='text-blue-500 underline'
        >
          MIT license
        </a>
        . See more project details on{' '}
        <a
          href='https://github.com/cdrice26/when-to-do'
          className='text-blue-500 underline'
        >
          GitHub
        </a>
        .
      </p>
    </>
  );
};

export default Home;
