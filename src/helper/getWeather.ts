import getCoords from './getCoords';

/**
 *
 * @param {String} location - Search query for a location
 * @param {Array<Date>} times - Array of dates, should be at the start of each hour we want to check
 * @returns
 */
const getWeather = async (location: string, times: Date[]) => {
  const coords = await getCoords(location);
  if (coords === undefined) return 0;
  const url = '/api/weather';
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ latitude: coords[0], longitude: coords[1] })
  });
  const json = await resp.json();
  if (Object.keys(json).includes('error')) return 0;
  const p = json.hourly.time
    .map((time: string, index: number) => ({
      time: new Date(time),
      index: index
    }))
    .filter(
      (time: { time: Date; index: number }) =>
        time.time >= times[0] && time.time <= times[times.length - 1]
    )
    .map((time: { time: Date; index: number }) => ({
      time: time.time,
      precip:
        parseFloat(json.hourly.precipitation_probability[time.index]) / 100
    }));
  return p;
};

export default getWeather;
