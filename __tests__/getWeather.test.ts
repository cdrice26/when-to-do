import getWeather from '../src/helper/getWeather';
import getCoords from '../src/helper/getCoords';
import { MockFetch, MockGetCoords } from '../src/types/testingTypes';

// Mock getCoords and fetch
jest.mock('../src/helper/getCoords');
global.fetch = jest.fn();

beforeEach(() => {
  // Clear mocks before each test
  jest.clearAllMocks();
});

test('returns weather data for valid coordinates and times', async () => {
  const location = 'validLocation';
  const times = [
    new Date('2024-07-26T00:00:00Z'),
    new Date('2024-07-26T01:00:00Z')
  ];
  const coords = [12.34, 56.78];
  const weatherResponse = {
    hourly: {
      time: ['2024-07-26T00:00:00Z', '2024-07-26T01:00:00Z'],
      precipitation_probability: ['10', '20']
    }
  };

  (getCoords as MockGetCoords).mockResolvedValue(coords);
  (fetch as MockFetch).mockResolvedValue({
    json: () => Promise.resolve(weatherResponse)
  });

  const result = await getWeather(location, times);

  expect(result).toEqual([
    { time: times[0], precip: 0.1 },
    { time: times[1], precip: 0.2 }
  ]);
  expect(getCoords).toHaveBeenCalledWith(location);
  expect(fetch).toHaveBeenCalledWith('/api/weather', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ latitude: coords[0], longitude: coords[1] })
  });
});

test('returns 0 if coordinates are not found', async () => {
  const location = 'invalidLocation';
  const times = [new Date('2024-07-26T00:00:00Z')];

  (getCoords as MockGetCoords).mockResolvedValue(undefined);

  const result = await getWeather(location, times);

  expect(result).toBe(0);
  expect(getCoords).toHaveBeenCalledWith(location);
  expect(fetch).not.toHaveBeenCalled();
});

test('returns 0 if API response contains error', async () => {
  const location = 'validLocation';
  const times = [new Date('2024-07-26T00:00:00Z')];
  const coords = [12.34, 56.78];

  (getCoords as MockGetCoords).mockResolvedValue(coords);
  (fetch as MockFetch).mockResolvedValue({
    json: () => Promise.resolve({ error: 'API error' })
  });

  const result = await getWeather(location, times);

  expect(result).toBe(0);
  expect(getCoords).toHaveBeenCalledWith(location);
  expect(fetch).toHaveBeenCalledWith('/api/weather', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ latitude: coords[0], longitude: coords[1] })
  });
});

test('returns empty array if no data is within the specified times', async () => {
  const location = 'validLocation';
  const times = [new Date('2024-07-26T00:00:00Z')];
  const coords = [12.34, 56.78];
  const weatherResponse = {
    hourly: {
      time: ['2024-07-26T02:00:00Z'],
      precipitation_probability: ['10']
    }
  };

  (getCoords as MockGetCoords).mockResolvedValue(coords);
  (fetch as MockFetch).mockResolvedValue({
    json: () => Promise.resolve(weatherResponse)
  });

  const result = await getWeather(location, times);

  expect(result).toEqual([]);
  expect(getCoords).toHaveBeenCalledWith(location);
  expect(fetch).toHaveBeenCalledWith('/api/weather', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ latitude: coords[0], longitude: coords[1] })
  });
});
