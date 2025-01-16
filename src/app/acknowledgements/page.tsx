const Acknowledgements: React.FC = () => {
  return (
    <>
      <div>
        WhenToDo is open source under the{' '}
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
        .<br />
        WhenToDo uses weather data from{' '}
        <a href='https://open-meteo.com' className='text-blue-500 underline'>
          Open-Meteo
        </a>{' '}
        and uses the{' '}
        <a
          href='https://openrouteservice.org'
          className='text-blue-500 underline'
        >
          OpenRouteService
        </a>{' '}
        for caluclating driving time.
      </div>
    </>
  );
};

export default Acknowledgements;
