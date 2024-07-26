import getCoords from './getCoords';

/**
 *
 * @param {String} location - Search query for a location
 * @param {Array<Date>} times - Array of dates, should be at the start of each hour we want to check
 * @returns
 */
const getWeather = async (location, times) => {
  const coords = await getCoords(location);
  if (coords === undefined) return 0;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords[1]}&longitude=${coords[0]}&hourly=precipitation_probability`;
  const resp = await fetch(url);
  const json = await resp.json();
  if (Object.keys(json).includes('error')) return 0;
  const p = json.hourly.time
    .map((time, index) => ({ time: new Date(time), index: index }))
    .filter(
      (time) => time.time >= times[0] && time.time <= times[times.length - 1]
    )
    .map((time) => ({
      time: time.time,
      precip:
        parseFloat(json.hourly.precipitation_probability[time.index]) / 100
    }));
  return p;
};

export default getWeather;
