// __tests__/drivingTime.test.js
import getDrivingTime from '../src/helper/drivingTime';
import getCoords from '../src/helper/getCoords';

jest.mock('../src/helper/getCoords', () => jest.fn());

beforeEach(() => {
  fetch.resetMocks();
  localStorage.clear();
  jest.clearAllMocks();
});

test('returns cached driving time if available and valid', async () => {
  const location1 = 'start';
  const location2 = 'end';
  const cachedDrivingTime = 25;
  const timestamp = Date.now() - 1000 * 60 * 30; // 30 minutes ago

  // Ensure localStorage is cleared before setting the cache
  localStorage.clear();

  const cacheKey = `drivingTime-${location1}-${location2}`;

  // Set cache in localStorage
  localStorage.setItem(
    cacheKey,
    JSON.stringify({ timestamp, drivingTime: cachedDrivingTime })
  );

  // Provide specific mock implementations for getCoords
  getCoords
    .mockResolvedValueOnce([12.34, 56.78]) // For location1
    .mockResolvedValueOnce([98.76, 54.32]); // For location2

  const result = await getDrivingTime(location1, location2);

  // Debug: Log the result to verify correctness
  console.log('Result:', result);

  expect(result).toEqual(cachedDrivingTime);
  expect(fetch).not.toHaveBeenCalled();
});

test('fetches driving time from API and caches it if not cached', async () => {
  const location1 = 'start';
  const location2 = 'end';
  const coord1 = [12.34, 56.78];
  const coord2 = [98.76, 54.32];
  const drivingTime = 3600; // 1 hour in seconds

  getCoords.mockResolvedValueOnce(coord1).mockResolvedValueOnce(coord2);
  fetch.mockResponseOnce(
    JSON.stringify({
      features: [{ properties: { summary: { duration: drivingTime } } }]
    })
  );

  const result = await getDrivingTime(location1, location2);

  expect(result).toEqual(drivingTime / 60); // Driving time in minutes
  expect(getCoords).toHaveBeenCalledTimes(2);
  expect(fetch).toHaveBeenCalledWith('/api/directions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ coord1, coord2 })
  });

  const cachedData = JSON.parse(
    localStorage.getItem(`drivingTime-${location1}-${location2}`)
  );
  expect(cachedData.drivingTime).toEqual(drivingTime / 60);
});

test('returns 0 if coordinates are not found', async () => {
  const location1 = 'start';
  const location2 = 'end';

  getCoords
    .mockResolvedValueOnce(undefined)
    .mockResolvedValueOnce([98.76, 54.32]);

  const result = await getDrivingTime(location1, location2);

  expect(result).toEqual(0);
  expect(getCoords).toHaveBeenCalledTimes(2);
  expect(fetch).not.toHaveBeenCalled();
});

test('returns 0 if API response is invalid', async () => {
  const location1 = 'start';
  const location2 = 'end';
  const coord1 = [12.34, 56.78];
  const coord2 = [98.76, 54.32];

  getCoords.mockResolvedValueOnce(coord1).mockResolvedValueOnce(coord2);
  fetch.mockResponseOnce(JSON.stringify({}));

  const result = await getDrivingTime(location1, location2);

  expect(result).toEqual(0);
  expect(getCoords).toHaveBeenCalledTimes(2);
  expect(fetch).toHaveBeenCalled();
});

test('handles API errors gracefully', async () => {
  const location1 = 'start';
  const location2 = 'end';
  const coord1 = [12.34, 56.78];
  const coord2 = [98.76, 54.32];

  getCoords.mockResolvedValueOnce(coord1).mockResolvedValueOnce(coord2);
  fetch.mockReject(() => Promise.reject('API is down'));

  await expect(getDrivingTime(location1, location2)).resolves.toEqual(0);

  expect(getCoords).toHaveBeenCalledTimes(2);
  expect(fetch).toHaveBeenCalled();
});
